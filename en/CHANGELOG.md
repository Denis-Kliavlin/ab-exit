# AB-EXIT Changelog

All notable changes to this project will be documented in this file.
Format: [Semantic Versioning](https://semver.org/)

---

## [v3.2.0] — 2026-06-08

### Added
- **Three new analytical sections (96, 97, 98) — fundamental redefinition of the project**

  Section 96 — **Structural hypocrisy of academic critique: double standard toward 48% non-voting norm vs AB-EXIT** (9 subsections). First level of hypocrisy: 48% non-participation is accepted as a "sociological phenomenon," but the same non-participation with state compensation is labeled "exclusion from democracy." What changes is only transparency and compensation — not citizen behavior. Where critics are correct (this is government policy); where they are wrong (this is not vote-buying, but recognition of choice). Structural novelty — a fifth class of institutional relationship that did not exist previously. Where the money goes now (Germany pays parties €1/vote, France €1.4/vote, the US political consulting industry $26B+ per cycle). Second level of hypocrisy (96.9): declaration A (publicly: "we need more participation") vs declaration B (privately: "citizens are too demanding, keep them managed"). AB-EXIT forces a choice between these two declarations.

  Section 97 — **The arsenal of reasonable elites against populism and AB-EXIT's place in this landscape** (10 subsections). Five systemic interests of reasonable elites. Six mechanisms they currently apply (institutional brakes, technocratic delegation, education and quality press, tactical electoral reforms, lobbying and media machines, hidden methods like voter ID and gerrymandering) — each with structural weaknesses illustrated by concrete cases (Orban, Hillary Clinton 2016, Alaska RCV 2022). **Comparative effectiveness — units of percent vs tens of percent** (97.5): empirical data on 11 existing mechanisms (Solvak & Vassil on e-voting, Berinsky on mail-in, Brookings on AVR, Brennan on compulsory voting, etc.) with a summary table showing a maximum 5-8% structural effect (open primaries). AB-EXIT model estimates: 15-25% electorate composition change, +33% vote weight, -30-40% populist mobilization base, 50-80% planning horizon expansion, +15-25% competitive advantage for honest politicians. An order of magnitude difference. Segmentation of elites into Class A (old institutional, slow conversion) and Class B (tech-magnates), with Class B subdivided into B1 (constructive innovators — Andreessen, Khosla, Hoffman, Collison, Armstrong, Altman, Cuban) and B2 (Dark Tech — Thiel late, Yarvin, Srinivasan). **B2 reclassified as pragmatists, not ideological opponents** — they chose technofascism because they perceived no working alternatives; AB-EXIT can convert them. Triple outreach strategy (A, B1, B2). Political fragmentation of tech-magnates as mobilization potential — AB-EXIT can be the unifying project they lack.

  Section 98 — **AB-EXIT as a mechanism for releasing accumulated pressure — paradigm shift from obligation to choice** (10 subsections plus final thesis). Current politics as a machine producing legitimate grievance without a legitimate channel for release. Three citizen variants (continue voting / silent non-voting / voting for a populist) — all three leave pressure inside the system, accumulating across cycles. The geological pressure of accumulated grievances explains the rise of populism in the Western world 2010-2025 (Brexit, Trump, Orbán, Le Pen, AfD, Brothers of Italy, Milei, Reform UK). AB-EXIT as the first legitimate channel of state recognition — money as a form of recognition, not as bribery. Psychological release through a symbolic act (analogous to therapeutic acknowledgment). Paradoxical effect: those who accepted compensation may return to voting from a new position of dignity, not duty. Virality through direct personal experience of "I was treated fairly." What this provides to the centrist — the first emotional speech in 20 years capable of competing with populist rhetoric ("I will free you from the obligation to participate in a play you didn't choose"). Three reasons why centrist speech with AB-EXIT is stronger than populist rhetoric (executable, positive, dignity-respecting). Project redefinition — AB-EXIT is **not an electoral reform** but **the first institutional gesture of state respect toward the citizen without conditions of ideological loyalty**. Implications for communications, title slogan ("AB-EXIT. Politics that respects you"), target audiences (parallel campaigns for reasonable elites and mass audience).

- **New 9th file in split structure** — `docs/AB-EXIT_Analysis/09-meta-critique-and-strategic-positioning.md` containing all three new sections (96, 97, 98) — 759 lines total. With this addition, the split version now contains 98 sections in 9 thematic files.

### Removed
- **`docs/AB-EXIT_Analysis_v6.54.md` monolith.** The monolith version of the analytical document has been **removed** in favor of using the split structure (`docs/AB-EXIT_Analysis/`) as the **single source of truth**. Reasoning: maintaining a monolith in parallel to the split structure created duplication — every edit to a section required updating two locations, every translation of a section required translating two files, and readers were confused about which version to consult. The split structure achieves all original goals (easy navigation, citation by section, parallel translation work, simple addition of new sections) without these costs. Users desiring the entire document in a single downloadable file can use GitHub's "Download ZIP" feature on the `AB-EXIT_Analysis/` folder, or concatenate the 9 files locally with `cat docs/AB-EXIT_Analysis/0*.md > full.md`. The split structure is now the **canonical form** of the analytical document.

### Changed
- `docs/AB-EXIT_Analysis/README.md` — Updated to reflect 9 files instead of 8, version 6.55. Removed references to the monolith (which no longer exists). Added a new reading path for "academic critics preparing objections" — directing them to section 9 first to save them time on formulating arguments already addressed.
- `README.md` (root) — Removed link to the monolith. Updated reference to "AB-EXIT Analysis v6.55" pointing exclusively to the split folder README. Updated description from "Same content as monolith" to "Full analytical document, organized into 9 thematic files for reading, citation, and independent translation".

### Methodological Note
Sections 96-98 emerged from an intensive adversarial dialogue session between the author and Claude Opus 4.6 on June 6-8, 2026. Each major insight (academic double standard, quantitative comparison units vs tens of percent, Dark Tech as pragmatists rather than ideologues, tech-elite fragmentation, paradigm shift from obligation to choice, pressure release as a central mechanism) was identified by the author as a structural gap in Claude's previous formulations. Claude then expanded these insights into full sections with examples, analogies, and ready-made formulations. This methodology — the author as system architect identifying gaps, Claude as text developer expanding them into structured content — has produced the deepest layer of conceptual work in the entire AB-EXIT documentation.

The decision to remove the monolith and adopt the split structure as canonical was also finalized in this session — the author correctly identified that maintaining both versions contradicted the original goal of the split (simplification of reading, citation, addition, and translation).

---

## [v3.1.0] — 2026-06-03

### Added
- `docs/AB-EXIT_Analysis/` — Structured split of the v6.54 analytical document into 8 thematic files for easier reading, citing, and parallel work:
  - `README.md` — Navigation document with version history, reading paths for different audiences (academics, politicians, donors, journalists, citizens, lawyers), and structural overview.
  - `01-formula-and-technical.md` — Sections 1-14 (formula, W-2 data source, manipulation defenses, rejected alternatives, statute text). 702 lines.
  - `02-historical-and-philosophical.md` — Sections 15-22 (2500-year history, religious compatibility, Say-Do Gap, vaccine against tyranny). 870 lines.
  - `03-electoral-dynamics.md` — Sections 23-44 (age economics, political triangle, Church Street, pizzeria metaphor, three democracy eras). 1024 lines.
  - `04-case-studies.md` — Sections 45-58 (Georgia/Saakashvili, Danville, Huntington, Toffler, disappearing class of working men, Korean miracle without Park Chung Hee). 990 lines.
  - `05-strategic-positioning.md` — Sections 59-67 (Chichvarkin, AB-EXIT vs UBI, Thatcher before the wall, centrist void). 507 lines.
  - `06-legal-and-launch.md` — Sections 68-83 (US legal foundations, carrier portrait, poison pill defense, Gemini Pro double capitulation, philosophical manifesto, state-as-corporation). 1357 lines.
  - `07-comparative-and-opposition.md` — Sections 84-90 (Route B, 10-idea comparison, Dalio counter-argument, opposition analysis, $676 Challenge media strategy). 1060 lines.
  - `08-academic-foundations.md` — Sections 91-95 (Jheringian tradition, paradigm shift, honest politicians PNAS 2020, election interference defense, game theory Downs/Buchanan-Tullock/Shapley). 784 lines.

**Verification:** Concatenation of all 8 files reconstructs exactly the source content (lines 65-7358 of monolith), 686,705 characters. Zero data loss confirmed programmatically.

### Preserved
- `docs/AB-EXIT_Analysis_v6.54.md` — The monolith file is maintained in parallel as an archive. Same content as the split version above. Useful for those preferring a single downloadable file or Ctrl+F search across the entire document. Two formats coexist; either provides the complete document.

### Changed
- `README.md` — "What's Inside" table updated to list both the split structure (recommended for reading) and the monolith (kept as archive).

### Rationale
- 95 sections in one 7,400-line file made navigation difficult on GitHub.
- Thematic split allows targeted reading and citation (e.g., direct link to game theory chapter in `08-academic-foundations.md`).
- Each split file is internally coherent and readable standalone (500-1400 lines each).
- Future additions can be integrated into the appropriate thematic file rather than appended to a monolith.
- Bilingual versions (English translations) become realistic: 8 pairs of 500-1500 lines each, instead of one impossible-to-translate 7400-line behemoth.

---

## [v3.0.0] — 2026-06-03

### Removed
- `docs/ABEXIT_Launch_Plan_v2.md` — Tactical launch plan (outdated)
- `docs/ABEXIT_Launch_Plan_v2_LEGAL.md` — Maximum-detail version (outdated)
- `docs/AB-EXIT_Maximum_Hype_Strategy_v1.0.md` — Tactical hype strategy (outdated)

**Rationale:** Tactical plans included specific budgets ($30-50, $500-1000), target states (Colorado/Missouri/Oklahoma), and concrete domain strategies that have evolved during further analytical work. Removing them keeps the repository focused on core conceptual, legal, and academic documentation rather than operational tactics that change with each strategic iteration. Future tactical plans, if needed, will be developed for specific implementation contexts and may reside outside the main public repository.

### Added
- `docs/AB-EXIT_Analysis_v6.54.md` — Extended analytical document (95 sections, ~7400 lines)
  - Core formula with refinements
  - Strategic positioning across political audiences (Left, Right, Center, Business)
  - Legal foundations: US ballot initiative (Route A) + parliamentary scandal (Route B)
  - Jheringian doctrinal basis for continental European law
  - Game theory foundations: Downs paradox, Buchanan-Tullock, mechanism design, Shapley value
  - Structural defense against election interference methods
  - Viral campaign strategy ($676 Challenge with "6-7" cultural trend)
  - Empirical analysis of 10 alternative reforms
  - Three classes of voter (Pragmatists, Ideologues, Apathetics)
  - AI framing strategy and media communication
  - Honest politicians as key beneficiaries (PNAS 2020 empirical basis)
  - Structural property: paradigm shift makes critique through old theories impossible
- `transcripts/gemini-pro-followup/` — New subfolder with 5 files documenting the May 2026 followup session with Gemini Pro:
  - 4 preparatory documents (rounds 1-3 of legal review at municipal and state level, plus three final technical questions)
  - Full transcript of the followup session with Gemini Pro, including two public capitulation points
  - Subfolder README explaining session context, structure, and methodological observations

### Changed
- `archive/ABEXIT_Origin_2014.md` — Updated AI count from "5" to "6" in 2026 metadata only (the 2014 Google Doc quotation remains unchanged); the document is a hybrid of historical quotation and 2026 description, only the latter was updated.
- `transcripts/INDEX.md` — Added session 10 entry for Gemini Pro followup, updated summary table (Gemini now shows 3 sessions including Pro), updated total session count from 9 to 10. INDEX.md is navigational documentation, not a transcript.
- `README.md` — Updated AI Stress-Test Results table to include Gemini Pro row, updated Transcripts summary, added link to gemini-pro-followup subfolder in What's Inside, updated total session count to 10.

### Preserved (preambles added, original content unchanged)

Following the principle that AI stress-testing transcripts and historical project documents must be preserved unchanged for verification and archival integrity, the following files received explanatory preambles at the top while their original content below the preamble remains bit-identical to the source archive:

**AI stress-testing transcripts (8 files in `transcripts/`):**
- `2026-03-31-17-17-27-yuno-mechanism200-full-debate_PROTOCOL.md`
- `2026-04-01-11-31-18-yuno-mechanism200-full-debate_PROTOCOL.md`
- `2026-04-02-08-56-35-abexit-mechanism200-full-project_PROTOCOL.md`
- `deepseek-stress-test_PROTOCOL.md`
- `gemini-strategy-session_PROTOCOL.md`
- `gemini-stress-test_PROTOCOL.md`
- `grok-full-session_PROTOCOL.md`
- `qwen-stress-test_PROTOCOL.md`

**Historical project documents (3 files):**
- `manifesto/ABEXIT_Short_Manifesto.md` — Original YUNO-era manifesto restored; preamble notes "YUNO → AB-EXIT" rename and updated AI stress-test figures (4 AI → 6 AI, 449+ rounds).
- `manifesto/ABEXIT_Full_Manifesto.md` — Same approach as Short Manifesto.
- `docs/ABEXIT_Question_v4.3.md` — Original document restored (including one "YUNO" mention in Filter 5); preamble explains naming history.

**Preamble format:** Each preamble is clearly marked, dated 2026-06-03, separated from original content by `---`, and explains: (1) historical context, (2) project rename YUNO → AB-EXIT, (3) updated AI stress-test figures, (4) where to find the most current materials.

Note: The 5 Gemini Pro followup files in `transcripts/gemini-pro-followup/` are May 2026 materials already using current terminology and figures, so they do not require preambles.

---

## [v2.0.0] — 2026-04-02

### Added
- Complete rename from YUNO to AB-EXIT (A = vote, B = take money, EXIT = your choice)
- Legal defense section: 6 levels of attack/defense + SCOTUS endgame
- Phase 5: Referendum and consequences (months 12-18)
- Corrected target states: Colorado/Missouri/Oklahoma (Direct Initiative) instead of WV/KY/TN (no citizen-initiated referendum)
- Dual-path strategy: Path A (Direct Initiative) + Path B (politician champion) in parallel
- DAO section (Phase 3.5, months 6-9): reputation-based, no tradeable token
- Dual licensing model (Torvalds model): free for citizens, paid for corporations
- Economic model: 6 streams, +13-20% GDP for 2 election cycles
- Corruption reduction through high salaries + oversight (Singapore model)
- Court reform + police reform economic projections
- Smart immigration policy projections
- Complete "Book of Answers" for attacks (7 attacks + filter-based responses)
- "What NOT to do" section (7 rules)
- Metrics extended to 18 months
- Fellowship applications: Ashoka, Echoing Green, Shuttleworth
- Legal partners: Institute for Justice, Cato Institute, Pacific Legal Foundation
- Naming contest strategy (month 2-3)
- Author safety protocol
- Translation strategy (7 priority languages)
- Ballot language example ("Civic Dividend" framing)
- Signature gathering via volunteers (500 × 250 = 125,000 for Colorado)

### Changed
- TM strategy: common law rights first ($0), USPTO registration ($250-350) only after traction
- Primary domain: abexit.org (not .com) — movement = .org
- Start budget: $30-50 (domains only), not $2,000-3,000
- GDP forecast corrected from +4-7% to +13-20% (after including budget savings, business migration, corruption reduction, court reform, immigration)

## [v1.0.0] — 2026-04-01

### Added
- Initial launch plan under YUNO name
- 4 phases, 12 months
- Basic content strategy
- Target states: West Virginia, Kentucky, Tennessee (later corrected)
- Basic metrics table

## [v0.0.1] — 2014-07-14

### Added
- Original concept documented in Google Doc by Denis Klyavlin
- Core idea: "Vote can be annulled for money"
- First formulation of voluntary compensated abstention
