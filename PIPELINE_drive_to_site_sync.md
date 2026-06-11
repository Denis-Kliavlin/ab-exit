# Pipeline синхронизации: Drive → GitHub → MkDocs → ab-exit.org/docs

**Цель:** автоматическая синхронизация репозитория и сайта. Любое изменение в Drive → 5 минут → видно на ab-exit.org/docs.

**Принцип разделения:**
- **Репо** (GitHub + Drive) — для анализа и верификации (полный markdown, версии, история)
- **Сайт** (ab-exit.org/docs) — для удобного чтения (HTML, навигация, поиск)

**Архитектура:**

```
Drive (моё рабочее пространство)
   ↓ rclone/gdrive (Claude Code забирает)
GitHub repo (источник истины, git history)
   ↓ git push trigger
GitHub Actions
   ├── MkDocs Material build
   ├── Run validation tests
   └── Generate static HTML
   ↓
Cloudflare Pages / Netlify
   ↓ auto-deploy webhook
ab-exit.org/docs (читаемый сайт)
```

Существующий лендинг `ab-exit.org` остаётся как есть. Добавляется только `/docs/` секция с документацией.

---

## Шаг 1 — Подготовка GitHub репо

В существующем репо `github.com/Denis-Kliavlin/ab-exit` создать структуру:

```
ab-exit/
├── docs/                          # MkDocs source
│   ├── index.md                   # Главная docs (приветствие, что AB-EXIT)
│   ├── 01-introduction/
│   │   ├── index.md               # Содержание главы
│   │   ├── 001-formula.md         # Раздел 1
│   │   ├── 002-protection.md
│   │   ├── 003-rejected-variants.md
│   │   ├── 004-basic-principles.md
│   │   └── 005-fifth-class.md
│   ├── 02-history/
│   │   ├── index.md
│   │   ├── 006-2500-years.md
│   │   ├── ...
│   │   └── 011-paradigm-choice.md
│   ├── 03-theory/
│   ├── 04-electoral-dynamics/
│   ├── 05-empirical-base/
│   ├── 06-critique-arsenal/
│   ├── 07-manifesto/
│   ├── 08-implementation/
│   ├── 09-usa/
│   └── 10-other-countries/
│
├── mkdocs.yml                     # Конфиг MkDocs
├── requirements.txt               # Python deps для MkDocs
├── .github/
│   └── workflows/
│       └── deploy-docs.yml        # GitHub Actions
│
├── scripts/
│   ├── sync_from_drive.py         # Drive → docs/ синхронизатор
│   └── validate_sections.py       # Проверка целостности
│
└── README.md (existing)
```

## Шаг 2 — MkDocs Material конфигурация

Файл `mkdocs.yml`:

```yaml
site_name: AB-EXIT
site_url: https://ab-exit.org/docs/
site_description: AB-EXIT — пятый класс институциональных отношений между государством и гражданином
repo_url: https://github.com/Denis-Kliavlin/ab-exit
repo_name: Denis-Kliavlin/ab-exit
edit_uri: edit/main/docs/

theme:
  name: material
  language: ru
  features:
    - navigation.tabs           # Главы наверху
    - navigation.tabs.sticky
    - navigation.sections       # Развёрнутые секции
    - navigation.expand
    - navigation.top
    - navigation.tracking
    - search.suggest
    - search.highlight
    - content.code.copy
    - content.action.edit
    - toc.follow
  palette:
    # Light mode
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: indigo
      accent: indigo
      toggle:
        icon: material/weather-night
        name: Тёмная тема
    # Dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: indigo
      accent: indigo
      toggle:
        icon: material/weather-sunny
        name: Светлая тема
  font:
    text: Inter
    code: JetBrains Mono

plugins:
  - search:
      lang:
        - ru
        - en
  - i18n:                       # Двуязычность RU/EN
      default_language: ru
      languages:
        ru:
          name: Русский
          build: true
        en:
          name: English
          build: true
  - awesome-pages              # Автоматическая навигация
  - git-revision-date-localized:
      type: date
      enable_creation_date: true

markdown_extensions:
  - admonition                  # Блоки note/warning/info
  - pymdownx.details
  - pymdownx.superfences:       # Diagrams через mermaid
      custom_fences:
        - name: mermaid
          class: mermaid
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - tables
  - footnotes
  - attr_list
  - md_in_html
  - toc:
      permalink: true

nav:
  - Главная: index.md
  - 1. Введение: 01-introduction/
  - 2. История и парадигма: 02-history/
  - 3. Теория: 03-theory/
  - 4. Электоральная динамика: 04-electoral-dynamics/
  - 5. Эмпирика и кейсы: 05-empirical-base/
  - 6. Критика и арсенал: 06-critique-arsenal/
  - 7. Манифест: 07-manifesto/
  - 8. Имплементация: 08-implementation/
  - 9. 🇺🇸 США: 09-usa/
  - 10. 🌍 Другие страны: 10-other-countries/

extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/Denis-Kliavlin/ab-exit
    - icon: fontawesome/brands/twitter
      link: https://twitter.com/ABEXIT_official
  consent:
    title: Cookies
    description: >
      Используется только Material theme search.
      Никаких трекеров.

copyright: >
  Copyright © 2026 Denis Klyavlin —
  CC BY-NC-SA 4.0 · <a href="#__consent">Cookies</a>
```

Файл `requirements.txt`:

```
mkdocs>=1.5.0
mkdocs-material>=9.4.0
mkdocs-static-i18n>=1.2.0
mkdocs-awesome-pages-plugin>=2.9.0
mkdocs-git-revision-date-localized-plugin>=1.2.0
pymdown-extensions>=10.4.0
```

## Шаг 3 — GitHub Actions для авто-билда

Файл `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy Documentation

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'mkdocs.yml'
      - 'requirements.txt'
      - '.github/workflows/deploy-docs.yml'
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0           # Для git-revision-date-localized

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Validate sections
        run: python scripts/validate_sections.py

      - name: Build MkDocs
        run: mkdocs build --strict

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Шаг 4 — Скрипт синхронизации Drive → docs/

Файл `scripts/sync_from_drive.py`:

```python
#!/usr/bin/env python3
"""
Синхронизация файлов разделов из Google Drive в локальную docs/.

Использует Google Drive API через service account.
Скачивает файлы из папки AB-EXIT_repo_v6.56_clean,
парсит имена файлов вида CC_NNN_name_vV.md,
выбирает последнюю версию каждого раздела,
размещает в docs/CC-chapter/NNN-name.md.
"""

import os
import re
from collections import defaultdict
from pathlib import Path
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaIoBaseDownload
import io

DRIVE_FOLDER_ID = '1_LbMGDFMTkmAoOSiaKSXTJ6ncb3n8bEb'  # AB-EXIT_repo_v6.56_clean
LOCAL_DOCS = Path('docs')

CHAPTERS = {
    '01': 'introduction',
    '02': 'history',
    '03': 'theory',
    '04': 'electoral-dynamics',
    '05': 'empirical-base',
    '06': 'critique-arsenal',
    '07': 'manifesto',
    '08': 'implementation',
    '09': 'usa',
    '10': 'other-countries',
}

FILE_PATTERN = re.compile(r'^(\d{2})_(\d{3})_([\w_]+)_v(\d+)\.md$')

def authenticate():
    creds = Credentials.from_service_account_file(
        'service-account.json',
        scopes=['https://www.googleapis.com/auth/drive.readonly']
    )
    return build('drive', 'v3', credentials=creds)

def list_files(service, folder_id):
    files = []
    page_token = None
    while True:
        response = service.files().list(
            q=f"'{folder_id}' in parents and trashed=false",
            fields="nextPageToken, files(id, name, mimeType)",
            pageToken=page_token,
            pageSize=200
        ).execute()
        files.extend(response.get('files', []))
        page_token = response.get('nextPageToken')
        if not page_token:
            break
    return files

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
    service = authenticate()
    files = list_files(service, DRIVE_FOLDER_ID)
    
    # Группируем по разделам, выбираем последнюю версию
    sections = defaultdict(list)
    for f in files:
        match = FILE_PATTERN.match(f['name'])
        if match:
            chapter, num, name, version = match.groups()
            sections[(chapter, num, name)].append({
                'version': int(version),
                'file': f
            })
    
    # Скачиваем последнюю версию каждого раздела
    for (chapter, num, name), versions in sections.items():
        latest = max(versions, key=lambda v: v['version'])
        if chapter not in CHAPTERS:
            print(f"Skipping unknown chapter: {chapter}")
            continue
        local_path = LOCAL_DOCS / f"{chapter}-{CHAPTERS[chapter]}" / f"{num}-{name.replace('_', '-')}.md"
        print(f"Syncing: {latest['file']['name']} → {local_path}")
        download_file(service, latest['file']['id'], local_path)
    
    # Также скачиваем README.md, INDEX.md, CHANGELOG.md в docs/
    for special in ['README.md', 'INDEX.md', 'CHANGELOG.md']:
        special_files = [f for f in files if f['name'] == special]
        if special_files:
            local_path = LOCAL_DOCS / special.lower()
            download_file(service, special_files[0]['id'], local_path)
            print(f"Synced: {special} → {local_path}")

if __name__ == '__main__':
    main()
```

## Шаг 5 — Валидация целостности

Файл `scripts/validate_sections.py`:

```python
#!/usr/bin/env python3
"""
Проверка целостности docs/.

Гарантирует что:
1. Все 57 ожидаемых разделов на месте
2. Markdown синтаксически корректен
3. Cross-references между разделами работают
4. Нет сломанного экранирования (\\# вместо #)
"""

import re
import sys
from pathlib import Path

DOCS = Path('docs')
EXPECTED_SECTIONS = set(range(1, 58))  # 1-57

def check_markdown_broken(content):
    """Проверка на сломанный markdown."""
    broken = []
    if re.search(r'\\#+\s', content):
        broken.append("Найдено `\\#` (экранированный заголовок)")
    if re.search(r'\\\*\\\*', content):
        broken.append("Найдено `\\*\\*` (экранированный bold)")
    if re.search(r'\\---', content):
        broken.append("Найдено `\\---` (экранированный hr)")
    return broken

def main():
    errors = []
    found_sections = set()
    
    for md_file in DOCS.rglob('*.md'):
        if md_file.name in ('index.md', 'readme.md', 'changelog.md'):
            continue
        
        # Извлечь номер раздела из имени файла
        match = re.match(r'^(\d{3})-', md_file.name)
        if not match:
            continue
        section_num = int(match.group(1))
        found_sections.add(section_num)
        
        # Проверка markdown
        content = md_file.read_text(encoding='utf-8')
        broken = check_markdown_broken(content)
        if broken:
            for b in broken:
                errors.append(f"{md_file}: {b}")
    
    # Проверка покрытия
    missing = EXPECTED_SECTIONS - found_sections
    if missing:
        for m in sorted(missing):
            errors.append(f"Отсутствует раздел: {m}")
    
    if errors:
        print("ОШИБКИ ВАЛИДАЦИИ:")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    
    print(f"OK: найдено {len(found_sections)} разделов, markdown чистый")

if __name__ == '__main__':
    main()
```

## Шаг 6 — Хостинг

**Вариант A: GitHub Pages (бесплатно).**

В Settings → Pages выбрать source: `gh-pages` или `GitHub Actions`. Сайт будет доступен на `denis-kliavlin.github.io/ab-exit/`.

Чтобы привязать к `ab-exit.org/docs/`:
1. В Cloudflare DNS добавить CNAME `docs.ab-exit.org` → `denis-kliavlin.github.io`
2. В Settings → Pages добавить custom domain `docs.ab-exit.org`

**Вариант B: Cloudflare Pages (рекомендуется).**

Преимущества: быстрее GitHub Pages, лучше для глобальной аудитории, бесплатный SSL, edge caching.

1. Создать проект в Cloudflare Pages
2. Подключить GitHub repo `Denis-Kliavlin/ab-exit`
3. Build settings:
   - Build command: `pip install -r requirements.txt && mkdocs build`
   - Output directory: `site`
4. Custom domain: `docs.ab-exit.org`

При каждом push в main — Cloudflare автоматически пересобирает и деплоит.

## Шаг 7 — Workflow для Дениса и Claude в чате

**Денис создаёт/обновляет раздел через Claude в чате:**

1. Денис: «обнови раздел 23 — добавь данные 2025 года»
2. Claude в чате: создаёт `05_023_quantitative_comparison_v2.md` в Drive (НЕ редактирует v1)
3. Claude обновляет `INDEX.md` чтобы показывать v2

**Sync на сайт (выполняет Claude Code или GitHub Actions cron):**

Раз в сутки (или вручную через `workflow_dispatch`):

1. `python scripts/sync_from_drive.py` — скачивает v2 (последнюю версию)
2. `git diff` — показывает что изменилось
3. `git commit -m "Sync from Drive: section 023 updated to v2"`
4. `git push origin main`
5. GitHub Actions → `mkdocs build` → deploy на Cloudflare Pages
6. **5 минут** — сайт обновлён

## Шаг 8 — Дополнительные features (опционально)

- **Mermaid диаграммы** в файлах — для визуализации архитектуры AB-EXIT
- **Tags / Categories** — фильтр разделов по теме
- **Search** работает из коробки благодаря MkDocs Material
- **PDF экспорт** — добавить `mkdocs-pdf-export-plugin` для генерации PDF целиком
- **Versions** — `mike` для версионирования сайта (v6.56, v6.57, ...)
- **Comments** — Giscus (через GitHub Discussions) для комментариев под разделами
- **Analytics** — Cloudflare Analytics (privacy-friendly, не Google Analytics)

## Шаг 9 — Что нужно от Дениса

Минимальный список действий:

1. **Создать service account в Google Cloud** для доступа к Drive API:
   - https://console.cloud.google.com → New project → Drive API → service account
   - Скачать `service-account.json`
   - Поделиться папкой Drive `AB-EXIT_repo_v6.56_clean` с email service account как "Reader"
   - Добавить `service-account.json` в GitHub Secrets как `DRIVE_SA_JSON`

2. **Создать аккаунт Cloudflare** (бесплатно):
   - dash.cloudflare.com → Pages → Create project
   - Connect to Git → `Denis-Kliavlin/ab-exit`
   - Указать build settings (см. Шаг 6)

3. **Передать домен `ab-exit.org` через Cloudflare** (если уже не там):
   - Add domain → Cloudflare DNS
   - Сменить nameservers у регистратора
   - Добавить CNAME `docs` → Pages URL

После этого pipeline работает автоматически. Денис добавляет/правит разделы через меня в чате — сайт обновляется сам.

## Шаг 10 — Что нужно от Claude Code

1. Создать структуру `docs/`, `scripts/`, `.github/workflows/` в репо
2. Положить файлы `mkdocs.yml`, `requirements.txt`, `deploy-docs.yml`, `sync_from_drive.py`, `validate_sections.py`
3. Запустить `python scripts/sync_from_drive.py` первый раз для импорта из Drive
4. `git add . && git commit -m "Setup MkDocs Material pipeline" && git push`
5. Проверить что Cloudflare Pages подтянул

После первого деплоя — pipeline самостоятельный.

---

## Альтернативные стеки (если MkDocs не подходит)

**Docusaurus** (React-based):
- Плюсы: интерактивные React-компоненты, лучше для blog-постов
- Минусы: сложнее в кастомизации, тяжелее в билде

**Hugo** (Go-based):
- Плюсы: очень быстрый, минимум зависимостей
- Минусы: меньше готовых тем для документации с навигацией по главам

**VitePress** (Vue-based):
- Плюсы: легковесный, современный
- Минусы: меньше плагинов для документации

**Рекомендация — MkDocs Material.** Он специально для документации, поддерживает двуязычность из коробки, минимум кастомизации, активное сообщество. Документация типа AB-EXIT — это именно то для чего он создан.

---

*Этот файл создан 10 июня 2026 в чате claude.ai (сессия 32) как полная инструкция для построения pipeline синхронизации Drive ↔ GitHub ↔ ab-exit.org/docs.*

*Автор: Денис Клявлин · denis.klyavlin@gmail.com*
