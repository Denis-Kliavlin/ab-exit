#!/usr/bin/env python3
"""Аудит US-специфики в универсальных главах (01-08).

Постановка: CLAUDE_CODE_TASK_v5_universalize_repo_v6.58.0 — документ должен читаться
как универсальный протокол, вся имплементационная специфика США живёт в страновом
кейсе США. Скрипт только находит и классифицирует; правки — отдельно.

Использование:
    python scripts/audit_us_specifics.py             # сводка по файлам
    python scripts/audit_us_specifics.py --detail    # каждое вхождение со строкой
    python scripts/audit_us_specifics.py --csv out.csv
"""

import argparse
import csv
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

DOCS = Path(__file__).parent.parent / 'docs'

# Универсальные главы — в них US-специфики быть не должно.
UNIVERSAL = [f'0{n}-' for n in range(1, 9)]

# Глава 05 — кейсы разных стран по определению, там эмпирика легитимна.
EMPIRICAL_CHAPTER = '05-empirical-base'

MARKERS = {
    'штаты/города США': r'Орегон|Oregon|Калифорни|California|Колорадо|Colorado|'
                        r'Массачусетс|Massachusetts|Лос-Анджелес|Los Angeles|'
                        r'Дэнвил|Danville|Church Street|Сиэтл|Seattle|Детройт|Detroit|'
                        r'Сан-Хосе|San Jose|Бруклин|Brooklyn|Кливленд|Cleveland',
    'источник данных США': r'W-2|W2_M|SSA|IRS|Census Bureau|1099|401\(k\)|NTEU',
    'правовой маршрут США': r'ballot initiative|Form A|117,?173|26 USC|52 U\.?S\.?C|'
                            r'§\s?10307|§\s?597|SCOTUS|14th Amendment|'
                            r'citizen-initiated statute',
    'US-суммы как дефолт': r'\$676|\$630|\$570|\$780|\$1,275|\$1,092|\$905',
    'календарь США': r'ноябр[ья] 2028|November 2028|президентск\w+ выбор\w+ США|'
                     r'15 апреля|промежуточн\w+ выбор',
}

# Что считается легитимным мультистрановым рядом: США упомянуты рядом с другими странами
MULTICOUNTRY_HINT = re.compile(
    r'Германи|Франци|Норвеги|Швейцари|Эстони|Австри|Австрали|Ирланди|'
    r'Молдов|Груз|Коре|Великобритан|Канад|Япони|Швеци|Дани|Финлянди',
    re.IGNORECASE,
)


def chapter_of(path):
    return path.relative_to(DOCS).parts[0]


def classify(chapter, line):
    """Грубая первичная классификация — решение всё равно принимает человек."""
    if chapter == EMPIRICAL_CHAPTER:
        return 'оставить (кейсы стран)'
    if MULTICOUNTRY_HINT.search(line):
        return 'оставить (ряд ≥2 стран)'
    return 'проверить'


def collect():
    hits = []
    for path in sorted(DOCS.rglob('*.md')):
        if path.name.endswith('.en.md'):
            continue
        chapter = chapter_of(path)
        if not any(chapter.startswith(p) for p in UNIVERSAL):
            continue
        for n, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
            for label, pattern in MARKERS.items():
                m = re.search(pattern, line)
                if m:
                    hits.append({
                        'file': str(path.relative_to(DOCS)),
                        'line': n,
                        'marker': label,
                        'match': m.group(0),
                        'verdict': classify(chapter, line),
                        'text': line.strip()[:160],
                    })
    return hits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--detail', action='store_true')
    ap.add_argument('--csv')
    args = ap.parse_args()

    hits = collect()

    if args.csv:
        with open(args.csv, 'w', newline='', encoding='utf-8-sig') as f:
            w = csv.DictWriter(f, fieldnames=list(hits[0]))
            w.writeheader()
            w.writerows(hits)
        print(f'{len(hits)} вхождений → {args.csv}')
        return

    if args.detail:
        for h in hits:
            print(f"{h['file']}:{h['line']}  [{h['marker']}] «{h['match']}» "
                  f"→ {h['verdict']}\n    {h['text']}")
        print()

    per_file = defaultdict(Counter)
    for h in hits:
        per_file[h['file']][h['verdict']] += 1

    print(f'{"файл":<52} {"проверить":>10} {"оставить":>9}')
    print('-' * 74)
    for file in sorted(per_file):
        c = per_file[file]
        check = c['проверить']
        keep = sum(v for k, v in c.items() if k != 'проверить')
        flag = '!' if check else ' '
        print(f'{flag} {file:<50} {check:>10} {keep:>9}')
    print('-' * 74)
    total_check = sum(c['проверить'] for c in per_file.values())
    print(f'  ИТОГО: {len(hits)} вхождений, из них к разбору — {total_check}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
