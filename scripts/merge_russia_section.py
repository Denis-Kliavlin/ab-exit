#!/usr/bin/env python3
"""Слить три Drive-части (056a/056b/056c) в docs/10-other-countries/056-russia.md.

Правила слияния (из SESSION_UPDATE_2026-08-12_batch15, п.4):
  - общий H1 «Россия: сценарий внедрения при текущем режиме»
  - H1 каждой части → H2
  - служебные шапки частей (Глава/Файл/Версия/Дата/Рамка/Жанр) убрать
  - блоки «Связанные» вынести из частей и объединить в один в конце
"""

import re
from pathlib import Path

REPO = Path(__file__).parent.parent
INBOX = REPO / '_drive_inbox'
TARGET = REPO / 'docs' / '10-other-countries' / '056-russia.md'

PARTS = [
    '10_056a_gaaze_russia_scenario_v1.md',
    '10_056b_russia_layers_v1.md',
    '10_056c_loyalist_majority_v1.md',
]

H1 = 'Россия: сценарий внедрения при текущем режиме'
HEADER_FIELD = re.compile(r'^\*\*(Глава|Файл|Версия файла|Дата|Жанр|Рамка|Статус|Источник):\*\*')
RELATED = re.compile(r'^\*\*Связанн(ые|ые разделы):\*\*\s*(.*)$')


def split_part(text):
    """Вернуть (заголовок части, тело без шапки, строка «Связанные» или None)."""
    lines = text.splitlines()
    title = lines[0].lstrip('# ').strip()

    # тело начинается после первого горизонтального разделителя, следующего за шапкой
    start = 1
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == '---':
            start = i + 1
            break

    body, related = [], None
    in_fence = False
    for line in lines[start:]:
        if line.lstrip().startswith('```'):
            in_fence = not in_fence
        m = RELATED.match(line)
        if m:
            related = m.group(2).strip()
            continue
        if HEADER_FIELD.match(line):
            continue
        # заголовок части становится H2, поэтому внутренние опускаются на уровень
        if not in_fence and re.match(r'^#{1,5} ', line):
            line = '#' + line
        body.append(line)

    # убрать хвостовые пустые строки и одинокий разделитель в конце
    while body and (not body[-1].strip() or body[-1].strip() == '---'):
        body.pop()
    while body and not body[0].strip():
        body.pop(0)
    return title, '\n'.join(body), related


def main():
    chunks, related_all = [], []
    for name in PARTS:
        title, body, related = split_part((INBOX / name).read_text(encoding='utf-8'))
        chunks.append(f'## {title}\n\n{body}')
        if related:
            related_all.append(related)

    out = [
        f'# {H1}',
        '',
        '**Глава:** 10 — Страновые имплементации',
        '**Версия файла:** v1 (слияние 056a + 056b + 056c)',
        '**Дата:** 12 июня — 11 августа 2026',
        '',
        '---',
        '',
        'Раздел собран из трёх последовательных разборов: интерес вершины власти '
        '(слой 1), интерес среднего этажа вертикали (слои 2–3) и социология '
        'лоялистского большинства в гибридных режимах.',
        '',
        '---',
        '',
    ]
    out.append('\n\n---\n\n'.join(chunks))

    # объединить «Связанные» частей: дедуп с сохранением порядка, выкинуть
    # самоссылки на объединённые части и на снятый placeholder
    seen, merged = set(), []
    for item in (i.strip() for line in related_all for i in line.split('·')):
        key = item.lower().split(' (')[0].strip()  # «§42» и «§42 (…)» — одно и то же
        if not item or key in seen:
            continue
        if 'placeholder' in item.lower() or re.match(r'^10_056[abc]', key):
            continue
        seen.add(key)
        merged.append(item)
    out += ['', '---', '', '**Связанные:** ' + ' · '.join(merged)]

    TARGET.write_text('\n'.join(out) + '\n', encoding='utf-8')
    placeholder = TARGET.parent / '056-russia-placeholder.md'
    if placeholder.exists():
        placeholder.unlink()
        print(f'удалён placeholder: {placeholder.name}')
    print(f'создан {TARGET.relative_to(REPO)} — {len(TARGET.read_text(encoding="utf-8")):,} символов')


if __name__ == '__main__':
    main()
