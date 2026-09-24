# CHANGELOG — AB-EXIT Repository v6.56

All significant changes to this repository are documented here.

Format: based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
