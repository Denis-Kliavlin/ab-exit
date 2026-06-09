# AB-EXIT — Formula and Technical Protocol

<!-- TOC -->

**Contents of this file:**

- [1. Core Formula](#1-core-formula)
- [2. Expanded Formula with Averaging](#2-expanded-formula-with-averaging)
- [3. Two-Phase Payout](#3-two-phase-payout)
  - [Phase 1: Base Dividend (D_base)](#phase-1-base-dividend-d_base)
  - [Phase 2: Efficiency Bonus (B)](#phase-2-efficiency-bonus-b)
  - [Total Dividend per Cycle:](#total-dividend-per-cycle)
- [4. Data Source: W-2 via SSA](#4-data-source-w-2-via-ssa)
  - [Why W-2](#why-w-2)
  - [What W-2 Includes (CORRECTLY included)](#what-w-2-includes-correctly-included)
  - [What W-2 Does NOT Include (CORRECTLY excluded)](#what-w-2-does-not-include-correctly-excluded)
  - [Why the Exclusion of Pensions is CORRECT](#why-the-exclusion-of-pensions-is-correct)
  - [Self-Employed (1099)](#self-employed-1099)
- [5. Coefficients](#5-coefficients)
  - [K = 1% (Dividend Coefficient)](#k-=-1-dividend-coefficient)
  - [1.5 (Household Coefficient)](#1.5-household-coefficient)
- [6. Data Timeline](#6-data-timeline)
  - [6.1. Current Reality vs. Ideal](#6.1-current-reality-vs-ideal)
  - [6.2. Fundamental Asymmetry: Citizen vs. State](#6.2-fundamental-asymmetry-citizen-vs-state)
  - [6.3. Ideal Timeline (Post IRS/SSA Reform)](#6.3-ideal-timeline-post-irsssa-reform)
- [7. Protection Against Manipulation](#7-protection-against-manipulation)
  - [The Mayor Controls NONE of the Variables:](#the-mayor-controls-none-of-the-variables)
  - [W-2 Data Protection: Five Levels](#w-2-data-protection-five-levels)
  - [Why AB-EXIT Does NOT Create a New Incentive to Falsify W-2](#why-ab-exit-does-not-create-a-new-incentive-to-falsify-w-2)
  - [Cross-Verification:](#cross-verification)
  - [The Four-Agency Rule:](#the-four-agency-rule)
- [8. Public Counter and Its Impact on Elections](#8-public-counter-and-its-impact-on-elections)
  - [8.1. Publication Mechanism](#8.1-publication-mechanism)
  - [8.2. Purpose of the Public Counter](#8.2-purpose-of-the-public-counter)
  - [8.3. Dividend Percentage as an Incumbent Confidence Rating](#8.3-dividend-percentage-as-an-incumbent-confidence-rating)
  - [8.4. Impact on Debates](#8.4-impact-on-debates)
  - [8.5. Two-Phase Campaign](#8.5-two-phase-campaign)
  - [8.6. Impact on Good vs. Bad Incumbents](#8.6-impact-on-good-vs-bad-incumbents)
  - [8.7. For the Charter](#8.7-for-the-charter)
- [9. Calculation Examples](#9-calculation-examples)
  - [Detroit](#detroit)
  - [Los Angeles](#los-angeles)
  - [San Jose](#san-jose)
  - [Moldova](#moldova)
- [10. SMS to the Citizen](#10-sms-to-the-citizen)
- [11. Rating (Stars)](#11-rating-stars)
- [12. For the Charter (Legal Text)](#12-for-the-charter-legal-text)
- [13. Rejected Variants and Reasons for Rejection](#13-rejected-variants-and-reasons-for-rejection)
  - [Variant A: Census Bureau Household Median (ACS)](#variant-a-census-bureau-household-median-acs)
  - [Variant B: General Fund Revenue](#variant-b-general-fund-revenue)
  - [Variant C: Federal Poverty Level (FPL)](#variant-c-federal-poverty-level-fpl)
  - [Variant D: Minimum Wage](#variant-d-minimum-wage)
  - [Variant E: IRS AGI (Adjusted Gross Income) as PRIMARY](#variant-e-irs-agi-adjusted-gross-income-as-primary)
  - [Variant F: Census ACS + BLS QCEW Correction (Hybrid)](#variant-f-census-acs-+-bls-qcew-correction-hybrid)
  - [Variant G: Composite Index (ABEI — 4 metrics)](#variant-g-composite-index-abei-—-4-metrics)
  - [Variant H: 1.1 Coefficient (Adjustment for Pensioners + Self-Employed)](#variant-h-1.1-coefficient-adjustment-for-pensioners-+-self-employed)
  - [Variant I: K = 0.7% (Original Coefficient)](#variant-i-k-=-0.7-original-coefficient)
  - [Variant J: K = 2% (Enhanced Coefficient)](#variant-j-k-=-2-enhanced-coefficient)
- [14. Final Justification for Choosing W-2](#14-final-justification-for-choosing-w-2)

<!-- /TOC -->

**Part:** Sections 1-14 of the 95-section analytical document AB-EXIT v6.54.

**Content:** Core formula D = M × 1.5 × 1%, W-2 data source via SSA, protection against manipulation, calculations, SMS to citizens, star ratings, legal text for the charter, rejected alternatives with justification.

**Full Document:** A monolithic version containing all 95 sections is available in `docs/AB-EXIT_Analysis_v6.54.md`. This folder `docs/AB-EXIT_Analysis/` is a structured breakdown of the same document into thematic groups for ease of reading and citation. The content is identical.

**Navigation:** See the [README of this folder](README.md).

---

## 1. Core Formula

```
D = W2_M × 1.5 × K
```

**Where:**

- **D** — the size of the Civic Dividend (payout to a citizen for voluntary abstention from voting)
- **W2_M** — the median wage based on W-2 forms across all ZIP codes of the municipality (SSA data)
- **1.5** — a standard coefficient for converting individual median to household median
- **K** — the dividend coefficient: **1%** (fixed in the charter)

---

## 2. Expanded Formula with Averaging

```
D = M̄ × 1.5 × 1%
```

**Where M̄ is the three-year average with CPI correction:**

```
M̄ = (M₁ × CPI₁ + M₂ × CPI₂ + M₃) / 3
```

- **M₃** — the W-2 median for the most recent available year (current)
- **M₂** — the W-2 median for the previous year × 1-year CPI correction
- **M₁** — the W-2 median for 2 years ago × 2-year CPI correction
- **CPI** — Consumer Price Index (published monthly by the BLS)

**Starting Period:**
- First cycle: M̄ = M₃ (one year, no averaging)
- Second cycle: M̄ = (M₂ × CPI₂ + M₃) / 2
- Third cycle and beyond: the full three-year formula

---

## 3. Two-Phase Payout

### Phase 1: Base Dividend (D_base)

```
D_base = M̄ × 1.5 × 1%
```

- Paid **1 day before the election**
- From a pre-established fund
- Source: city budget

### Phase 2: Efficiency Bonus (B)

```
B = max(0, Budget_plan - Budget_fact) × 30% / N
```

- **Budget_plan** — planned budget for the cycle
- **Budget_fact** — actual expenditures for the cycle
- **N** — number of dividend recipients
- Paid **6 months after** the election
- Following an independent audit (GAAP)

### Total Dividend per Cycle:

```
D_total = D_base + B
```

---

## 4. Data Source: W-2 via SSA

### Why W-2

W-2 is the employer's reporting form to the SSA regarding each employee's wages. This is not a survey and not an employee's declaration. It is a document from the employer, verified on both sides.

### What W-2 Includes (CORRECTLY included)

- Salaries of hired employees
- Bonuses
- Commissions
- All forms of labor compensation from the employer in the given city

### What W-2 Does NOT Include (CORRECTLY excluded)

- Pensions (federal transfer, not city production)
- Social Security payments (federal)
- Welfare/Benefits (transfer, not production)
- Investment income (not labor)
- Inheritance (not production)
- Alimony (transfer between citizens)

### Why the Exclusion of Pensions is CORRECT

A pension is not city income. It is a transfer from the federal budget or past savings. Including pensions would create a perverse incentive: the mayor would attract wealthy retirees instead of creating jobs. W-2 measures the PURE economic productivity of the city — only what was earned here, by this employer, for this employee.

### Self-Employed (1099)

The self-employed do not have W-2s but PRODUCED in the city. Their median income ($36K) is lower than the W-2 median ($45K). Including the self-employed would lower the median. The 1.5 factor (household) already contains an indirect correction. An additional coefficient is NOT NEEDED.

---

## 5. Coefficients

### K = 1% (Dividend Coefficient)

- Fixed in the charter
- Local council may increase to 2% under the condition: prior cycle savings exceed the cost of AB-EXIT by 3 times + 2/3 council approval
- Above 2% — only by referendum with a 2/3 majority
- Reduction below 1% — only by referendum

**Why 1%:** it can be calculated in one's head in 2 seconds (remove two zeros). Universal for any city or country. "1%" is a brand, not just a number.

### 1.5 (Household Coefficient)

- Conversion of individual W-2 median to an approximate household median
- Average number of earners per household in the US: 1.3–1.7
- 1.5 coefficient = average value
- Fixed in the charter
- Reviewed every 10 years based on decennial Census Bureau data

**Arithmetic for the Citizen:**  
W-2 median $40,000 + half ($20,000) = $60,000. Remove two zeros = $600. Three steps in 5 seconds.

---

## 6. Data Timeline

| Step | Deadline | Source |
|---|---|---|
| Employers file W-2 | January 31 (for previous year) | Employers → SSA |
| SSA aggregates by ZIP | By April (+90 days) | SSA |
| City calculates median | By May (+30 days) | City administration |
| Publication of Dividend | 30 days before election | City |
| A/B Declaration Window | 30–15 days before election | Citizens |
| Base Payout (D_base) | 1 day before election | Treasury → Bank |
| Election | Day X | — |
| Budget Audit | +6 months | Independent Auditor |
| Bonus Payout (B) | Post-audit | Treasury → Bank |

**Total data lag: 5 months** (January W-2 → June payout).

### 6.1. Current Reality vs. Ideal

The timeline above describes a REALISTIC scenario given current infrastructure. The SSA already receives W-2s by January and is technically capable of aggregating data by ZIP code in days (a SQL query to an existing database = 30 seconds). The 90-day lag is a buffer for bureaucratic procedures, not for calculations.

### 6.2. Fundamental Asymmetry: Citizen vs. State

The current system contains a fundamental contradiction:

**Requirements for the Citizen:**
- File declaration: strictly by April 15
- 1 day late: 5%/month penalty
- 60 days late: $485 fine or 100% of tax
- Failure to file: criminal case, up to 1 year in prison
- Accuracy: down to the cent, with documents for 7 years

**Requirements for the State (reporting to citizens):**
- Publication deadline: none established
- Late publication: $0 fine
- Format: 200-page PDF at their discretion
- Accuracy: ±billions, "we'll revise it later"

A citizen is required to report down to the cent 90 days in advance under threat of prison. The state reports when it wants, how it wants, with no consequences. An Apple shareholder knows more about their $5,000 investment than a citizen knows about their $5,000 in taxes — because the SEC mandates Apple report quarterly, while a city is never mandated to report.

AB-EXIT restores SYMMETRY: the state is obligated to provide every citizen with a specific figure (the dividend) by a specific deadline with specific accuracy.

### 6.3. Ideal Timeline (Post IRS/SSA Reform)

The IRS and SSA run on 1960s systems not because modernization is impossible, but because no one demands it. Three groups block modernization:

1. **Tax Preparation Industry (~$30B/year):** Intuit (TurboTax), H&R Block, and 100,000+ accountants lobby AGAINST tax simplification, because simple taxes = the death of their business. ProPublica (2019) documented Intuit’s 20-year campaign against free filing.
2. **Politicians from both parties:** Republicans cut the IRS budget (fewer audits = beneficial to donors), Democrats are interested in opacity (complex taxes = invisible hikes).
3. **IRS Employee Union (NTEU):** modernization = automation = reduction of 50,000 jobs out of 80,000.

AB-EXIT creates the FIRST mass incentive for modernization: millions of citizens whose dividend depends on the speed of data publication become lobbyists for IRS reform.

**Projected Ideal Timeline (3–5 years after mass adoption of AB-EXIT):**

| Step | Current Deadline | Ideal Deadline | Required Change |
|---|---|---|---|
| W-2 from employers | January 31 | January 31 (no change) | None |
| SSA/IRS aggregation by ZIP | +90 days (April) | +30 days (March) | API instead of manual processing |
| Median publication | +30 days (May) | +7 days (March) | Automated calculation |
| IRS SOI full publication | +2–3 years | +6 months (July) | Legislative speed requirement |
| Census/BLS verification | +9–12 months | +3 months | Agency synchronization |

**Ideal lag: 37 days** (January W-2 → February/March publication) instead of the current 5 months.

Technically, this is a 30-second SQL query to a database that already exists. The current 150-day lag = 149 days, 59 minutes, and 30 seconds of bureaucracy.

**Cascade effect of IRS modernization via AB-EXIT:**

When millions of citizens demand fast data for dividend calculation, IRS modernization will trigger collateral reforms:

1. Pre-filled declarations (as in Estonia, Denmark, Sweden — filing in 3 minutes instead of 13 hours). Savings for citizens: $30B/year in preparation services.
2. Automated audit via AI. Reduction of the tax gap ($600B/year) by 30–50% = $180–300B in additional tax revenue.
3. Instant refunds (3 days instead of 21). 100M refunds per year.
4. Real-time income transparency by ZIP code — every neighborhood sees its median and compares with neighbors.

AB-EXIT does not require IRS modernization for LAUNCH (W-2 via SSA with a 5-month lag = sufficient). But AB-EXIT creates PRESSURE that will lead to IRS modernization within 3–5 years — because for the first time, millions of citizens are PERSONALLY interested in the speed of state data.

---

## 7. Protection Against Manipulation

### The Mayor Controls NONE of the Variables:

| Variable | Who Controls | Can the Mayor Influence? |
|---|---|---|
| W2_M (Median Wage) | SSA (Federal Agency) | NO |
| CPI (Inflation) | BLS (Federal Agency) | NO |
| K (1%) | Charter (Referendum) | NO |
| 1.5 (Household) | Charter (Every 10 years) | NO |
| N (Recipients) | Citizens (Free Choice) | NO |

### W-2 Data Protection: Five Levels

AB-EXIT does not create a NEW incentive to distort W-2s (unlike the Census, where AB-EXIT would create an incentive to overstate income in a survey with no penalty). W-2 is protected by five levels, each operating independently:

**Level 1: Triple Copying**

A W-2 exists in three copies simultaneously: a copy for the employee, a copy for the SSA, and a copy for the IRS. All three are cross-checked automatically. If an employer reports $30K while the employee reports $40K in their declaration, the discrepancy is identified automatically and triggers an audit. Falsifying one copy is impossible — all three must be falsified simultaneously across three different organizations.

**Level 2: Payroll Software**

95%+ of US employers use automated payroll: ADP, Paychex, QuickBooks, Gusto. The software calculates wages, withholdings, and W-2s automatically based on actual bank transactions. The employer does not fill out W-2s manually — the system generates forms from actual payments. Falsifying a W-2 = hacking corporate payroll software and bank records. This is not accounting fraud — it is a cybercrime.

**Level 3: Employee Witnesses**

Every employee knows their salary. Everyone receives a pay stub every 2 weeks. Everyone receives a copy of the W-2 in January. A discrepancy between the W-2 and actual salary = an employee complaint to the IRS. One disgruntled former employee = one call = an audit of the entire company. For an employer with 50 employees = 50 potential witnesses in 1 year, 500 in 10 years.

**Level 4: Criminal Punishment (REALLY applied)**

Employment tax fraud (falsifying W-2s / failure to remit withheld taxes):

- Statute: 26 USC §7202, §7206, §7201
- Punishment: up to 5 years in prison + $10,000 fine FOR EACH YEAR of violation
- IRS Criminal Investigation: conviction rate 90–97.3% (the HIGHEST among all federal agencies)
- 300–400 criminal cases for employment tax fraud annually
- Average prison sentence: 37 months (2022–2024 data)
- 66% of those convicted receive REAL prison time

Specific cases (only for 2023–2024, only employment tax):

- January 2024: Payroll company owner, Oregon — 2+ years in prison.
- October 2023: CFO of a construction firm — 2 years in prison.
- November 2023: Landscaping firm owners, Pennsylvania — guilty.
- June 2024: Businesswoman, Virginia — convicted.
- April 2024: Payroll company owner, Maryland — guilty + theft from employees' 401(k).
- March 2024: Businessman, Florida — prison.

The IRS views the failure to remit withheld payroll taxes as THEFT from the employee (money withheld from the salary but not passed to the state), which explains the high priority of prosecution and the severity of punishments.

**Level 5: Statistical Impossibility of Mass Falsification**

For AB-EXIT, it is not specific W-2s that matter, but the MEDIAN for the city. Shifting the median requires MASSIVE falsification:

- Detroit: 180,000 W-2 forms. Median = the 90,000th on the list.
- A 5% shift in the median ($1,900) requires ~9,000 simultaneous falsifications.
- 9,000 employers would have to simultaneously: falsify payroll software + bank records + three copies of W-2 + risk prison at a 97% conviction rate + avoid complaints from all employees.
- Coordinating 9,000 independent crimes = PHYSICALLY impossible.
- Falsification by one employer (10 W-2s out of 180,000) = 0.006% = statistical noise, the median DOES NOT MOVE.

For comparison: falsifying the Census requires ~1,000 out of 20,000 surveyed (5%) to individually overstate income, without coordination, without punishment. This is EASY. Falsifying W-2s = IMPOSSIBLE.

### Why AB-EXIT Does NOT Create a New Incentive to Falsify W-2

Census: before AB-EXIT, the incentive to lie = $0. After AB-EXIT, the incentive to lie = $600+ (dividend). Punishment = $0. Conclusion: AB-EXIT BREAKS the Census.

IRS/W-2: before AB-EXIT, the incentive to understate = tax savings. After AB-EXIT, the incentive is the same. Punishment = prison. Conclusion: AB-EXIT does NOT break the W-2 (the incentive has not changed, protection has not weakened).

### Cross-Verification:

| Source | Role | Frequency |
|---|---|---|
| SSA W-2 | PRIMARY (calculation) | Annual |
| IRS SOI | Verification | Annual (with lag) |
| Census ACS | Household Structure Verification | Annual |
| BLS QCEW | Quarterly Trend Check | Quarterly |

**Discrepancy Rule:** if the PRIMARY (SSA) and any of the verification sources diverge by more than 10% — automatic independent audit. The auditor is appointed by the judicial branch. Results are public within 90 days.

### The Four-Agency Rule:

Dividend calculation continues as long as AT LEAST ONE of the four agencies (SSA, IRS, Census, BLS) publishes income data. Four federal agencies must cease to exist simultaneously for AB-EXIT to lose its data source.

---

## 8. Public Counter and Its Impact on Elections

### 8.1. Publication Mechanism

During the declaration window (30–15 days before the election), the city publishes DAILY on the official website and the AB-EXIT portal:

- Number of citizens who chose the Dividend (Option B)
- Number of citizens who chose the Vote (Option A)
- Number of those who have not yet declared
- Percentage of each category

Data is updated every 24 hours by 6:00 PM. Individual choices (who specifically chose A or B) remain CONFIDENTIAL. ONLY the aggregate is published.

### 8.2. Purpose of the Public Counter

Without the public counter, AB-EXIT works at 50%. With it — at 100%. Reason: entry barrier for new candidates.

**Without the public counter:**

A potential candidate does not know how many people will vote. Maybe 200,000 (as before). Maybe 50,000 (with AB-EXIT). If 200,000 — they need 100,000 votes, unrealistic. If 50,000 — they need 25,000, realistic. But the candidate DOES NOT KNOW. Uncertainty breeds fear. Fear prevents them from running. The machine survives.

**With the public counter:**

Day 10 of the declaration window: "Dividend taken: 170,000 (72.1%). Will vote: 65,745." Potential candidate: "I need 33,000. The incumbent has ~6,000 machine votes. Realistic." The candidate runs. Another 4 candidates run. The machine is dead. AB-EXIT works at 100%.

The public counter = a courage calibrator. Every day the number grows → the barrier falls → new candidates decide to run.

### 8.3. Dividend Percentage as an Incumbent Confidence Rating

The percentage of citizens choosing the dividend becomes an objective confidence rating for the current administration. It is not a sociological poll (subjective, small sample) — it is a decision with $630+ at stake.

- 50% took the dividend = "Half believe their vote is worth more than $630. The incumbent is WORKING."
- 70% took the dividend = "70% believe $630 is worth more than their vote. The incumbent FAILED TO CONVINCE."
- 90% took the dividend = "90% don't want to vote even for free. The incumbent CRASHED."

No existing mechanism provides such an accurate, unmanipulatable, financially-backed confidence rating.

### 8.4. Impact on Debates

The public counter creates a new type of question at debates that is IMPOSSIBLE without AB-EXIT:

- "80% took the dividend. Why did your citizens prefer $630 over your representation?"
- "The dividend for your district is $630. In the neighboring one — $1,100. What have you been doing for 20 years?"
- "Efficiency bonus: $12. In Brooklyn: $95. Explain."
- "On the portal, there are 45 citizen proposals. You implemented 3. Why?"

Every question = a specific figure that cannot be answered with generalities. The incumbent is forced to report SPECIFICALLY — to an electorate, every member of which PAID $630 for the right to ask.

### 8.5. Two-Phase Campaign

AB-EXIT splits the election campaign into two fundamentally different phases:

**Phase 1 — "Before the Counter" (before the declaration window):** agitation for PARTICIPATION in general, not for a specific candidate. "Don't take the $630 — your vote is worth more!" This is a new type of agitation, non-existent in the current system.

**Phase 2 — "After the Counter" (15 days before the election):** the number of voters is KNOWN. The campaign becomes targeted: to convince a specific number of motivated voters. Money loses its decisive importance — motivated voters ignore advertising and listen to arguments.

### 8.6. Impact on Good vs. Bad Incumbents

AB-EXIT does not kill incumbents. AB-EXIT kills BAD incumbents and STRENGTHENS good ones:

**Good Incumbent:** "The dividend grew from $570 to $700. Bonus $150. Implemented 47 citizen proposals. Cleveland: $580. Us: $700. Only 50% took the dividend — because people WANT to vote for continuation." → RE-ELECTED with a strengthened mandate.

**Bad Incumbent:** "The dividend fell from $700 to $630. Bonus $12. Implemented 3 proposals. 85% took the dividend. 5 competitors emerged, each with a specific plan." → WILL LOSE. Not by kompromat — but by ARITHMETIC.

### 8.7. For the Charter

```
ARTICLE XIV: TRANSPARENCY OF PARTICIPATION

Section 1: REAL-TIME PUBLICATION
The aggregate number of citizens who have 
declared for Dividend (Option B) and Vote 
(Option A) shall be published daily on the 
city's official AB-EXIT portal during the 
declaration window.

Section 2: FORMAT
Published data shall include:
(a) Total declarations for Dividend
(b) Total declarations for Vote
(c) Total undeclared
(d) Percentage of each category
Updated every 24 hours by 6:00 PM local time.

Section 3: INDIVIDUAL CONFIDENTIALITY
Individual choices (A or B) shall remain 
strictly confidential. Only aggregate numbers 
are published. No citizen's personal choice 
shall be disclosed to any party, candidate, 
employer, or government official.

Section 4: RATIONALE
Public knowledge of aggregate participation 
levels enables informed candidacy decisions, 
reduces barriers to entry for challengers, 
and provides an objective, financially-backed 
measure of public trust in incumbent leadership.
```

---

## 9. Calculation Examples

### Detroit

```
W-2 Median: $38,000
× 1.5 = $57,000
× 1% = $570

Bonus (if mayor saved $80M):
$80M × 30% / 46,000 = $522

D_total = $570 + $522 = $1,092
```

### Los Angeles

```
W-2 Median: $52,000
× 1.5 = $78,000
× 1% = $780

Bonus (if mayor saved $500M):
$500M × 30% / 1,200,000 = $125

D_total = $780 + $125 = $905
```

### San Jose

```
W-2 Median: $85,000
× 1.5 = $127,500
× 1% = $1,275
```

### Moldova

```
W-2 Equivalent (Median Wage): 
120,000 MDL/year (~$7,000)
× 1.5 = 180,000 MDL
× 1% = 1,800 MDL (~$105)
```

---

## 10. SMS to the Citizen

```
┌──────────────────────────────────────┐
│ AB-EXIT Dividend 2028                │
│                                      │
│ BASE: $570                           │
│ (W-2 Median: $38,000 × 1.5 × 1%)     │
│                                      │
│ BONUS: $522                          │
│ (Mayor saved $80M)                   │
│                                      │
│ TOTAL: $1,092                        │
│                                      │
│ Trend: $890 → $1,092 (+22.7%)        │
│ ★★★★★                                │
│                                      │
│ Cleveland: $640 (+12%) ★★★★☆          │
│ Pittsburgh: $720 (+8%) ★★★☆☆          │
│ Columbus: $810 (+15%) ★★★★☆           │
│ DETROIT: $1,092 (+22.7%) ★★★★★       │
│                                      │
│ Your W-2: $41,000                    │
│ You are ABOVE median ($38,000) ✓     │
│                                      │
│ Verify: abexit.gov/verify            │
└──────────────────────────────────────┘
```

---

## 11. Rating (Stars)

| Stars | Condition |
|---|---|
| ★☆☆☆☆ | Dividend DROPPED more than 10% |
| ★★☆☆☆ | Dividend dropped up to 10% |
| ★★★☆☆ | Dividend stable (±5%) |
| ★★★★☆ | Dividend grew by 5-15% |
| ★★★★★ | Dividend grew more than 15% |

---

## 12. For the Charter (Legal Text)

```
ARTICLE X: CIVIC DIVIDEND CALCULATION

Section 1: FORMULA
The Civic Dividend (D) shall be calculated as:
D = M̄ × 1.5 × 0.01
where M̄ is the three-year CPI-adjusted average 
of median W-2 wages for all ZIP codes 
within the municipality.

Section 2: DATA SOURCE
Primary: Social Security Administration 
W-2 wage data aggregated by ZIP code.

Section 3: COEFFICIENT K
K = 1% (one percent), fixed in this charter.
City council may increase K up to 2% 
if prior cycle savings exceed AB-EXIT cost 
by factor of 3, with 2/3 council approval.
K above 2%: referendum with 2/3 majority.
K below 1%: referendum only.

Section 4: HOUSEHOLD COEFFICIENT
1.5 (one and one-half), fixed in this charter.
Reviewed once per decade following 
decennial Census.

Section 5: TIMELINE
SSA shall provide W-2 median by ZIP code 
within 120 days of January 31 filing deadline.
City shall publish dividend calculation 
within 30 days of SSA publication.
Dividend paid no later than 1 day 
before election.

Section 6: EFFICIENCY BONUS
B = max(0, Budget_plan - Budget_fact) × 0.30 / N
Paid after independent GAAP audit, 
within 6 months of election.

Section 7: CROSS-VERIFICATION
Annual comparison with IRS SOI, Census ACS, 
and BLS QCEW data.
Divergence exceeding 10% triggers 
independent audit by judicially appointed 
statistician. Results published within 90 days.

Section 8: FOUR-AGENCY RULE
Dividend calculation continues as long as 
ANY ONE of SSA, IRS, Census Bureau, or BLS 
publishes income data for the municipality.

Section 9: ANTI-MANIPULATION
No local official shall have authority 
to modify, adjust, or influence the 
determination of W-2 median wages 
or any variable in the dividend formula.
```

---

## 13. Rejected Variants and Reasons for Rejection

### Variant A: Census Bureau Household Median (ACS)

**What it is:** A survey of 3.5M households annually, with a direct question about income.

**Why it was considered:**
- Direct measurement of household median (no 1.5 factor needed)
- 20 years of data history
- Coverage of the poor (everyone is surveyed, including the unemployed)

**Why it was REJECTED:**
- **CRITICAL DEFECT:** AB-EXIT creates a $600+ incentive to overstate income in a Census survey. The penalty for lying in a Census survey is $0. In 230 years, not a single person has been convicted for lying to a census taker. AB-EXIT tied to the Census would BREAK the Census as a data source — the system attacks itself (an autoimmune disease of the protocol).
- Accuracy ±5–15% (subjective survey, from memory).
- Response rate is falling (97.5% → 88% over 20 years).
- Margin of error for cities <25,000 reaches ±20%.

### Variant B: General Fund Revenue

**What it is:** A fixed percentage of the taxes actually collected by the city.

**Why it was considered:**
- Philosophical appeal: "city = corporation, taxes = revenue, dividend = shareholder's share."
- Strict audit (Fitch, Moody's).
- Impossible to hide billions in collected taxes.

**Why it was REJECTED:**
- **CRITICAL DEFECT:** the mayor CONTROLS tax rates. Raised taxes by 20% → Revenue grew → dividend grew → "the mayor is great." In reality, businesses left and people became poorer. Revenue REWARDS tax hikes in the short term.
- Corruption increases Revenue (bloating the budget via inflated collections, fines, new fees).
- Lowering taxes (good management) is PUNISHED by a drop in the dividend.
- Dual interpretation: did Revenue grow because the economy grew OR because the mayor jacked up taxes? Impossible to determine without deep analysis.

### Variant C: Federal Poverty Level (FPL)

**What it is:** A single figure from Washington ($15,060 in 2024), tied to a food basket.

**Why it was considered:**
- Absolute protection against manipulation (federal figure, mayor does not control).

**Why it was REJECTED:**
- Identical for expensive San Francisco and cheap rural Arkansas — kills representativeness.
- 10% of FPL = $1,500 — meaningless for LA and excessive for the hinterlands.
- Does not reflect the economy of a SPECIFIC city — tied to a national food basket.

### Variant D: Minimum Wage

**What it is:** Linking to the local minimum hourly rate (e.g., 100 hours of minimum wage).

**Why it was considered:**
- Ideally reflects the cost of basic survival in a specific city.
- Clear to every worker.

**Why it was REJECTED:**
- **CRITICAL DEFECT:** the minimum wage is set by LOCAL POLITICIANS. If the dividend is tied to the minimum wage, the elite will block any minimum wage hike to avoid paying higher dividends. AB-EXIT would inadvertently lead to a freeze in the incomes of the poorest strata. A perverse incentive.

### Variant E: IRS AGI (Adjusted Gross Income) as PRIMARY

**What it is:** Median adjusted gross income from tax declarations (Form 1040, line 11).

**Why it was considered:**
- Punishment for lying: prison (federal crime).
- Coverage: 153M declarations (100% of filers).
- Accuracy: ±1–3% for legal income.
- Verification: W-2 from employer is checked against the declaration.

**Why it was REJECTED in favor of W-2:**
- 2–3 YEAR lag (SOI publication). Unacceptable for operational dividend calculation.
- AGI ≠ real income: an entrepreneur with $200K income can show an AGI of $94K after deductions.
- 43% file jointly (household), 57% separately — we don't know who lives together.
- The poor (income <$13,850) do not file declarations — invisible to the IRS.
- **W-2 solves all these problems:** 5-month lag, from employer (not employee), no deductions, no joint/separate problem.

### Variant F: Census ACS + BLS QCEW Correction (Hybrid)

**What it is:** Census median as annual calibration + BLS quarterly trend for interpolation.

**Why it was considered:**
- Census = accurate median once a year.
- BLS = fast trend every quarter.
- Combination = fresh data with an accurate base.

**Why it was REJECTED:**
- Census remains PRIMARY → vulnerable to the overstatement incentive (the same autoimmune problem).
- BLS QCEW publishes the MEAN, not the median — requires a conversion factor (0.75), which VARIES for different cities (from 0.65 to 0.82) — a source of error and manipulation via coefficient choice.
- Dual dependence on two agencies complicates the formula without a proportional increase in accuracy.

### Variant G: Composite Index (ABEI — 4 metrics)

**What it is:** A weighted index of median income (40%) + employment (25%) + population influx (20%) + safety (15%).

**Why it was considered:**
- A comprehensive assessment of city efficiency across 4 parameters.
- Each parameter covers an aspect the others miss.

**Why it was REJECTED:**
- "Your ABEI grew by 2.3%" — Citizen: "What?! How much money?!" — UNINTELLIGIBLE.
- Who determines the weights (40/25/20/15)? This is a POLITICAL decision. The mayor would lobby for the weight of the metric where they have good indicators — manipulation via WEIGHTS.
- Median income ALREADY CONTAINS all 4 metrics: job growth → wages ↑ → median ↑; influx → median ↑; safety → people stay → median ↑. A composite index is redundant — median = integral indicator.

### Variant H: 1.1 Coefficient (Adjustment for Pensioners + Self-Employed)

**What it is:** An additional multiplier to account for income that W-2 does not see.

**Why it was considered:**
- W-2 does not count retirees, self-employed, investors — the coefficient compensates.

**Why it was REJECTED:**
- Pensions = federal TRANSFER, not city income. Counting pensions = create a perverse incentive (mayor attracts retirees instead of creating jobs).
- Self-employed (1099) earn LESS than the W-2 median ($36K vs $45K) — adding them would LOWER the median, not raise it.
- The 1.5 factor (household) already contains an indirect correction.
- Three coefficients (1.1 × 1.5 × 1%) = complex. Two (1.5 × 1%) = simple. Simplicity won without loss of accuracy.

### Variant I: K = 0.7% (Original Coefficient)

**What it is:** The originally proposed dividend coefficient.

**Why it was REJECTED in favor of 1%:**
- 0.7% = an ugly number, can't be calculated in one's head.
- "120,000 × 0.007 = ...uh...840?" vs. "120,000 × 1% = 1,200. Period."
- 1% = brand. 0.7% = number.
- 1% is sufficient for filtering (risk premium of the poor = 400%, even 1% in subjective estimation beats vote buying).
- Budget balance at 1% is better than at 0.7% (+$94M vs. +$78M for Moldova).

### Variant J: K = 2% (Enhanced Coefficient)

**What it is:** A doubled coefficient for "countries under attack" (Moldova, vote buying by Shor).

**Why it was considered:**
- At K=2%, the cost of vote buying for Shor would increase 7-fold.
- Stronger filtering of the electorate.

**Why it was REJECTED as the baseline:**
- K=1% is already sufficient to destroy vote buying (subjective premium of the poor = 400%, i.e., 1,200 safe lei = 6,000 subjective > 1,700 dirty from Shor).
- K=2% = loss of legitimacy (78% take the dividend, only 22% vote).
- K=2% = excessively expensive for the budget.
- **Compromise:** K=1% as standard, increase to 2% — a local council decision if savings are available.

---

## 14. Final Justification for Choosing W-2

| Criterion | W-2 (Selected) | Census | IRS AGI | Revenue |
|---|---|---|---|---|
| Mayor Controls | **NO** | NO | NO | YES |
| AB-EXIT breaks source | **NO** | YES (autoimmune) | NO | NO |
| Penalty for Lying | **5 years prison, 97% conviction** | $0 (zero cases in 230 years) | 5 years prison | N/A |
| Forgery Protection | **5 levels (triple copy + payroll software + witnesses + prison + stat. impossibility)** | None | 2 levels (W-2 check + prison) | Audit (bypassable) |
| Lag | **5 months** | 9 months | 2–3 years | 3 months |
| Citizen Verifies | **YES (their own W-2)** | NO | YES (declaration) | NO |
| Counts PRODUCTION | **YES (only what was earned)** | No (includes pensions, transfers) | Partially (AGI lowered by deductions) | NO (counts rates, not economy) |
| Intelligible | **YES** | YES | YES | NO |
| Accuracy | **±3%** | ±5–15% | ±1–3% | Accurate but WRONG |
| Mass Forgery | **Impossible (9,000 simultaneous crimes)** | Easy (5% of surveyed lie individually) | Difficult but possible | Not applicable |

**W-2 = the only source that AB-EXIT cannot break, the citizen can verify, and which measures the REAL economy of the city. Five-level protection makes mass falsification physically impossible.**

---
