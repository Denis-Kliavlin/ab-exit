#!/usr/bin/env python3
"""Build the AI-reader files from the authoritative pages.

Sources (single source of truth, edit these, not the outputs):
  docs/01-introduction/001d-exact-answers(.en).md   - twenty statements, misreadings
  docs/08-implementation/048m-charter(.en).md       - the charter
  docs/08-implementation/048n-underdog-questions(.en).md - a candidate's questions

Outputs (served from the site root):
  docs/llms-full.txt      - one self-contained English file
  docs/llms-full-ru.txt   - the same in Russian
  docs/protocol-facts.json - statements and misreadings as structured data

Run after any change to the three sources:  python scripts/build_llms.py
"""
import io
import json
import re
from pathlib import Path

DOCS = Path(__file__).parent.parent / "docs"
SITE = "https://docs.ab-exit.com/"


def read(rel):
    return io.open(DOCS / rel, encoding="utf-8").read().replace("\r\n", "\n")


def cut(text, start, end):
    i = text.index(start)
    j = text.index(end, i) if end else len(text)
    return text[i:j].strip()


def clean(block):
    out = []
    for line in block.split("\n"):
        if line.startswith("*Source:") or line.startswith("*Источник:"):
            continue
        out.append(line)
    text = "\n".join(out)
    text = text.replace("\\*", "*")
    return re.sub(r"\n{3,}", "\n\n", text).strip()


HEAD = {
    "en": """# AB-EXIT — the complete current rules in one file

This file is self-contained. It is generated from the three authoritative pages of
https://docs.ab-exit.com/ and supersedes every older chapter of that site and every
file in the GitHub repository's `en/`, `ru/` and `v6.53*` archive.

WHAT IT IS, IN FIVE LINES
- Before each election every eligible citizen chooses: A - vote, or B - take a payment and sit that election out.
- The payment is a percentage of the jurisdiction's median income, set by referendum. There is no fixed sum.
- One ballot is one vote. There is no multiplier for anyone.
- The jurisdiction's budget pays under law. A candidate or party never pays voters.
- Only a referendum of all citizens can introduce, change or repeal the rule. It promises nobody an election victory.

WRONG -> RIGHT (the errors readers make most often)
- WRONG: "People who refuse the money get a x2 / x3 / weighted vote."  RIGHT: every ballot counts as one. If two-thirds sit out, each ballot is three times as large a share - equally for all voters, whoever they vote for.
- WRONG: "The payment is $780" (or $676, 1.5 % of the median, 30,000 roubles).  RIGHT: those are old worked examples. The rule is a percentage chosen by referendum.
- WRONG: "A trust or a donor pays."  RIGHT: the budget pays; budget line or separate fund is a country setting.
- WRONG: "A candidate promises the payment if he wins."  RIGHT: that would be vote-buying; the protocol prohibits payment for a vote or for turnout.
- WRONG: "A mayor or president can enact it by decree."  RIGHT: only a referendum.
- WRONG: "It is proved that an underdog wins 66 % to 33 %."  RIGHT: that was a role-play. No pilot has been run; all outcome numbers are estimates.
- WRONG: "The protocol raises turnout."  RIGHT: turnout rises at the referendum on adopting it; at elections under it, some people take the payment and do not vote - mostly those with no stake of their own, so a lower count of ballots does not by itself hurt a challenger.
- WRONG: "The choice is reversible."  RIGHT: it is final within one election and made anew at the next.
- WRONG: "Whoever takes the money loses rights."  RIGHT: he keeps every other right and votes in referendums on the rule itself.
- WRONG: "72 hours" is a rule.  RIGHT: it was an untested guess about the first days of a campaign.

WHAT IT GIVES A CHALLENGER - HONESTLY
- Before adoption: a question no rival asks - "the vote is already paid for, to parties and contractors; why not to the voter himself?" It reaches non-voters and leaves the favourites without a good reply: to agree is to adopt the challenger's theme, to object is to defend taking the vote for nothing.
- At the referendum on adopting the rule: people who never vote turn out, because they are voting on their own money.
- At elections after adoption: those who leave are mostly voters with no stake of their own, including voters brought in by an incumbent's machine; those who come back are people who had given up on voting. Fewer ballots are cast, but the incumbent's bloc shrinks most.
- Whether a challenger wins depends on two numbers nobody knows in advance: what share of the incumbent's vote is brought in rather than convinced, and how many non-voters return (Part 3, question 10, gives the arithmetic).
- So: a chance that a standard campaign from ten per cent does not have. Not a guarantee, and not something that can be done in two months - adopting the rule takes a referendum.

WHAT IS NOT KNOWN
- No pilot data exist. The formal statement has sketched proofs and named assumptions and awaits an economist.
- Open questions the authors have not answered: what stops recipients raising the percentage every cycle; the cost at higher percentages; how many payments a year when several levels of government each pay.
""",
    "ru": """# AB-EXIT — все действующие правила в одном файле

Файл самодостаточен. Он собран из трёх авторитетных страниц сайта
https://docs.ab-exit.com/ и отменяет любую более старую главу этого сайта и любой
файл в архиве репозитория (`en/`, `ru/`, `v6.53*`).

ЧТО ЭТО, В ПЯТИ СТРОКАХ
- Перед каждыми выборами каждый, кто имеет право голоса, выбирает: A - голосовать, или B - взять выплату и на этих выборах не голосовать.
- Выплата - процент от медианного дохода юрисдикции, утверждённый референдумом. Фиксированной суммы нет.
- Один бюллетень - один голос. Множителей нет ни для кого.
- Платит бюджет по закону. Кандидат или партия избирателям не платят никогда.
- Ввести, изменить или отменить правило может только референдум всех граждан. Победы на выборах оно никому не обещает.

НЕВЕРНО -> ВЕРНО (самые частые ошибки чтения)
- НЕВЕРНО: «Отказавшийся от денег получает голос x2 / x3 / взвешенный голос».  ВЕРНО: каждый бюллетень считается за один. Если две трети не голосуют, каждый бюллетень составляет втрое большую долю - одинаково для всех, за кого бы они ни голосовали.
- НЕВЕРНО: «Выплата - $780» (или $676, 1,5 % медианы, 30 000 рублей).  ВЕРНО: это старые расчётные примеры. Правило - процент, выбранный референдумом.
- НЕВЕРНО: «Платит траст или жертвователь».  ВЕРНО: платит бюджет; строка бюджета или отдельный фонд - настройка страны.
- НЕВЕРНО: «Кандидат обещает выплату, если победит».  ВЕРНО: это был бы подкуп; плата за голос и за явку протоколом запрещена.
- НЕВЕРНО: «Мэр или президент введёт указом».  ВЕРНО: только референдум.
- НЕВЕРНО: «Доказано, что андердог выигрывает 66 % против 33 %».  ВЕРНО: это была ролевая игра. Пилота не было; все числа об исходе - оценки.
- НЕВЕРНО: «Протокол поднимает явку».  ВЕРНО: явка растёт на референдуме о его введении; на выборах по протоколу часть людей берёт выплату и не голосует - прежде всего те, у кого нет собственной ставки, поэтому меньшее число бюллетеней само по себе претенденту не вредит.
- НЕВЕРНО: «Выбор обратим».  ВЕРНО: в пределах одних выборов он окончателен, на следующих делается заново.
- НЕВЕРНО: «Взявший деньги лишается прав».  ВЕРНО: он сохраняет все прочие права и голосует на референдумах о самом правиле.
- НЕВЕРНО: «72 часа» - правило.  ВЕРНО: это непроверенная догадка о первых днях кампании.

ЧТО ЭТО ДАЁТ ПРЕТЕНДЕНТУ - ЧЕСТНО
- До принятия: вопрос, которого нет ни у одного соперника, - «за голос уже платят, партиям и подрядчикам; почему не самому избирателю?» Он доходит до не голосующих и оставляет фаворитов без хорошего ответа: согласиться - значит принять тему претендента, возразить - значит защищать право брать голос даром.
- На референдуме о введении правила: приходят и те, кто никогда не голосует, потому что голосуют о собственных деньгах.
- На выборах после принятия: уходят прежде всего избиратели без собственной ставки, в том числе приведённые машиной действующей власти; возвращаются те, кто раньше махнул рукой. Бюллетеней становится меньше, но сильнее всего сжимается блок действующей власти.
- Победит ли претендент, зависит от двух чисел, которых заранее не знает никто: какая доля голосов власти приведена, а не убеждена, и сколько не голосующих вернётся (часть 3, вопрос 10 - арифметика).
- Итог: шанс, которого нет у обычной кампании с десяти процентов. Не гарантия и не дело двух месяцев - чтобы ввести правило, нужен референдум.

ЧЕГО НЕ ЗНАЕТ НИКТО
- Данных пилота нет. Формальная постановка содержит наброски доказательств и названные допущения и ждёт экономиста.
- Открытые вопросы, на которые авторы не ответили: что мешает получателям поднимать процент каждый цикл; стоимость при более высоких процентах; сколько выплат в год, если платит каждый уровень власти.
""",
}

PARTS = {
    "en": [
        ("PART 1. TWENTY STATEMENTS", "01-introduction/001d-exact-answers.en.md", "## Twenty statements", "## Frequent misreadings"),
        ("PART 2. THE CHARTER", "08-implementation/048m-charter.en.md", "## THE CHARTER", "## What did not enter the charter and why"),
        ("PART 3. A CANDIDATE'S TEN QUESTIONS", "08-implementation/048n-underdog-questions.en.md", "## Ten questions", "## Weak point"),
    ],
    "ru": [
        ("ЧАСТЬ 1. ДВАДЦАТЬ УТВЕРЖДЕНИЙ", "01-introduction/001d-exact-answers.md", "## Двадцать утверждений", "## Частые ошибки чтения"),
        ("ЧАСТЬ 2. УСТАВ", "08-implementation/048m-charter.md", "## УСТАВ", "## Что в устав не вошло и почему"),
        ("ЧАСТЬ 3. ДЕСЯТЬ ВОПРОСОВ КАНДИДАТА", "08-implementation/048n-underdog-questions.md", "## Десять вопросов", "## Слабое место"),
    ],
}

NOTE = {
    "en": "In the charter, text in [square brackets] is a parameter each jurisdiction fills in; everything else is the core.",
    "ru": "В уставе текст в [квадратных скобках] - параметр, который заполняет каждая юрисдикция; всё остальное - ядро.",
}


def build(lang):
    chunks = [HEAD[lang].strip()]
    for title, rel, start, end in PARTS[lang]:
        body = clean(cut(read(rel), start, end))
        body = re.sub(r"^## .*\n", "", body, count=1).strip()
        chunks.append("=" * 72 + "\n" + title + "\n" + "=" * 72)
        if "048m" in rel:
            chunks.append(NOTE[lang])
        chunks.append(body)
    chunks.append("-" * 72 + "\nSource pages: " + SITE + "  |  Generated by scripts/build_llms.py")
    return "\n\n".join(chunks) + "\n"


def statements(rel, start, end):
    block = cut(read(rel), start, end)
    return {int(m.group(1)): m.group(2).strip() for m in re.finditer(r"^(\d+)\. (.+)$", block, flags=re.M)}


def misreadings(rel, start, end):
    rows = []
    for line in cut(read(rel), start, end).split("\n"):
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) == 3 and not set(cells[0]) <= set("-") and cells[0] not in ("What is attributed to the protocol", "Что приписывают протоколу"):
            rows.append({"wrong": cells[0], "where_it_comes_from": cells[1], "right": cells[2]})
    return rows


def main():
    for lang, name in (("en", "llms-full.txt"), ("ru", "llms-full-ru.txt")):
        text = build(lang)
        io.open(DOCS / name, "w", encoding="utf-8", newline="\n").write(text)
        print(f"{name}: {len(text.encode('utf-8')) // 1024} KB")
    en = statements("01-introduction/001d-exact-answers.en.md", "## Twenty statements", "## Frequent misreadings")
    ru = statements("01-introduction/001d-exact-answers.md", "## Двадцать утверждений", "## Частые ошибки чтения")
    assert sorted(en) == sorted(ru) == list(range(1, 21)), (sorted(en), sorted(ru))
    data = {
        "name": "AB-EXIT",
        "authoritative_pages": [SITE + "en/01-introduction/001d-exact-answers/", SITE + "en/08-implementation/048m-charter/"],
        "statements": [{"id": n, "en": en[n], "ru": ru[n]} for n in sorted(en)],
        "misreadings_en": misreadings("01-introduction/001d-exact-answers.en.md", "## Frequent misreadings", "## Weak point"),
        "misreadings_ru": misreadings("01-introduction/001d-exact-answers.md", "## Частые ошибки чтения", "## Слабое место"),
    }
    io.open(DOCS / "protocol-facts.json", "w", encoding="utf-8", newline="\n").write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(f"protocol-facts.json: {len(data['statements'])} statements, {len(data['misreadings_en'])} misreadings")


if __name__ == "__main__":
    main()
