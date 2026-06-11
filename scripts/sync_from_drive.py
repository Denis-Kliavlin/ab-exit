#!/usr/bin/env python3
"""Sync section files from Google Drive snapshot to local docs/.

Downloads files from the v6.57.0 Drive folder,
parses filenames (CC_NNN_name_vN.md),
picks the latest version of each section,
and places them in docs/CC-chapter/NNN-name.md.
"""

import io
import json
import os
import re
from collections import defaultdict
from pathlib import Path

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

# Configuration
DRIVE_FOLDER_ID = '1V348jci9t5iko1riq4EdbXg0JYFqaysa'  # v6.57.0
LOCAL_DOCS = Path(__file__).parent.parent / 'docs'
TOKEN_PATH = Path(__file__).parent.parent / 'drive_token_readonly.json'
CLIENT_ID = '202264815644.apps.googleusercontent.com'
CLIENT_SECRET = 'X4Z3ca8xfWDb1Voo-F9a7ZxJ'

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

FILE_PATTERN = re.compile(r'^(\d{2})_(\d{3})_([\w_]+)_v(\d+)\.md$')


def get_service():
    with open(TOKEN_PATH) as f:
        data = json.load(f)
    creds = Credentials(
        token=data.get('access_token', ''),
        refresh_token=data.get('refresh_token'),
        token_uri='https://oauth2.googleapis.com/token',
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=['https://www.googleapis.com/auth/drive.readonly'],
    )
    if not creds.valid:
        creds.refresh(Request())
        save = {'access_token': creds.token, 'refresh_token': creds.refresh_token}
        with open(TOKEN_PATH, 'w') as f:
            json.dump(save, f)
    return build('drive', 'v3', credentials=creds)


def download_file(service, file_id, local_path):
    request = service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    local_path.parent.mkdir(parents=True, exist_ok=True)
    with open(local_path, 'wb') as f:
        f.write(fh.getvalue())


def main():
    service = get_service()

    # List files in Drive folder
    files = []
    page_token = None
    while True:
        response = service.files().list(
            q=f"'{DRIVE_FOLDER_ID}' in parents and trashed=false",
            fields="nextPageToken, files(id, name, mimeType)",
            pageToken=page_token,
            pageSize=200
        ).execute()
        files.extend(response.get('files', []))
        page_token = response.get('nextPageToken')
        if not page_token:
            break

    # Group by section, pick latest version
    sections = defaultdict(list)
    for f in files:
        match = FILE_PATTERN.match(f['name'])
        if match:
            chapter, num, name, version = match.groups()
            sections[(chapter, num, name)].append({
                'version': int(version),
                'file': f
            })

    # Download latest version of each section
    synced = 0
    for (chapter, num, name), versions in sorted(sections.items()):
        latest = max(versions, key=lambda v: v['version'])
        if chapter not in CHAPTERS:
            print(f"Skipping unknown chapter: {chapter}")
            continue
        clean_name = name.replace('_', '-')
        local_path = LOCAL_DOCS / CHAPTERS[chapter] / f"{num}-{clean_name}.md"
        print(f"Syncing: {latest['file']['name']} -> {local_path}")
        download_file(service, latest['file']['id'], local_path)
        synced += 1

    print(f"\nSynced {synced} sections")


if __name__ == '__main__':
    main()
