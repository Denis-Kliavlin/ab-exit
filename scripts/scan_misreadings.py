#!/usr/bin/env python3
"""Scan docs/ for wording that AI readers are known to misread, and label it.

For every chapter file the scan reports which stale or over-strong items occur
and whether the file already carries a dated notice. With --apply, files that
have such items and no notice get one, listing exactly what in that file is an
early-draft layer and pointing to the authoritative pages (1d and 048m).

    python scripts/scan_misreadings.py            # summary
    python scripts/scan_misreadings.py --missing  # files with items and no notice
    python scripts/scan_misreadings.py --apply    # add notices where missing

See 040m (the cold-reader audit), rules 1 and 6.
"""
import io
import re
import sys
from pathlib import Path

DOCS = Path(__file__).parent.parent / "docs"
DATE = "02.10.2026"

# key -> (regex for RU files, regex for EN files)
ITEMS = {
    "sum": (r"\$\s?780|\$\s?676|\$1[ ,]?000\b|£\s?465|£\s?700|1,5[  ]?%[  ]?(от )?медиан|M[  ]?×[  ]?1[.,]5|K[  ]?=[  ]?[0-9]|W2_M",
            r"\$\s?780|\$\s?676|\$1,000\b|£\s?465|£\s?700|1\.5[  ]?% of the median|M[  ]?×[  ]?1\.5|K[  ]?=[  ]?[0-9]|W2_M"),
    "weight": (r"голос\w*[  ][xх×]\s?[2-9]|[xх×]\s?[2-9][  ](голос|вес)|«[xх×][2-9]»|втрое|тройн\w+[  ](вес|сил)|взвешенн\w+[  ]голос|весит[  ](вдвое|в[  ]\w+[  ]раз)|вес\w*[  ]голоса",
               r"\bx[2-9] vote|vote x[2-9]|\"x[2-9]\"|triple|weighs? (double|three times|twice)|weighted vote|weight of (the|a|his|their) vote"),
    "trust": (r"\bтраст\w*|эскроу", r"trust fund|from the trust|\bthe trust\b|escrow"),
    "reversible": (r"(?<!не)обратим\w*[  ](выход|выбор|ценз)|и[  ]обратим|обратимо\b|выбор[  ]обратим", r"(?<!ir)reversib"),
    "bonus": (r"бонус эффективности|BONUS|бонус за экономию", r"efficiency bonus|BONUS"),
    "council": (r"совет\w* (вправе|может) (поднять|менять|изменять)|период охлаждения|cooling|потолок 3[  ]?%",
                r"council may (raise|change)|cooling[- ](off|period)|ceiling of 3[  ]?%"),
    "secret_b": (r"строго конфиденциальн|strictly confidential", r"strictly confidential"),
    "hours72": (r"72 час", r"72[- ]hour"),
    "outcome": (r"неостановим|математически (невозможн|гарантир)|отсутстви\w+ логических дыр|гарантированн\w+ побед|66[  ]?%|99[,.]89|0[,.]11[  ]?%",
                r"unstoppable|mathematically (impossible|guaranteed)|absence of logical holes|guaranteed victory|66[  ]?%|99\.89|0\.11[  ]?%"),
    "blockchain": (r"блокчейн|смарт-контракт", r"blockchain|smart contract"),
}
# an item alone does not call for a notice if it is only a discussion of the technology or the word
WEAK = {"blockchain"}

PARTS = {
    "ru": {
        "sum": "суммы и формулы с коэффициентами — расчётные примеры: размер выплаты задаётся процентом от медианного дохода, который утверждает референдум",
        "weight": "«голос x2», «x3», «вес голоса» — арифметика доли, а не множитель: каждый бюллетень считается за один",
        "trust": "«траст» и «эскроу» — прежняя редакция: платит бюджет по закону",
        "reversible": "«обратимый» выбор значит «на следующих выборах»: в пределах одних выборов выход окончателен",
        "bonus": "бонус эффективности снят",
        "council": "право совета менять коэффициент, период охлаждения и потолок сняты",
        "secret_b": "«строгая конфиденциальность» выбора — прежняя редакция: поимённо он не публикуется, но специально не прячется",
        "hours72": "«72 часа» — гипотеза о первых днях, не правило",
        "outcome": "числа об исходе выборов и слова о неизбежности — оценки и тезисы, а не установленные факты: пилота не было",
        "blockchain": "блокчейн — один из вариантов реализации: устав требует только открытого кода",
    },
    "en": {
        "sum": "sums and formulas with coefficients are worked examples: the size of the payment is set as a percentage of the median income approved by referendum",
        "weight": "\"a x2 vote\", \"x3\", \"the weight of a vote\" are the arithmetic of a share, not a multiplier: every ballot counts as one",
        "trust": "\"trust\" and \"escrow\" are the earlier wording: the budget pays under law",
        "reversible": "a \"reversible\" choice means \"at the next election\": within one election exit is final",
        "bonus": "the efficiency bonus has been removed",
        "council": "the council's right to change the coefficient, the cooling-off period and the ceiling have been removed",
        "secret_b": "the \"strict confidentiality\" of the choice is the earlier wording: it is not published by name but is not specially concealed",
        "hours72": "\"72 hours\" is a hypothesis about the first days, not a rule",
        "outcome": "numbers on election outcomes and words about inevitability are estimates and theses, not established facts: there has been no pilot",
        "blockchain": "a blockchain is one implementation option: the charter requires only open code",
    },
}
HEAD = {"ru": f"*Как читать эту главу (пометка {DATE}). В тексте встречаются формулировки, которые легко прочитать неверно: ",
        "en": f"*How to read this chapter (note of {DATE}). The text contains wording that is easy to misread: "}
TAIL = {"ru": ". Действуют лист точных ответов 1d и устав 048m.*",
        "en": ". The exact-answers sheet 1d and the charter 048m are in force.*"}

NOTICE = re.compile(r"Поправка 0[1-9]\.10\.2026|Слой ранней редакции|Пометка 0[1-9]\.10\.2026|Как читать эту главу"
                    r"|Correction of 0[1-9]\.10\.2026|An early-draft layer|Note of 0[1-9]\.10\.2026|How to read this chapter")
SKIP_NAMES = ("001d-exact-answers", "048m-charter", "048n-underdog-questions", "040m-cold-reader-audit",
              "048k-charter-inventory", "changelog", "index.")


def scan():
    rows = []
    for f in sorted(DOCS.rglob("*.md")):
        rel = f.relative_to(DOCS).as_posix()
        if rel.startswith("assets/") or any(k in f.name for k in SKIP_NAMES):
            continue
        en = f.name.endswith(".en.md")
        text = io.open(f, encoding="utf-8", newline="").read()
        found = {}
        for key, (ru, e) in ITEMS.items():
            n = len(re.findall(e if en else ru, text, flags=re.I))
            if n:
                found[key] = n
        strong = [k for k in found if k not in WEAK]
        rows.append((f, rel, en, found, strong, bool(NOTICE.search(text[:8000]))))
    return rows


def apply(rows):
    done = 0
    for f, rel, en, found, strong, has in rows:
        if has or not strong:
            continue
        lang = "en" if en else "ru"
        notice = HEAD[lang] + "; ".join(PARTS[lang][k] for k in ITEMS if k in found) + TAIL[lang]
        raw = io.open(f, encoding="utf-8", newline="").read()
        nl = "\r\n" if "\r\n" in raw else "\n"
        lines = raw.replace("\r\n", "\n").split("\n")
        idx = next((i for i, l in enumerate(lines[:40]) if l.strip() == "---"), None)
        if idx is None:
            idx = next((i for i, l in enumerate(lines) if l.startswith("# ")), 0)
        lines[idx + 1:idx + 1] = ["", notice]
        io.open(f, "w", encoding="utf-8", newline="").write("\n".join(lines).replace("\n", nl))
        done += 1
    print(f"notices added: {done}")


def main():
    rows = scan()
    missing = [r for r in rows if r[4] and not r[5]]
    if "--apply" in sys.argv:
        apply(rows)
        return 0
    if "--missing" in sys.argv:
        for _, rel, en, found, strong, _ in missing:
            print(rel, " ".join(f"{k}={v}" for k, v in found.items()))
    else:
        with_items = [r for r in rows if r[4]]
        print(f"files scanned: {len(rows)}; with items: {len(with_items)}; with items and no notice: {len(missing)}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
