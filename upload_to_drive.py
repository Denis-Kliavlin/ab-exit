"""Upload 3 parts of AB-EXIT v6.53 to Google Drive.

Uses rclone's registered OAuth client (supports Drive scope).
Opens browser for authentication.
"""
import json
import os
import sys
import threading
import urllib.parse
import urllib.request
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# rclone's registered OAuth client for Google Drive
CLIENT_ID = '202264815644.apps.googleusercontent.com'
CLIENT_SECRET = 'X4Z3ca8xfWDb1Voo-F9a7ZxJ'
SCOPES = ['https://www.googleapis.com/auth/drive.file']
REDIRECT_PORT = 8085
REDIRECT_URI = f'http://localhost:{REDIRECT_PORT}'

TARGET_FOLDER_ID = '1DOljLHL63wqno1orLl6plhv5pxcTQd60'
TOKEN_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'drive_token.json')

FILES_TO_UPLOAD = [
    ('v6.53_part1_sections_1-45.md', 'v6.53_part1_sections_1-45'),
    ('v6.53_part2_sections_46-77.md', 'v6.53_part2_sections_46-77'),
    ('v6.53_part3_sections_78-94.md', 'v6.53_part3_sections_78-94'),
]


class OAuthHandler(BaseHTTPRequestHandler):
    """Handle OAuth redirect callback."""
    auth_code = None

    def do_GET(self):
        query = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(query)
        if 'code' in params:
            OAuthHandler.auth_code = params['code'][0]
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write('Авторизация успешна! Можете закрыть эту вкладку.'.encode('utf-8'))
        else:
            error = params.get('error', ['unknown'])[0]
            self.send_response(400)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(f'Ошибка: {error}'.encode('utf-8'))

    def log_message(self, format, *args):
        pass  # Suppress logging


def get_credentials():
    """Get OAuth2 credentials with Drive scope."""
    creds = None

    # Try saved token
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        try:
            creds.refresh(Request())
            with open(TOKEN_PATH, 'w') as f:
                f.write(creds.to_json())
            return creds
        except Exception:
            pass

    # Do fresh OAuth flow
    auth_url = (
        f'https://accounts.google.com/o/oauth2/auth'
        f'?client_id={CLIENT_ID}'
        f'&redirect_uri={urllib.parse.quote(REDIRECT_URI)}'
        f'&response_type=code'
        f'&scope={urllib.parse.quote(" ".join(SCOPES))}'
        f'&access_type=offline'
        f'&prompt=consent'
    )

    # Start local server
    server = HTTPServer(('localhost', REDIRECT_PORT), OAuthHandler)

    print(f'Opening browser for Google authentication...')
    webbrowser.open(auth_url)

    # Wait for callback
    while OAuthHandler.auth_code is None:
        server.handle_request()

    code = OAuthHandler.auth_code
    server.server_close()

    # Exchange code for token
    data = urllib.parse.urlencode({
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code',
    }).encode()

    req = urllib.request.Request('https://oauth2.googleapis.com/token', data=data)
    resp = urllib.request.urlopen(req)
    token_data = json.loads(resp.read())

    creds = Credentials(
        token=token_data['access_token'],
        refresh_token=token_data.get('refresh_token'),
        token_uri='https://oauth2.googleapis.com/token',
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=SCOPES,
    )

    # Save token
    with open(TOKEN_PATH, 'w') as f:
        f.write(creds.to_json())

    return creds


def upload_file(service, local_path, title, folder_id):
    """Upload a markdown file as Google Doc."""
    file_metadata = {
        'name': title,
        'parents': [folder_id],
        'mimeType': 'application/vnd.google-apps.document'
    }
    media = MediaFileUpload(local_path, mimetype='text/markdown', resumable=True)
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id, name, webViewLink'
    ).execute()
    return file


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    print("Authenticating with Google Drive (rclone OAuth client)...")
    creds = get_credentials()
    service = build('drive', 'v3', credentials=creds)

    print(f"\nUploading 3 files to folder {TARGET_FOLDER_ID}...\n")

    results = []
    for fname, title in FILES_TO_UPLOAD:
        local_path = os.path.join(base_dir, fname)
        if not os.path.exists(local_path):
            print(f"ERROR: {local_path} not found!")
            sys.exit(1)

        size_kb = os.path.getsize(local_path) / 1024
        print(f"Uploading {fname} ({size_kb:.1f} KB)...")

        result = upload_file(service, local_path, title, TARGET_FOLDER_ID)
        results.append((fname, result, size_kb))
        print(f"  Done: {result['name']} (ID: {result['id']})")

    # Print summary
    print("\n" + "=" * 60)
    print("GOTOVO. Three files uploaded to AB-EXIT v6.56 - Reorganized:\n")

    for fname, result, size_kb in results:
        print(f"{result['name']}")
        print(f"  ID: {result['id']}")
        print(f"  Size: {size_kb:.0f} KB")
        print(f"  URL: {result.get('webViewLink', 'https://docs.google.com/document/d/' + result['id'] + '/edit')}")
        print()

    total_kb = sum(r[2] for r in results)
    print(f"Check: total size ({total_kb:.0f} KB) across 3 parts.")
    print("Each part starts at a section boundary ## N.")


if __name__ == '__main__':
    main()
