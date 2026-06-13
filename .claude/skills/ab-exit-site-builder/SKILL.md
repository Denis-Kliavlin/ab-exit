---
name: ab-exit-site-builder
description: |
  Автоматически синхронизирует репозиторий AB-EXIT из Google Drive snapshot папок
  (AB-EXIT_repo_vX.YY.Z_clean_YYYY-MM-DD) в MkDocs Material сайт на ab-exit.com/docs,
  а также лендинг ab-exit.com из Drive landing snapshot папок
  (AB-EXIT_landing_vX.Y_clean_YYYY-MM-DD) на Guardian сервер.
  Auto-detects latest snapshot by version, regenerates site, commits to GitHub.
  Cloudflare Pages deploys automatically. Landing deploys via SCP to Guardian.
allowed-tools: [Bash, Read, Write, Edit, Glob, Grep]
version: 1.1.0
author: Denis Klyavlin
---

# AB-EXIT Site Builder — Claude Code Skill

## Что делает этот skill

При запуске:

1. **Находит последний snapshot** в Google Drive. Парсит имена папок `AB-EXIT_repo_vX.YY.Z_clean_YYYY-MM-DD`, выбирает с максимальной семантической версией.
2. **Скачивает все markdown файлы** из этой папки через Drive API.
3. **Копирует в `docs/`** локального клона GitHub репо, разнося по подпапкам глав согласно префиксам имён файлов (`01_001_*` -> `docs/01-introduction/001-*.md`).
4. **Обновляет `mkdocs.yml`** с актуальной версией и навигацией.
5. **Делает git commit + push** в `main` ветку с осмысленным сообщением.
6. **Cloudflare Pages автоматически пересобирает** сайт за 2-5 минут.

С v1.1 skill также синхронизирует лендинг (`ab-exit.com/ru/`, `/en/`, подстраницы) из Drive landing snapshot папок.

## Архитектура целевого сайта

```
ab-exit.com/
├── /ru/               ← лендинг RU (skill синхронизирует из Drive с v1.1)
│   ├── index.html     ← ru_index.html из Drive
│   ├── /repo/         ← ru_repo.html -> /ru/repo/index.html
│   └── /faq/          ← ru_faq.html (когда появится)
├── /en/               ← лендинг EN (skill синхронизирует из Drive с v1.1)
│   ├── index.html     ← en_index.html из Drive
│   └── /repo/         ← en_repo.html (когда появится)
├── /assets/           ← OG-image, CSS (сохраняются)
├── index.html         ← корневой redirect (сохраняется)
└── /docs/             ← MkDocs Material сайт (skill синхронизирует)
    ├── 01-introduction/
    │   ├── 001-formula.md
    │   ├── 002-protection.md
    │   ├── ...
    │   └── 005-fifth-class.md
    ├── 02-history/
    ├── ...
    └── 10-other-countries/
```

Палитра MkDocs темы переопределена под партии США (синий #3080F0, красный #E04040, чёрный фон) — в едином стиле с лендингом.

## Использование

### Manual запуск (локально)

```bash
cd /path/to/ab-exit-repo
claude run ab-exit-site-builder
```

или с конкретной snapshot версией:

```bash
claude run ab-exit-site-builder --version v6.57.1
```

### Auto-run через GitHub Actions (раз в час)

Skill устанавливает cron в `.github/workflows/sync-from-drive.yml`. Каждый час проверяет Drive на новые snapshot папки. Если найдена новая — синхронизирует.

### Auto-run по триггеру от меня (Claude в чате)

Когда Claude в чате создаёт новый snapshot в Drive (например v6.57.1 с страновыми разделами), Денис может вручную trigger workflow через GitHub Actions UI (`workflow_dispatch`). Или ждать следующего часового cron.

## Pre-requisites — настройка один раз

### 1. Service account для Drive API

```bash
# Google Cloud Console:
# - New project (или существующий)
# - Enable Drive API
# - Create service account
# - Download service-account.json key
# - В Drive: расшарь корневую папку AB-EXIT с email service account как Viewer
```

Положи `service-account.json` в `~/.config/ab-exit/service-account.json` (НЕ коммить в git).

Для GitHub Actions: добавь содержимое JSON в Secret `GDRIVE_SA_JSON`.

### 2. GitHub repo и Cloudflare Pages

Должны быть уже настроены (это уже сделано — `Denis-Kliavlin/ab-exit` + Cloudflare Pages project `ab-exit-docs`).

### 3. Python deps

```bash
pip install google-api-python-client google-auth mkdocs mkdocs-material mkdocs-static-i18n
```

## Implementation

Skill создаёт следующие файлы при первом запуске (если их нет):

- `scripts/sync_from_drive.py` — основной sync скрипт
- `.github/workflows/sync-from-drive.yml` — GitHub Actions cron
- `docs/assets/stylesheets/ab-exit-theme.css` — кастомная CSS тема
- `mkdocs.yml` — конфигурация MkDocs Material

## Установка

```bash
cd ~/projects/ab-exit
mkdir -p .claude/skills/ab-exit-site-builder
# SKILL.md уже здесь

# Вспомогательные файлы:
# scripts/sync_from_drive.py
# .github/workflows/sync-from-drive.yml
# docs/assets/stylesheets/ab-exit-theme.css
# mkdocs.yml

# Первый запуск:
python scripts/sync_from_drive.py --no-push
```

## Landing sync (v1.1)

### Источник

Drive landing snapshot папки: `AB-EXIT_landing_vX.Y_clean_YYYY-MM-DD`

Текущий snapshot: `AB-EXIT_landing_v2.0_clean_2026-06-11` (ID: `1uUN8D6h832gzHK7rnvyzGdsGRVa0XbiC`)

### Naming convention файлов лендинга

| Имя в Drive | Путь на сайте | Статус |
|---|---|---|
| `denis_ru_index.html` | `/ru/index.html` | **АКТИВНЫЙ** — Denis's original bilingual page (default: RU) |
| `denis_en_index.html` | `/en/index.html` | **АКТИВНЫЙ** — Denis's original bilingual page (default: EN) |
| `ru_index.html` | ~~`/ru/index.html`~~ | **DEPRECATED** — v2.0 Claude-generated, НЕ ДЕПЛОИТЬ |
| `en_index.html` | ~~`/en/index.html`~~ | **DEPRECATED** — v2.0 Claude-generated, НЕ ДЕПЛОИТЬ |
| `ru_repo.html` | `/ru/repo/index.html` | активный |
| `en_repo.html` | `/en/repo/index.html` | активный |
| `ru_faq.html` | `/ru/faq/index.html` | активный |
| `root_index.html` | `/index.html` | активный |
| `assets_*` | `/assets/*` | активный |

**Приоритет:** файлы с префиксом `denis_` имеют приоритет над файлами без префикса для тех же путей.
Правило: префикс до первого `_` = папка. Для страниц `*_<name>.html` где name != index — кладётся как `/<prefix>/<name>/index.html` (clean URLs).
Исключение: `denis_ru_index.html` → `/ru/index.html`, `denis_en_index.html` → `/en/index.html`.

### Деплой лендинга

Хостинг: Guardian (45.155.52.117), web root: `/var/www/ab-exit.com/`
Деплой: SCP файлов на Guardian через `vpx_connect.py exec guardian`.

### Правило деградации

Если страницы нет в Drive snapshot — skill НЕ удаляет её на хостинге. Drive перекрывает только те страницы, которые в нём есть.

## Ограничения

- Drive — единственный источник правды для документации и лендинга
- Ручные правки в `docs/` на GitHub будут перезаписаны при следующем sync
- Skill не валидирует markdown перед push (TODO: `mkdocs build --strict`)
- Файлы `CNAME` и `.nojekyll` в `docs/` защищены от удаления
- Landing деплой не трогает `/assets/`, `/index.html`, `/docs/`

## Сборка сайта — ТОЛЬКО через build-docs.vbs (без всплывающих окон)

**ЗАПРЕЩЕНО** запускать `mkdocs build` / `python -m mkdocs build` напрямую как фоновую
(`run_in_background`/detached) команду на Windows: осиротевший python получает свою
консоль и **всплывает окно Windows Terminal** (раздражает пользователя).

**ОБЯЗАТЕЛЬНО** собирать через скрытый wrapper в корне проекта:

```bash
wscript "<проект>/build-docs.vbs"          # strict (по умолчанию)
wscript "<проект>/build-docs.vbs" plain    # без --strict
wscript "<проект>/build-docs.vbs" serve    # mkdocs serve, скрыто, в фоне
```

- `WScript.Shell.Run(..., 0, True)` — окно скрыто (style 0), консоль не показывается никогда.
- Запускать **foreground** (ждать завершения). Результат сборки — в `build.log` (читать его, не stdout).
- Для одиночного билда из Bash-тула: `cscript //nologo "<проект>/build-docs.vbs" plain` и затем читать `build.log`.
- Подстраховка на уровне системы: `C:\vpn\hide-build-windows.ps1` прячет любые проскочившие
  detached-окна сборки (см. его шапку).

## Будущие версии

- **v1.2:** двуязычность EN — отдельная синхронизация `docs/en/`
- **v1.3:** webhook от Drive (через Google Apps Script trigger) -> instant sync
- **v2.0:** интеграция с лендингом — preview-секции на главной `/ru/`
