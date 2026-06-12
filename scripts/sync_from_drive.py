#!/usr/bin/env python3
"""
AB-EXIT Site Builder — Drive snapshot -> docs/ sync.

Парсит имена snapshot папок, выбирает последнюю по semver,
скачивает все markdown файлы, разносит по структуре docs/.

Supports two auth modes:
  1. Service account (GDRIVE_SA_JSON env or ~/.config/ab-exit/service-account.json)
  2. OAuth token (drive_token_readonly.json in repo root) — legacy fallback
"""

import os
import re
import sys
import io
import json
import shutil
import time
from pathlib import Path
from collections import defaultdict

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

# --- Configuration ---

# Known snapshot folder ID (used to discover root folder)
KNOWN_SNAPSHOT_ID = '1V348jci9t5iko1riq4EdbXg0JYFqaysa'  # v6.57.0

# Legacy: direct folder ID for single-folder mode
LEGACY_FOLDER_ID = KNOWN_SNAPSHOT_ID

# OAuth legacy credentials
LEGACY_TOKEN_PATH = Path(__file__).parent.parent / 'drive_token_readonly.json'
LEGACY_CLIENT_ID = '202264815644.apps.googleusercontent.com'
LEGACY_CLIENT_SECRET = 'X4Z3ca8xfWDb1Voo-F9a7ZxJ'

CHAPTERS = {
    '01': '01-introduction',
    '02': '02-history',
    '03': '03-theory',
    '04': '04-electoral-dynamics',
    '05': '05-empirical-base',
    '06': '06-critique-arsenal',
    '07': '07-manifesto',
    '08': '08-implementation',
    '09': '09-usa',
    '10': '10-other-countries',
}

SNAPSHOT_PATTERN = re.compile(
    r'^AB-EXIT_repo_v(\d+)\.(\d+)\.(\d+)_clean_(\d{4}-\d{2}-\d{2})$'
)
FILE_PATTERN = re.compile(r'^(\d{2})_(\d{3})_([\w_]+)_v(\d+)\.md$')


def authenticate():
    """Authenticate with Drive API. Tries service account first, falls back to OAuth."""
    # Method 1: Service account (preferred)
    sa_json = os.environ.get('GDRIVE_SA_JSON')
    sa_path = (
        os.environ.get('GDRIVE_SA_PATH')
        or os.path.expanduser('~/.config/ab-exit/service-account.json')
    )

    if sa_json:
        from google.oauth2.service_account import Credentials
        creds = Credentials.from_service_account_info(
            json.loads(sa_json),
            scopes=['https://www.googleapis.com/auth/drive.readonly']
        )
        print("Auth: service account (env)")
        return build('drive', 'v3', credentials=creds)

    if os.path.exists(sa_path):
        from google.oauth2.service_account import Credentials
        creds = Credentials.from_service_account_file(
            sa_path,
            scopes=['https://www.googleapis.com/auth/drive.readonly']
        )
        print(f"Auth: service account ({sa_path})")
        return build('drive', 'v3', credentials=creds)

    # Method 2: OAuth token (legacy fallback)
    if LEGACY_TOKEN_PATH.exists():
        from google.oauth2.credentials import Credentials as OAuthCreds
        from google.auth.transport.requests import Request
        with open(LEGACY_TOKEN_PATH) as f:
            data = json.load(f)
        creds = OAuthCreds(
            token=data.get('access_token', ''),
            refresh_token=data.get('refresh_token'),
            token_uri='https://oauth2.googleapis.com/token',
            client_id=LEGACY_CLIENT_ID,
            client_secret=LEGACY_CLIENT_SECRET,
            scopes=['https://www.googleapis.com/auth/drive.readonly'],
        )
        if not creds.valid:
            creds.refresh(Request())
            save = {'access_token': creds.token, 'refresh_token': creds.refresh_token}
            with open(LEGACY_TOKEN_PATH, 'w') as f:
                json.dump(save, f)
        print("Auth: OAuth token (legacy)")
        return build('drive', 'v3', credentials=creds)

    print("ERROR: No credentials found.")
    print("  Set GDRIVE_SA_JSON env, or place service-account.json in ~/.config/ab-exit/,")
    print(f"  or provide OAuth token at {LEGACY_TOKEN_PATH}")
    sys.exit(1)


def find_root_folder(service):
    """Найти родительскую папку AB-EXIT (parent of known snapshot)."""
    try:
        meta = service.files().get(
            fileId=KNOWN_SNAPSHOT_ID,
            fields='parents,name'
        ).execute()
        return meta['parents'][0]
    except Exception as e:
        print(f"Warning: cannot find root folder ({e}), using direct folder mode")
        return None


def find_latest_snapshot(service, root_folder_id, override_version=None):
    """
    Найти последний snapshot по semver.
    Если override_version (например 'v6.57.1') — найти его, не latest.
    Если root_folder_id is None — use LEGACY_FOLDER_ID directly.
    """
    if root_folder_id is None:
        return {
            'id': LEGACY_FOLDER_ID,
            'name': 'direct-folder',
            'version': (6, 57, 0),
            'version_str': 'v6.57.0',
            'date': 'unknown',
        }

    snapshots = []
    page_token = None
    while True:
        resp = service.files().list(
            q=(
                f"'{root_folder_id}' in parents "
                f"and mimeType='application/vnd.google-apps.folder' "
                f"and trashed=false"
            ),
            fields="nextPageToken, files(id, name, createdTime)",
            pageToken=page_token,
            pageSize=200
        ).execute()
        for f in resp.get('files', []):
            m = SNAPSHOT_PATTERN.match(f['name'])
            if not m:
                continue
            major, minor, patch, date = m.groups()
            version_tuple = (int(major), int(minor), int(patch))
            version_str = f"v{major}.{minor}.{patch}"
            snapshots.append({
                'id': f['id'],
                'name': f['name'],
                'version': version_tuple,
                'version_str': version_str,
                'date': date,
            })
        page_token = resp.get('nextPageToken')
        if not page_token:
            break

    if not snapshots:
        print("No snapshot folders found, using known folder directly")
        return {
            'id': KNOWN_SNAPSHOT_ID,
            'name': 'known-snapshot',
            'version': (6, 57, 0),
            'version_str': 'v6.57.0',
            'date': 'unknown',
        }

    if override_version:
        for s in snapshots:
            if s['version_str'] == override_version:
                return s
        raise ValueError(f"Snapshot {override_version} not found in Drive")

    snapshots.sort(key=lambda s: (s['version'], s['date']), reverse=True)
    return snapshots[0]


def list_files(service, folder_id):
    """Получить все файлы в папке."""
    files = []
    page_token = None
    while True:
        resp = service.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id, name, mimeType)",
            pageToken=page_token,
            pageSize=200
        ).execute()
        files.extend(resp.get('files', []))
        page_token = resp.get('nextPageToken')
        if not page_token:
            break
    return files


def download_md(service, file_id, max_retries=5):
    """Скачать содержимое markdown файла с retry при rate limit."""
    import time
    for attempt in range(max_retries):
        try:
            request = service.files().get_media(fileId=file_id)
            fh = io.BytesIO()
            downloader = MediaIoBaseDownload(fh, request)
            done = False
            while not done:
                _, done = downloader.next_chunk()
            content = fh.getvalue().decode('utf-8')
            # Normalize email: always use denis@ab-exit.com
            content = content.replace('denis.klyavlin@gmail.com', 'denis@ab-exit.com')
            return content
        except Exception as e:
            if 'rateLimitExceeded' in str(e) or 'Quota exceeded' in str(e):
                wait = 2 ** attempt * 5  # 5, 10, 20, 40, 80 seconds
                print(f"  Rate limited, waiting {wait}s (attempt {attempt + 1}/{max_retries})...")
                time.sleep(wait)
            else:
                raise
    raise RuntimeError(f"Failed to download {file_id} after {max_retries} retries")


def sync_snapshot(service, snapshot, docs_dir):
    """Скачать все секции из snapshot и разнести по docs/."""
    files = list_files(service, snapshot['id'])

    # Группируем по разделам, выбираем последнюю версию каждого
    sections_by_key = defaultdict(list)
    system_files = {}

    for f in files:
        if not f['name'].endswith('.md'):
            continue
        m = FILE_PATTERN.match(f['name'])
        if m:
            chapter, num, name, version = m.groups()
            sections_by_key[(chapter, num, name)].append({
                'version': int(version),
                'file': f
            })
        else:
            system_files[f['name']] = f

    # Очистить docs/ (кроме особых файлов и assets)
    if docs_dir.exists():
        for item in docs_dir.iterdir():
            if item.name in ('CNAME', '.nojekyll', 'assets'):
                continue
            if item.is_dir():
                shutil.rmtree(item)
            else:
                item.unlink()
    docs_dir.mkdir(exist_ok=True, parents=True)

    # Создать главы как подпапки
    for chapter_num, chapter_dir in CHAPTERS.items():
        (docs_dir / chapter_dir).mkdir(exist_ok=True)

    # Скачать последнюю версию каждого раздела
    section_count = 0
    for (chapter, num, name), versions in sorted(sections_by_key.items()):
        latest = max(versions, key=lambda v: v['version'])
        if chapter not in CHAPTERS:
            print(f"  Skipping unknown chapter: {chapter} ({latest['file']['name']})")
            continue

        content = download_md(service, latest['file']['id'])
        target = docs_dir / CHAPTERS[chapter] / f"{num}-{name.replace('_', '-')}.md"
        target.write_text(content, encoding='utf-8')
        section_count += 1
        print(f"  {target.relative_to(docs_dir)}")
        time.sleep(1)  # rate limit prevention

    # BOOK_INDEX.md -> docs/index.md (книжная титульная страница)
    # Приоритет: BOOK_INDEX.md > INDEX.md
    if 'BOOK_INDEX.md' in system_files:
        content = download_md(service, system_files['BOOK_INDEX.md']['id'])
        (docs_dir / 'index.md').write_text(content, encoding='utf-8')
        print("  index.md (from BOOK_INDEX.md)")
    elif 'INDEX.md' in system_files:
        content = download_md(service, system_files['INDEX.md']['id'])
        (docs_dir / 'index.md').write_text(content, encoding='utf-8')
        print("  index.md (from INDEX.md — fallback)")

    # CHANGELOG.md -> docs/changelog.md
    if 'CHANGELOG.md' in system_files:
        content = download_md(service, system_files['CHANGELOG.md']['id'])
        (docs_dir / 'changelog.md').write_text(content, encoding='utf-8')
        print("  changelog.md")

    print(f"\nDone: {section_count} sections synced from {snapshot['name']}")
    return section_count


def update_mkdocs_yml(repo_root, snapshot):
    """Обновить mkdocs.yml с актуальной версией."""
    yml_path = repo_root / 'mkdocs.yml'
    if not yml_path.exists():
        print("mkdocs.yml not found, skipping version update")
        return

    content = yml_path.read_text(encoding='utf-8')
    content = re.sub(
        r'(version:\s*)(v\d+\.\d+\.\d+)',
        rf'\g<1>{snapshot["version_str"]}',
        content
    )
    yml_path.write_text(content, encoding='utf-8')


def git_commit_and_push(repo_root, snapshot):
    """git add docs/ && commit && push."""
    import subprocess

    def run(cmd, check=True):
        result = subprocess.run(cmd, cwd=repo_root, capture_output=True, text=True)
        if check and result.returncode != 0:
            print(f"Error: {' '.join(cmd)}\n{result.stderr}")
            sys.exit(1)
        return result

    status = run(['git', 'status', '--porcelain', 'docs/', 'mkdocs.yml'], check=False)
    if not status.stdout.strip():
        print("No changes in docs/ — push not needed")
        return False

    run(['git', 'add', 'docs/', 'mkdocs.yml'])
    run([
        'git', 'commit',
        '-m', f"Sync from Drive: {snapshot['name']} ({snapshot['version_str']})"
    ])
    run(['git', 'push', 'origin', 'main'])

    tag_check = run(['git', 'tag', '-l', snapshot['version_str']], check=False)
    if not tag_check.stdout.strip():
        run(['git', 'tag', snapshot['version_str']])
        run(['git', 'push', 'origin', snapshot['version_str']])

    return True


def main():
    import argparse
    parser = argparse.ArgumentParser(description='AB-EXIT Site Builder — Drive snapshot sync')
    parser.add_argument('--version', help='Override version (e.g. v6.57.1). Default: latest.')
    parser.add_argument('--repo-root', default='.', help='Path to GitHub repo root')
    parser.add_argument('--no-push', action='store_true', help='Skip git push')
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    docs_dir = repo_root / 'docs'

    print("=== AB-EXIT Site Builder ===")
    print(f"Repo: {repo_root}")
    print(f"Docs: {docs_dir}")

    service = authenticate()
    root_folder_id = find_root_folder(service)
    if root_folder_id:
        print(f"Drive root: {root_folder_id}")

    snapshot = find_latest_snapshot(service, root_folder_id, args.version)
    print(f"Snapshot: {snapshot['name']} ({snapshot['version_str']})")

    sync_snapshot(service, snapshot, docs_dir)
    update_mkdocs_yml(repo_root, snapshot)

    if not args.no_push:
        pushed = git_commit_and_push(repo_root, snapshot)
        if pushed:
            print(f"\nSynced {snapshot['version_str']} -> GitHub -> Cloudflare Pages")
        else:
            print(f"\nAlready in sync with {snapshot['version_str']}")
    else:
        print(f"\nLocal sync done (--no-push)")


if __name__ == '__main__':
    main()
