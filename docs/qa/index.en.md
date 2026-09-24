# Questions and Answers — the AB-EXIT case base

This is the working base of questions put to AB-EXIT and the answers to them. The point is simple:
**a question that has already been answered should not be worked through again.** If someone arrives
with an objection, we look for it here first, and only if it is not found do we open a new entry.

The base is organised **by angle of analysis**, not by chronology. One and the same question
("isn't this vote-buying?") looks different to a lawyer, an economist and a philosopher —
so it may have several entries in different sections, cross-referenced.

---

## Angles of analysis

| Section | What it covers | Who usually asks |
|---|---|---|
| [Law and the constitution](legal.md) | legality, vote-buying, the franchise, precedents | lawyers, journalists, legislators |
| [Economics and funding](economics.md) | where the money comes from, the formula, inflation, cost | economists, investors, finance ministries |
| [Electoral dynamics](electoral.md) | turnout, vote weight, party shift, who leaves | political scientists, campaigns, sociologists |
| [Game theory and mathematics](game-theory.md) | equilibria, manipulation of the formula, stability | academics, modellers |
| [Ethics and philosophy](ethics.md) | dignity, rights, "selling citizenship", morality | philosophers, theologians, the public |
| [Sociology and fairness](society.md) | who will choose B, inequality, the poor, age | sociologists, activists |
| [Implementation and technology](implementation.md) | the register, identification, fraud, administration | engineers, officials |
| [Geopolitics and countries](geopolitics.md) | applicability to specific countries, sovereignty | diplomats, country experts |
| [Meta questions](meta.md) | the AI stress test, the $10k question, the document's status | everyone |

---

## How to read an entry

Every question has one format:

```markdown
### Q-LEG-001 · The question in one line

**Status:** ✅ answered | 🟡 open | 🔁 contested
**Who asks:** lawyer, journalist
**Source in the book:** §29.4
**Related:** Q-ETH-002, Q-SOC-001

**Answer.** Short, direct, without rhetoric.

**Weak point of the answer.** What can still be attacked here. A mandatory field.
```

The field **"Weak point of the answer"** is mandatory and is not filled with the word "none".
If an answer has no weak point, it was not looked for hard enough. The base exists to keep
an honest account of where the protocol is solid and where it still rests on an assumption.

**Statuses:**

- ✅ **answered** — the answer is checked and rests on a section of the book or an external source
- 🟡 **open** — the question is accepted as legitimate; there is no answer yet
- 🔁 **contested** — an answer exists, but it rests on an assumption that can be disputed

---

## How to add a new question

1. Determine the angle → the right file in this folder.
2. Take the next free number in that angle (`Q-ECO-004` and so on). Numbers are not reused.
3. Fill in every field of the template, including "Weak point of the answer".
4. If the question has already been examined in the book — **cite the section**; do not rewrite it in full.
   An entry in the base is a pointer plus a compressed answer, not a duplicate of a chapter.
5. If there is no answer — open the entry with status 🟡. An open question in the base is more useful
   than an absent one.
6. The files in this folder are **not numbered** like the book's sections (`NNN-*.md`) — otherwise
   `scripts/validate_sections.py` will count them as extra sections and fail.

---

## Relation to the book

The Q&A base is **not a substitute** for the analytical document. The book (Parts I–V) is the extended
argument. The base is quick access: "this question has come up, here is the answer, here is where to read in detail".

If the answer to a new question grows beyond a page, that is a sign it should become a section
of the book, with a link left in the base.
