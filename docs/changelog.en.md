# CHANGELOG — AB-EXIT Repository v6.56

All significant changes to this repository are documented here.

Format: based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [September–October 2026] — work in Claude Code, commits 21.09–01.10.2026

The log was not kept since June; below is a summary from the commit history. Every section exists in Russian and English.

### Added

- **01 Introduction:** 001c "A Board Without Good Moves" — the catalogue of forks; the main fork "free abstention stops being a choice".
- **02 History:** 006b "Predecessors in the Genre and What Remains" — five designs of a whole state before 1926, ten works of the last hundred years, ten closest by content, the roadmap of gaps.
- **03 Theory:** 013f "A Formal Statement" — five theorems, two assumptions, the predecessor Feddersen–Pesendorfer, the Kydland–Prescott map; 015b, 015c — states not types, the sign of the thermostat.
- **04 Electoral Dynamics:** 019e "The Marriage Penalty", 019f "The Vector: Wearing Down Men", 019g "The Second Wave of Exit".
- **05 Empirical Base:** 023b "Rules for Handling Evidence", 023c "Compulsory Voting", 023d "Democracy Vouchers", 023e "Deliberation and Assemblies", 023f "Money at Elections".
- **06 Critique Arsenal:** 029.4b "The Autocrat Already Pays", 029.10 "The Mirror of Trust", 039 "Orbán as a Control Case", 040i "Linz and Shulman", 040j "Kant", 040k "Strauss and Howe", 040l "Fukuyama".
- **08 Implementation:** 048f "Double-Entry Elections", 048g "Rollback", 048h "Secrecy, Verifiability, Coercion", 048i "Three Channels and Parallel Counting", 048j "Courts and Local Tuning", 048k "Inventory of Norms and Eleven Discrepancies: the architect's decisions, the sanctions ladder", 048l "The Courtyard Pilot".
- **09 Other Countries:** 055c "Germany" (§6 — the September 2026 state elections), 056d–056f "Russia", 057b "Belarus", 057c "Iran", 057d "Venezuela", 057e "Spain in the 1960s".
- **10 USA:** 059–059f — presidents, Musk and Milei, the "Trump dividend", candidates, the underdog campaign.
- **Q&A:** a full English mirror; entries Q-ETH-005, Q-SOC-006–008, Q-ELE-005–006, Q-GAM-005–006, Q-LEG-006, Q-IMP-005.
- **Additions of 01.10.2026:** 048m "The AB-EXIT Charter" v0.5 — terms, preamble, 16 articles, annex; Article 1 on the border between core and parameters. 011b §11b.2b — a third state, the meek (*tikhonya*). 048f §4d–4e — double entry in nature and why votes have been counted by a simple tally for five hundred years. 056f §13c–13l — Shulman and remote e-voting, the question outside the count, the Bonya case, the split of the pro-regime camp, the arsenal of comparisons, the question against smart voting and the sign on the ballot, the contract between people and power, an idea with no expiry date, Peaceful Russia.
- **Additions of 02.10.2026:** 001d "Exact Answers" — twenty statements, the game-theory reading, frequent misreadings. 048n "If You Are an Underdog" — a candidate's ten questions, ten steps, objections from other AIs and the answers. 040m "The Cold-Reader Audit" — thirty-seven findings, tests on a simple model, a clean Grok, seven rules and a register of objections. Charter 048m v0.5 — Article 8, paragraph 5: the payment as an unconditional obligation. 013f §3b — correction of the unit of the stake. 011b — the meek and the compressed spring. 029.10 — how scholars explain the fall in trust. 039 — how the Orbán case ended. The package for AI readers: llms.txt, llms-full.txt, llms-full-ru.txt, protocol-facts.json.
- **A second pass for the AI reader, 02.10.2026:** "how to read this chapter" notices in 141 chapters (`scripts/scan_misreadings.py`); a section "If you answer from this page alone" on the home page; the shared notice of thirty chapters rewritten; point notes in twelve early chapters; six new rows in the misreadings table of 1d and in the `llms` files; the results of three independent checks are in 040m §5f; at the top of every page of the site there is the rule in two paragraphs (the template `overrides/main.html`).
- **Eight roles, 02.10.2026:** a new chapter 1e "What Question Did You Come With: Short Answers by Role" — for a citizen, a mayor, a finance officer, a donor, a journalist, on Russia, a scholar, a lawyer; the charter 0.6 (Article 1, part 4, and the remarks of a legal reading); 13f §5b; corrections in chapters 1, 13, 048k, 048l, 056, 056d and in the Q&A base; the results are in 040m §5g.
- **The period of the median, 02.10.2026:** the fourteenth decision — the median over the last twelve months; the charter 0.7, Article 2; a calculation for a US city of a million residents and for a small town is in 1e.
### Changed

- **The architect's twelve charter decisions** (048k §3, 30.09.2026): a percentage, not a sum; debate → referendum; no more than once per cycle; payment at once; no way back; late discount 20–30 %; the right for everyone with a vote; each level pays at its own elections; the savings bonus removed; whoever chose nothing is the controller. Dated amendments in 002, 004, 018, 033b, 042, 048h, 048i, 049, Q-IMP-002.
- **Vocabulary:** a populist is a position relative to the voter, not a label; the top means the creators; the filter is by length of horizon; "dividend" is a word everyone likes (033c §9d).
- **036 §85.8:** the June self-rating re-read — what holds and what does not; irreversibility restated: no precedent of a referendum-locked payment repealed by referendum.
- **023 §23.2:** the sentence "populists regularly win in Australia" withdrawn.
- **Translations:** every chapter received an English mirror (143 files by 24.09.2026).

### Fixed

- A false citation in 014 removed; line-number references replaced by section numbers; indexes synchronised (38b, 40b–40l, 19e–19g, 23c–23f).

---

## [v6.56_clean] — 2026-06-10

### Fundamental architecture changes

- **New repo structure.** One big monolith → 57 separate files. Each section = its own `.md` file of 5–15 KB.
- **Versioning through file names.** Not editing but creating new versions. `section_005_v1.md` → `section_005_v2.md` on update.
- **`.md` format without conversion to Google Doc.** Solves the critical bug of broken markdown (`\#` instead of `#`).
- **Workflow split between Claude in chat and Claude Code.** Claude writes the section texts; Claude Code pushes to GitHub and does bulk operations.

### Added

- `README.md` — a description of the architecture and principles
- `INDEX.md` — a map of the 57 sections with their status and file names
- `CHANGELOG.md` — this file

### Status of section files

Of 57 sections:
- **12 sections 📝 Restored** — full texts in Claude's chat memory (5, 11, 13, 14, 17, 23, 24, 29–32, 47)
- **41 sections ⏳ From v6.53** — require transfer by Claude Code from the v6.53 PDF (most of 1–94)
- **5 sections 🆕 Todo** — new, require writing (53–57, country sections)

---

## [v6.56] — 2026-06-10 (previous attempt, deprecated)

### Done

- Applied the reorganisation mapping from the Master Plan
- 94 sections of v6.53 parsed and reorganised by topic
- Sections 96, 97, 98 integrated
- Created the monolith `AB-EXIT_v6.56_FINAL_COMPLETE` (1.2 MB) and 10 split files

### Known problems (deprecated in this branch)

- ❌ **Markdown broken in all 10 split files** — `\#` instead of `#`, `\*\*` instead of `**` everywhere. Headings do not render.
- ❌ **Numbering chaotic** — in file 03 the sequence runs `91 → 13 → 14 → 93`. Old sections from v6.53 kept their numbers; new ones got new numbering.
- ❌ **6 placeholders missing** — sections 5, 13, 14, 17, 24, 47 have no content.
- ❌ **Files too large to read through the chat API** — 02 (193K), 04 (229K), 05 (160K), 07 (252K), 09 (150K) do not fit in the claude.ai context window.

### Resolution — the move to v6.56_clean

All these problems are solved architecturally in v6.56_clean (this repo):
- Small files → the context-window problem solved
- `disableConversionToGoogleType: true` → markdown does not break
- Through-numbering in file names → numbering is transparent
- The texts of the 6 placeholders restored from Claude's chat memory

---

## [v6.55] — 2026-06-08

### Added

- Section 96 (The structural hypocrisy of academic criticism)
- Section 97 (The arsenal of the reasonable elites, including 97.5 quantitative comparison, 97.10 the split of the elites)
- Section 98 (The paradigm from duty to choice)

### Changed

- Split into 9 files in the subfolder `docs/AB-EXIT_Analysis/` on GitHub
- The old monolith removed from the repository; the split is the single source of truth

---

## [v6.53] — 2026-06-03

### Added

- Section 94 — AB-EXIT as a structural defence against methods of election interference (11 subsections)

### Final state

- 94 sections, ~10,500 lines, 384 KB of markdown
- The monolith in Google Docs (id `1KBFOE4cuNum06dT3AxopFYerhxXXM3FF5OoOYaoz9L4`)

---

## Earlier versions (5.0 — 6.52)

See the version history in v6.53 itself — it has the full list of changes from 26.04.2026 (v5.0 FINAL) to 03.06.2026 (v6.53).

Key milestones:
- **v5.0 FINAL** (26.04.2026) — the base document, ~30 sections
- **v6.0** (06.05.2026) — expansion to 47 sections
- **v6.30** (29.05.2026) — the philosophical manifesto added
- **v6.42** (02.06.2026) — Route B added
- **v6.52** (03.06.2026) — section 93 (Honest politicians, PNAS 2020) with an empirical base

---

*This CHANGELOG will be updated on every significant change to the repository.*
