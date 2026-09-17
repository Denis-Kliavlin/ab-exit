#!/usr/bin/env python3
"""Показать, какие разделы docs/ уже имеют английскую версию (.en.md), а какие нет.

Использование:
    python scripts/translation_status.py            # сводка по главам
    python scripts/translation_status.py --todo     # только непереведённые, по возрастанию объёма
"""

import argparse
from pathlib import Path

DOCS = Path(__file__).parent.parent / 'docs'
SKIP_DIRS = {'assets', 'simulation'}


def collect():
    rows = []
    for path in sorted(DOCS.rglob('*.md')):
        if path.name.endswith('.en.md'):
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(DOCS).parts):
            continue
        en = path.with_suffix('').with_suffix('') if False else path.parent / (path.stem + '.en.md')
        words = len(path.read_text(encoding='utf-8').split())
        rows.append((path.relative_to(DOCS), en.exists(), words))
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--todo', action='store_true', help='только непереведённые, по объёму')
    args = ap.parse_args()

    rows = collect()
    done = [r for r in rows if r[1]]
    todo = [r for r in rows if not r[1]]

    if args.todo:
        for rel, _, words in sorted(todo, key=lambda r: r[2]):
            print(f'{words:>7,}  {rel}')
        print(f'\nОсталось: {len(todo)} файлов, {sum(r[2] for r in todo):,} слов')
        return

    chapters = {}
    for rel, has_en, words in rows:
        chapter = rel.parts[0] if len(rel.parts) > 1 else '(корень)'
        d, t, w = chapters.get(chapter, (0, 0, 0))
        chapters[chapter] = (d + int(has_en), t + 1, w + (0 if has_en else words))

    print(f'{"глава":<24} {"EN/всего":>10}  {"слов к переводу":>16}')
    print('-' * 54)
    for chapter, (d, t, w) in sorted(chapters.items()):
        mark = '✓' if d == t else ' '
        print(f'{mark} {chapter:<22} {d:>4}/{t:<5}  {w:>16,}')
    print('-' * 54)
    print(f'  {"ИТОГО":<22} {len(done):>4}/{len(rows):<5}  '
          f'{sum(r[2] for r in todo):>16,}')


if __name__ == '__main__':
    main()
