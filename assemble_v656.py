"""Assemble AB-EXIT v6.56 from v6.53 + sections 96/97/98.

Applies the reorganization MAPPING from the Master Plan:
- Universal content moves up (files 01-08)
- USA-specific content goes to file 09
- New sections 96, 97, 98 integrated at correct positions
- File 10 is a placeholder for other countries

Generates 10 split files + 1 monolith, then uploads to Google Drive.
"""
import json
import os
import re
import sys
import time

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, 'v656_split')

# ── Drive IDs ──
FOLDER_MAIN = '1DOljLHL63wqno1orLl6plhv5pxcTQd60'
FOLDER_SPLIT = '1qKrTQvs_TVy7-EyUXc0iPW5yDE_tcn7C'
TOKEN_PATH = os.path.join(BASE_DIR, 'drive_token.json')

# ── MAPPING: old_section → (new_section, file, type) ──
MAPPING = {
    # File 01 — Введение и базовая формула
    1: (1, '01', 'universal'),
    4: (2, '01', 'universal'),
    5: (2, '01', 'universal'),
    6: (3, '01', 'universal'),
    7: (3, '01', 'universal'),
    8: (4, '01', 'universal'),
    9: (4, '01', 'universal'),

    # USA из файла 01 → файл 09
    2: (48, '09', 'usa'),
    3: (48, '09', 'usa'),
    10: (49, '09', 'usa'),
    11: (49, '09', 'usa'),
    12: (49, '09', 'usa'),
    13: (49, '09', 'usa'),
    14: (49, '09', 'usa'),

    # File 02 — История, философия
    15: (6, '02', 'universal'),
    16: (6, '02', 'universal'),
    17: (7, '02', 'universal'),
    18: (7, '02', 'universal'),
    19: (8, '02', 'universal'),
    20: (9, '02', 'universal'),
    21: (9, '02', 'universal'),
    22: (9, '02', 'universal'),
    92: (10, '02', 'universal'),

    # File 03 — Теоретические основания
    91: (12, '03', 'universal'),
    # 95 doesn't exist in v6.53 → placeholder
    93: (15, '03', 'universal'),

    # File 04 — Электоральная динамика
    23: (16, '04', 'universal'),
    24: (16, '04', 'universal'),
    25: (16, '04', 'universal'),
    26: (16, '04', 'universal'),
    31: (18, '04', 'universal'),
    32: (18, '04', 'universal'),
    33: (18, '04', 'universal'),
    34: (18, '04', 'universal'),
    35: (18, '04', 'universal'),
    36: (18, '04', 'universal'),
    37: (18, '04', 'universal'),
    38: (18, '04', 'universal'),
    39: (18, '04', 'universal'),
    40: (18, '04', 'universal'),
    41: (18, '04', 'universal'),
    42: (18, '04', 'universal'),
    43: (18, '04', 'universal'),
    44: (18, '04', 'universal'),
    59: (19, '04', 'universal'),
    60: (19, '04', 'universal'),
    61: (19, '04', 'universal'),
    62: (20, '04', 'universal'),
    63: (21, '04', 'universal'),
    64: (21, '04', 'universal'),
    65: (21, '04', 'universal'),
    66: (21, '04', 'universal'),
    67: (22, '04', 'universal'),

    # USA из файлов 03/04 → файл 09
    27: (51, '09', 'usa'),
    28: (51, '09', 'usa'),
    29: (51, '09', 'usa'),
    30: (51, '09', 'usa'),
    46: (50, '09', 'usa'),

    # File 05 — Эмпирическая база
    45: (25, '05', 'universal'),
    47: (26, '05', 'universal'),
    48: (26, '05', 'universal'),
    49: (27, '05', 'universal'),
    50: (27, '05', 'universal'),
    51: (28, '05', 'universal'),
    52: (28, '05', 'universal'),
    53: (28, '05', 'universal'),
    54: (28, '05', 'universal'),
    55: (28, '05', 'universal'),
    56: (28, '05', 'universal'),
    57: (28, '05', 'universal'),
    58: (28, '05', 'universal'),

    # File 07 — Манифест, стратегия, медиа
    77: (33, '07', 'universal'),
    78: (33, '07', 'universal'),
    79: (33, '07', 'universal'),
    80: (34, '07', 'universal'),
    81: (34, '07', 'universal'),
    82: (34, '07', 'universal'),
    83: (34, '07', 'universal'),
    84: (35, '07', 'universal'),
    85: (36, '07', 'universal'),
    86: (37, '07', 'universal'),
    87: (38, '07', 'universal'),
    88: (39, '07', 'universal'),
    89: (40, '07', 'universal'),

    # File 08 — Имплементация: общие принципы
    71: (41, '08', 'universal'),
    72: (41, '08', 'universal'),
    73: (42, '08', 'universal'),
    74: (42, '08', 'universal'),
    75: (43, '08', 'universal'),
    76: (43, '08', 'universal'),
    94: (44, '08', 'universal'),

    # File 09 — США
    68: (45, '09', 'usa'),
    69: (45, '09', 'usa'),
    70: (46, '09', 'usa'),
    90: (52, '09', 'usa'),
}

# ── FILE_STRUCTURE ──
FILE_STRUCTURE = {
    '01': {
        'title': 'Введение и базовая формула',
        'part': 'I — Универсальная архитектура',
        'sections': [1, 2, 3, 4, 5],
    },
    '02': {
        'title': 'История, философия и парадигмальный сдвиг',
        'part': 'I — Универсальная архитектура',
        'sections': [6, 7, 8, 9, 10, 11],
    },
    '03': {
        'title': 'Теоретические основания',
        'part': 'I — Универсальная архитектура',
        'sections': [12, 13, 14, 15],
    },
    '04': {
        'title': 'Электоральная динамика и стратегия',
        'part': 'I — Универсальная архитектура',
        'sections': [16, 17, 18, 19, 20, 21, 22],
    },
    '05': {
        'title': 'Эмпирическая база и кейсы стран',
        'part': 'I — Универсальная архитектура',
        'sections': [23, 24, 25, 26, 27, 28],
    },
    '06': {
        'title': 'Структурное лицемерие и арсенал элит',
        'part': 'I — Универсальная архитектура',
        'sections': [29, 30, 31, 32],
    },
    '07': {
        'title': 'Социальная архитектура и манифест',
        'part': 'II — Социальная архитектура',
        'sections': [33, 34, 35, 36, 37, 38, 39, 40],
    },
    '08': {
        'title': 'Имплементация — общие принципы',
        'part': 'III — Имплементация: общие принципы',
        'sections': [41, 42, 43, 44],
    },
    '09': {
        'title': 'США-специфическая имплементация',
        'part': 'IV — США',
        'sections': [45, 46, 47, 48, 49, 50, 51, 52],
    },
    '10': {
        'title': 'Другие страны',
        'part': 'V — Другие страны',
        'sections': [],
    },
}

# New section titles for placeholders
PLACEHOLDER_TITLES = {
    5: 'Структурная новизна — пятый класс институциональных отношений',
    13: 'Теория игр: Downs, Buchanan-Tullock, Shapley',
    14: 'Поведенческая экономика и Alaska Permanent Fund Dividend',
    17: 'Прагматики vs Идеологи — новый электорат',
    24: 'Норвегия как естественный эксперимент',
    47: 'State-by-state анализ: Орегон, Калифорния, Колорадо, Массачусетс',
}

# New section titles from master plan
NEW_SECTION_TITLES = {
    1: 'Основная формула D = M * 1.5 * 1%',
    2: 'Защита от манипуляций',
    3: 'Отвергнутые варианты формулы',
    4: 'Базовые принципы AB-EXIT',
    6: '2500 лет одной проблемы (от Сократа до Веймара)',
    7: 'Совместимость с религиями',
    8: 'Say-Do Gap',
    9: 'Вакцина против 10 типов тиранов',
    10: 'Парадигмальный сдвиг',
    11: 'AB-EXIT как смена парадигмы — от обязанности к выбору',
    12: 'Иеринг и динамическая правовая традиция',
    15: 'Honest politicians thesis (PNAS 2020)',
    16: 'Возрастная экономика и треугольник центра',
    18: 'Три эпохи демократии',
    19: 'Цена плохого управления / Чичваркин',
    20: 'AB-EXIT сильнее UBI',
    21: 'Пустота центристов — первая эмоциональная речь',
    22: 'Консенсусная тема — объединяет три лагеря',
    23: 'Сравнительная эффективность: единицы процентов vs десятки процентов',
    25: 'Грузия и Саакашвили',
    26: 'Хантингтон и Тоффлер',
    27: 'Исчезающий класс работающих мужчин',
    28: 'Корейское чудо без Пак Чон Хи',
    29: 'Структурное лицемерие академической критики',
    30: 'Арсенал разумных элит',
    31: 'Раскол элит: Класс А, Класс Б1, Класс Б2',
    32: 'Фрагментация tech-элиты как мобилизационный потенциал',
    33: 'Философский манифест',
    34: 'Государство как корпорация',
    35: 'Маршрут B',
    36: 'Сравнение с 10 другими идеями',
    37: 'Возражение Далио',
    38: 'Наименования реформ',
    39: 'Противники',
    40: 'Медиа-стратегия',
    41: 'Портрет носителя — кто может запустить AB-EXIT',
    42: 'Защита от ядовитой пилюли',
    43: 'Двойная капитуляция Gemini Pro',
    44: 'Защита от election interference',
    45: 'Правовая база США: Foster v. Clark, U.S. Term Limits v. Thornton',
    46: 'Citizen-initiated statute — Орегон как первый кандидат',
    48: 'W-2 как источник данных',
    49: 'Юридический устав',
    50: 'Кейс Дэнвил (Danville)',
    51: 'Church Street vs город',
    52: '$676 Challenge',
}


def parse_v653(filepath):
    """Parse v6.53 into 94 sections."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Headers: ## N\. Title (literal backslash-dot from Google Docs export)
    pattern = re.compile(r'^## (\d+)\\\.(.+)$', re.MULTILINE)

    starts = []
    for m in pattern.finditer(content):
        starts.append((int(m.group(1)), m.start(), m.group(2).strip()))

    # Extract header (everything before section 1)
    header_end = starts[0][1] if starts else 0
    header = content[:header_end].rstrip()

    sections = {}
    for i, (num, start, title) in enumerate(starts):
        end = starts[i + 1][1] if i + 1 < len(starts) else len(content)
        sections[num] = {
            'title': title,
            'text': content[start:end].rstrip(),
        }

    return header, sections


def parse_new_sections(filepath):
    """Parse sections 96, 97, 98 from the supplementary file.

    Returns:
        full_sections: {96: text, 97: text, 98: text}
        sec97_subs: {1: text, 2: text, ..., 10: text}  (subsections of 97)
        sec97_header: text before first subsection of 97
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Top-level headers: \# N\. Title
    top_pat = re.compile(r'^\\# (96|97|98)\\\. ', re.MULTILINE)
    top_matches = list(top_pat.finditer(content))

    full_sections = {}
    for i, m in enumerate(top_matches):
        num = int(m.group(1))
        start = m.start()
        end = top_matches[i + 1].start() if i + 1 < len(top_matches) else len(content)
        full_sections[num] = content[start:end].rstrip()

    # Parse section 97 subsections
    sec97 = full_sections[97]
    sub_pat = re.compile(r'^\\#\\# 97\.(\d+)\.', re.MULTILINE)
    sub_matches = list(sub_pat.finditer(sec97))

    sec97_header = sec97[:sub_matches[0].start()].rstrip() if sub_matches else sec97
    sec97_subs = {}
    for i, m in enumerate(sub_matches):
        sub_num = int(m.group(1))
        start = m.start()
        end = sub_matches[i + 1].start() if i + 1 < len(sub_matches) else len(sec97)
        sec97_subs[sub_num] = sec97[start:end].rstrip()

    return full_sections, sec97_subs, sec97_header


def build_new_sections_map(v653_sections, new_full, sec97_subs, sec97_header):
    """Build a dict: new_section_num -> text content.

    Handles:
    - MAPPING (old sections -> new sections)
    - Special sections from 96/97/98
    - Placeholders for missing sections
    """
    result = {}

    # 1. Group old sections by new section number
    grouped = {}  # new_num -> [(old_num, text), ...]
    for old_num, (new_num, file_num, typ) in MAPPING.items():
        if old_num not in v653_sections:
            print(f"  WARNING: old section {old_num} not found in v6.53, skipping")
            continue
        if new_num not in grouped:
            grouped[new_num] = []
        grouped[new_num].append((old_num, v653_sections[old_num]['text']))

    # Sort each group by old section number
    for new_num in grouped:
        grouped[new_num].sort(key=lambda x: x[0])

    # Write grouped sections
    for new_num, parts in grouped.items():
        result[new_num] = '\n\n'.join(text for _, text in parts)

    # 2. Special sections from 96/97/98
    # Section 98 -> new 11
    result[11] = new_full[98]

    # Section 97.5 -> new 23
    result[23] = sec97_subs[5]

    # Section 96 -> new 29
    result[29] = new_full[96]

    # Section 97 (without 97.5) split into 30, 31, 32
    # 30: header + 97.1-97.4 + 97.6-97.8
    parts_30 = [sec97_header]
    for sub in [1, 2, 3, 4, 6, 7, 8]:
        if sub in sec97_subs:
            parts_30.append(sec97_subs[sub])
    result[30] = '\n\n'.join(parts_30)

    # 31: 97.9 (Раскол элит)
    result[31] = sec97_subs[9]

    # 32: 97.10 (Фрагментация tech-элиты)
    result[32] = sec97_subs[10]

    # 3. Placeholders for sections without source
    for new_num, title in PLACEHOLDER_TITLES.items():
        if new_num not in result:
            result[new_num] = (
                f"## {new_num}. {title}\n\n"
                f"*[Раздел требует написания. Placeholder для v6.56.]*"
            )

    return result


def generate_split_files(new_sections_map):
    """Generate 10 split files."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    file_paths = {}

    for file_num, info in FILE_STRUCTURE.items():
        safe_title = (info['title']
                      .replace(' ', '_')
                      .replace('—', '-')
                      .replace(',', '')
                      .replace(':', ''))
        filename = f"{file_num}_{safe_title}.md"
        filepath = os.path.join(OUTPUT_DIR, filename)

        lines = []
        # File header
        lines.append(f"# AB-EXIT v6.56 — Файл {file_num}: {info['title']}")
        lines.append('')
        lines.append(f"**Часть {info['part']}**")
        lines.append(f"**Версия:** 6.56 (10 июня 2026)")
        lines.append(f"**Базовая версия:** v6.53 (3 июня 2026) + разделы 96, 97, 98")
        lines.append('')
        lines.append('---')
        lines.append('')

        if file_num == '10':
            # Placeholder for other countries
            lines.append("*Этот файл — placeholder для страновых разделов.*")
            lines.append('')
            lines.append("Планируемые разделы:")
            lines.append("- 53. Молдова: возможности и пилотные регионы")
            lines.append("- 54. Швейцария: естественный кандидат с UBI референдумом 2016")
            lines.append("- 55. ЕС-страны с прямой демократией (Италия, Латвия, Литва, Ирландия)")
            lines.append("- 56. Россия (постпутинский сценарий)")
            lines.append('')
            lines.append("*Требуют написания в следующих сессиях.*")
        else:
            # Write sections in order
            for sec_num in info['sections']:
                if sec_num in new_sections_map:
                    lines.append(new_sections_map[sec_num])
                    lines.append('')
                else:
                    # This shouldn't happen if build_new_sections_map is correct
                    title = NEW_SECTION_TITLES.get(sec_num, f'Раздел {sec_num}')
                    lines.append(f"## {sec_num}. {title}")
                    lines.append('')
                    lines.append("*[Содержимое отсутствует]*")
                    lines.append('')

        content = '\n'.join(lines)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        size_kb = len(content.encode('utf-8')) / 1024
        print(f"  {filename} ({size_kb:.1f} KB)")
        file_paths[file_num] = filepath

    return file_paths


def generate_monolith(file_paths):
    """Generate the monolith by concatenating all 10 split files."""
    monolith_path = os.path.join(OUTPUT_DIR, 'AB-EXIT_v6.56_MONOLITH.md')

    lines = []
    lines.append("# AB-EXIT — Полный аналитический документ v6.56 FINAL")
    lines.append('')
    lines.append("**Версия:** 6.56 (10 июня 2026)")
    lines.append("**Базовая версия:** v6.53 (3 июня 2026)")
    lines.append("**Статус:** Реорганизованная редакция с интеграцией разделов 96, 97, 98")
    lines.append("**Структура:** 52 раздела в 10 тематических файлах")
    lines.append('')

    # Table of contents
    lines.append("## Содержание")
    lines.append('')
    for file_num, info in FILE_STRUCTURE.items():
        lines.append(f"**Файл {file_num} — {info['title']}** (Часть {info['part']})")
        for sec_num in info['sections']:
            title = NEW_SECTION_TITLES.get(sec_num,
                    PLACEHOLDER_TITLES.get(sec_num, f'Раздел {sec_num}'))
            lines.append(f"- {sec_num}. {title}")
        if file_num == '10' and not info['sections']:
            lines.append("- *Placeholder для страновых разделов*")
        lines.append('')

    lines.append('---')
    lines.append('')

    # Concatenate all files
    for file_num in sorted(file_paths.keys()):
        with open(file_paths[file_num], 'r', encoding='utf-8') as f:
            lines.append(f.read())
        lines.append('')
        lines.append('---')
        lines.append('')

    content = '\n'.join(lines)
    with open(monolith_path, 'w', encoding='utf-8') as f:
        f.write(content)

    size_kb = len(content.encode('utf-8')) / 1024
    print(f"  Monolith: AB-EXIT_v6.56_MONOLITH.md ({size_kb:.1f} KB)")
    return monolith_path


def upload_to_drive(file_paths, monolith_path):
    """Upload all files to Google Drive."""
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload

    # Load credentials
    if not os.path.exists(TOKEN_PATH):
        print("ERROR: drive_token.json not found. Run upload_to_drive.py first.")
        sys.exit(1)

    CLIENT_ID = '202264815644.apps.googleusercontent.com'
    CLIENT_SECRET = 'X4Z3ca8xfWDb1Voo-F9a7ZxJ'
    SCOPES = ['https://www.googleapis.com/auth/drive.file']

    creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        with open(TOKEN_PATH, 'w') as f:
            f.write(creds.to_json())

    service = build('drive', 'v3', credentials=creds)

    def upload_one(local_path, title, folder_id, retries=3):
        """Upload a markdown file as Google Doc with retry."""
        for attempt in range(retries):
            try:
                meta = {
                    'name': title,
                    'parents': [folder_id],
                    'mimeType': 'application/vnd.google-apps.document',
                }
                media = MediaFileUpload(local_path, mimetype='text/markdown',
                                        resumable=True)
                result = service.files().create(
                    body=meta, media_body=media,
                    fields='id, name, webViewLink'
                ).execute()
                return result
            except Exception as e:
                if attempt < retries - 1:
                    wait = 30 * (attempt + 1)
                    print(f"    Rate limit or error, waiting {wait}s... ({e})")
                    time.sleep(wait)
                else:
                    raise

    results = []

    # Upload split files to subfolder
    print(f"\nUploading 10 split files to subfolder {FOLDER_SPLIT}...")
    for file_num in sorted(file_paths.keys()):
        path = file_paths[file_num]
        title = f"{file_num}_{FILE_STRUCTURE[file_num]['title']}"
        size_kb = os.path.getsize(path) / 1024
        print(f"  Uploading {os.path.basename(path)} ({size_kb:.1f} KB)...")

        r = upload_one(path, title, FOLDER_SPLIT)
        results.append((file_num, r, size_kb, 'split'))
        print(f"    Done: {r['name']} (ID: {r['id']})")
        time.sleep(2)  # small delay between uploads

    # Upload monolith to main folder
    print(f"\nUploading monolith to folder {FOLDER_MAIN}...")
    size_kb = os.path.getsize(monolith_path) / 1024
    print(f"  Uploading AB-EXIT_v6.56_MONOLITH.md ({size_kb:.1f} KB)...")
    r = upload_one(monolith_path, 'AB-EXIT_v6.56_FINAL_COMPLETE', FOLDER_MAIN)
    results.append(('monolith', r, size_kb, 'monolith'))
    print(f"    Done: {r['name']} (ID: {r['id']})")

    return results


def print_summary(upload_results):
    """Print final summary."""
    print("\n" + "=" * 60)
    print("ГОТОВО — ПУТЬ A. Финальный v6.56 собран и загружен в Drive.")
    print("=" * 60)

    monolith = None
    splits = []
    for item in upload_results:
        if item[3] == 'monolith':
            monolith = item
        else:
            splits.append(item)

    if monolith:
        _, r, size_kb, _ = monolith
        print(f"\nГлавный файл (монолит):")
        print(f"  Название: {r['name']}")
        print(f"  ID: {r['id']}")
        url = r.get('webViewLink',
                     f"https://docs.google.com/document/d/{r['id']}/edit")
        print(f"  URL: {url}")
        print(f"  Размер: {size_kb:.0f} KB")

    print(f"\n10 split-файлов:")
    total_split_kb = 0
    for file_num, r, size_kb, _ in splits:
        total_split_kb += size_kb
        url = r.get('webViewLink',
                     f"https://docs.google.com/document/d/{r['id']}/edit")
        print(f"  {r['name']}: {r['id']} ({size_kb:.0f} KB)")

    print(f"\nОбщий размер split: {total_split_kb:.0f} KB")
    print("\nВсе разделы реорганизованы согласно Master Plan.")
    print("Полные тексты разделов 96, 97, 98 интегрированы.")
    print("Файл 09 содержит всю США-специфику.")
    print("Файл 10 — placeholder для других стран.")


def main():
    print("=" * 60)
    print("AB-EXIT v6.56 Assembly — Path A")
    print("=" * 60)

    # Step 1: Parse v6.53
    print("\n[1/5] Parsing v6.53...")
    v653_path = os.path.join(BASE_DIR, 'v6.53.md')
    header, sections = parse_v653(v653_path)
    print(f"  Found {len(sections)} sections (expected 94)")
    if len(sections) != 94:
        print(f"  WARNING: expected 94 sections, got {len(sections)}")
        print(f"  Section numbers: {sorted(sections.keys())}")

    # Step 2: Parse new sections 96/97/98
    print("\n[2/5] Parsing sections 96, 97, 98...")
    new_path = os.path.join(BASE_DIR, 'sections_96_97_98.md')
    new_full, sec97_subs, sec97_header = parse_new_sections(new_path)
    print(f"  Section 96: {len(new_full[96])} chars")
    print(f"  Section 97: {len(new_full[97])} chars "
          f"({len(sec97_subs)} subsections)")
    print(f"  Section 98: {len(new_full[98])} chars")
    print(f"  Section 97.5 (extracted): {len(sec97_subs.get(5, ''))} chars")

    # Step 3: Build mapping
    print("\n[3/5] Applying MAPPING...")
    new_sections_map = build_new_sections_map(
        sections, new_full, sec97_subs, sec97_header)
    print(f"  Built {len(new_sections_map)} new sections")

    # Verify coverage
    all_expected = set()
    for info in FILE_STRUCTURE.values():
        all_expected.update(info['sections'])
    missing = all_expected - set(new_sections_map.keys())
    if missing:
        print(f"  WARNING: missing sections: {sorted(missing)}")
    else:
        print(f"  All {len(all_expected)} sections covered")

    # Step 4: Generate files
    print("\n[4/5] Generating split files...")
    file_paths = generate_split_files(new_sections_map)

    print("\n  Generating monolith...")
    monolith_path = generate_monolith(file_paths)

    # Step 5: Upload
    if '--no-upload' in sys.argv:
        print("\n[5/5] Upload skipped (--no-upload flag)")
        print(f"\nFiles saved to: {OUTPUT_DIR}")
        return

    print("\n[5/5] Uploading to Google Drive...")
    results = upload_to_drive(file_paths, monolith_path)
    print_summary(results)


if __name__ == '__main__':
    main()
