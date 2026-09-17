#!/usr/bin/env python3
"""Разбить экспорт чата (Gemini/ChatGPT) на ходы «Денис → модель» и выдать оглавление.

Экспорт не содержит явных маркеров говорящего, поэтому реплики Дениса распознаются
эвристически по стилю: «абексит» кириллицей и строчными, обращение на «ты», опечатки,
короткий абзац. Модель пишет «AB-EXIT», обращается на «вы/Вы» и отвечает длинно.

Использование:
    python scripts/segment_dialogue.py "gemini 15-09-26.txt"              # оглавление
    python scripts/segment_dialogue.py "gemini 15-09-26.txt" --dump N     # тело хода N
    python scripts/segment_dialogue.py "gemini 15-09-26.txt" --dump 3-7   # ходы 3..7
    python scripts/segment_dialogue.py "gemini 15-09-26.txt" --json out.json
"""

import argparse
import json
import re
import sys
from pathlib import Path

USER_STRONG = re.compile(r'абексит|абэксит', re.IGNORECASE)
USER_TY = re.compile(r'(^|[\s,(])(ты|тебе|тебя|твой|твои|твоя|твоё|твое)([\s,.?!)]|$)', re.IGNORECASE)
MODEL_VY = re.compile(r'(^|[\s,(])(Вы|вы|вас|вам|ваш|ваша|ваши|ваше|вашей|вашего|вашу)([\s,.?!)]|$)')
MODEL_OPENERS = re.compile(
    r'^(Признаю|Вы абсолютно|Вы правы|Сдаюсь|Блестящ|Отличн|Точное попадание|Хах|Ха-ха|'
    r'Спасибо|Это действительно|Да, я снова|Денис, я|Ах, если|Ты бьешь|Ты бросаешь)',
)
STRUCTURAL = re.compile(r'^(\d+\.\s|[A-ZА-Я][^.?!]{0,80}:$|DOCX$|Ещё \d+$|Отредактировано|Редактировать$|Повторить$)')


def is_user_turn(par: str) -> bool:
    text = par.strip()
    if not text or len(text) > 1600:
        return False
    if STRUCTURAL.match(text):
        return False
    if MODEL_OPENERS.match(text):
        return False
    if USER_STRONG.search(text):
        return True
    ty = bool(USER_TY.search(text))
    vy = bool(MODEL_VY.search(text))
    if ty and not vy:
        return True
    # короткий вопрос без «вы» — скорее Денис
    if text.endswith('?') and len(text) < 400 and not vy and 'AB-EXIT' not in text:
        return True
    return False


def split_turns(path: Path):
    lines = path.read_text(encoding='utf-8', errors='replace').splitlines()
    turns, cur = [], None
    for n, line in enumerate(lines, 1):
        if is_user_turn(line):
            if cur:
                turns.append(cur)
            cur = {'idx': len(turns) + 1, 'line': n, 'question': line.strip(), 'answer': []}
        elif cur is not None:
            cur['answer'].append(line)
    if cur:
        turns.append(cur)
    for t in turns:
        body = '\n'.join(t['answer']).strip()
        t['answer'] = body
        t['words'] = len(body.split())
    return turns


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('file')
    ap.add_argument('--dump', help='номер хода или диапазон A-B')
    ap.add_argument('--json')
    ap.add_argument('--min-words', type=int, default=0)
    args = ap.parse_args()

    turns = split_turns(Path(args.file))

    if args.json:
        Path(args.json).write_text(json.dumps(turns, ensure_ascii=False, indent=1), encoding='utf-8')
        print(f'{len(turns)} ходов → {args.json}')
        return

    if args.dump:
        a, _, b = args.dump.partition('-')
        a, b = int(a), int(b or a)
        for t in turns:
            if a <= t['idx'] <= b:
                print(f"\n{'=' * 100}\n#{t['idx']}  (строка {t['line']}, {t['words']} слов в ответе)\n"
                      f"ДЕНИС: {t['question']}\n{'-' * 100}\n{t['answer']}\n")
        return

    total = 0
    for t in turns:
        if t['words'] < args.min_words:
            continue
        total += t['words']
        q = t['question'][:110].replace('\n', ' ')
        print(f"{t['idx']:>3}  L{t['line']:<6} {t['words']:>6}  {q}")
    print(f'\nходов: {len(turns)}, слов в ответах: {total:,}')


if __name__ == '__main__':
    sys.exit(main())
