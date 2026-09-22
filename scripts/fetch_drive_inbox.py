#!/usr/bin/env python3
"""Скачать ВСЕ файлы snapshot-папки Drive в staging (_drive_inbox/), без раскладки по главам.

В отличие от sync_from_drive.py, не фильтрует имена по FILE_PATTERN — забирает всё,
включая разделы с буквенными суффиксами (011b, 036b, 048c) и служебные файлы.
Раскладка по docs/ делается отдельно и осознанно.

Использование:
    python scripts/fetch_drive_inbox.py [--folder <id>] [--out _drive_inbox]

Авторизация — как в sync_from_drive.py:
  1. GDRIVE_SA_JSON env
  2. ~/.config/ab-exit/service-account.json
  3. OAuth drive_token_readonly.json — ищется в корне этого репо, затем в GDRIVE_TOKEN_PATH,
     затем в C:/vpn/ab-exit (старый клон)
"""

import argparse
import io
import json
import os
import sys
import time
from pathlib import Path

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

REPO = Path(__file__).parent.parent
DEFAULT_FOLDER = '1V348jci9t5iko1riq4EdbXg0JYFqaysa'  # AB-EXIT_repo_v6.57.0_clean_2026-06-11
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
LEGACY_CLIENT_ID = '202264815644.apps.googleusercontent.com'
LEGACY_CLIENT_SECRET = 'X4Z3ca8xfWDb1Voo-F9a7ZxJ'


def token_candidates():
    env = os.environ.get('GDRIVE_TOKEN_PATH')
    if env:
        yield Path(env)
    yield REPO / 'drive_token_readonly.json'
    yield REPO / 'drive_token.json'
    yield Path('C:/vpn/ab-exit/drive_token_readonly.json')
    yield Path('C:/vpn/ab-exit/drive_token.json')


def authenticate():
    sa_json = os.environ.get('GDRIVE_SA_JSON')
    sa_path = os.environ.get('GDRIVE_SA_PATH') or os.path.expanduser(
        '~/.config/ab-exit/service-account.json'
    )
    if sa_json:
        from google.oauth2.service_account import Credentials
        print('Auth: service account (env)')
        return build('drive', 'v3',
                     credentials=Credentials.from_service_account_info(
                         json.loads(sa_json), scopes=SCOPES))
    if os.path.exists(sa_path):
        from google.oauth2.service_account import Credentials
        print(f'Auth: service account ({sa_path})')
        return build('drive', 'v3',
                     credentials=Credentials.from_service_account_file(
                         sa_path, scopes=SCOPES))

    from google.oauth2.credentials import Credentials as OAuthCreds
    from google.auth.transport.requests import Request
    for path in token_candidates():
        if not path.exists():
            continue
        with open(path) as f:
            data = json.load(f)
        creds = OAuthCreds(
            token=data.get('access_token', ''),
            refresh_token=data.get('refresh_token'),
            token_uri='https://oauth2.googleapis.com/token',
            client_id=data.get('client_id') or LEGACY_CLIENT_ID,
            client_secret=data.get('client_secret') or LEGACY_CLIENT_SECRET,
            scopes=SCOPES,
        )
        if not creds.valid:
            creds.refresh(Request())
        print(f'Auth: OAuth token ({path})')
        return build('drive', 'v3', credentials=creds)

    sys.exit('ERROR: no Drive credentials found (service account or OAuth token)')


def list_folder(service, folder_id):
    files, page = [], None
    while True:
        resp = service.files().list(
            q=f"'{folder_id}' in parents and trashed = false",
            fields='nextPageToken, files(id, name, mimeType, size, modifiedTime)',
            pageSize=1000, pageToken=page,
        ).execute()
        files.extend(resp.get('files', []))
        page = resp.get('nextPageToken')
        if not page:
            return files


def download(service, file_id, dest, attempts=8):
    """Скачать файл с backoff — legacy OAuth-проект отдаёт 403 rateLimitExceeded пачками."""
    from googleapiclient.errors import HttpError
    delay = 2.0
    for attempt in range(1, attempts + 1):
        try:
            request = service.files().get_media(fileId=file_id)
            buf = io.BytesIO()
            downloader = MediaIoBaseDownload(buf, request)
            done = False
            while not done:
                _, done = downloader.next_chunk()
            dest.write_bytes(buf.getvalue())
            return True
        except HttpError as e:
            if e.resp.status not in (403, 429, 500, 503):
                raise
            if attempt == attempts:
                print(f'    ! сдаюсь после {attempts} попыток: {e.resp.status}')
                return False
            time.sleep(delay)
            delay = min(delay * 1.8, 60)
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--folder', default=DEFAULT_FOLDER)
    ap.add_argument('--out', default='_drive_inbox')
    args = ap.parse_args()

    out = REPO / args.out
    out.mkdir(parents=True, exist_ok=True)

    service = authenticate()
    files = list_folder(service, args.folder)
    print(f'Файлов в папке: {len(files)}')

    manifest = []
    for f in sorted(files, key=lambda x: x['name']):
        if f['mimeType'] == 'application/vnd.google-apps.folder':
            continue
        dest = out / f['name']
        if dest.exists() and dest.stat().st_size == int(f.get('size') or 0):
            print(f'  = {f["name"]} (уже есть)')
        else:
            ok = download(service, f["id"], dest)
            if not ok:
                continue
            print(f'  + {f["name"]} ({f.get("size")} B)')
        manifest.append({
            'name': f['name'], 'id': f['id'],
            'size': f.get('size'), 'modifiedTime': f.get('modifiedTime'),
        })

    (out / '_manifest.json').write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'\nГотово: {len(manifest)} файлов в {out}')


if __name__ == '__main__':
    main()
