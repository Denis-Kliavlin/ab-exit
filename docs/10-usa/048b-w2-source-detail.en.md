# 48b. The W-2 via the SSA: the American Implementation of the Data Source

**Chapter:** 10 — Case: USA
**File version:** v1
**Date:** 2026-06-11 · moved 2026-09-15
**Source:** moved from §2 and §3 during the universalisation of v6.58.0

---

The universal requirements for the source of median-wage data are formulated in
[§2](../01-introduction/002-protection.md). This section shows how they are met
**in the USA**: by Form W-2, which the employer files with the SSA.

## 48b.1. Why the W-2 specifically

The W-2 is the employer's reporting form to the SSA on the wages of each worker. It is not
a survey and not a worker's declaration. It is a document from the employer, confirmed
bilaterally.

### What the W-2 counts (CORRECTLY included)

- Wages of employees
- Bonuses
- Commissions
- All forms of pay for labour from an employer in the given city

### What the W-2 does NOT count (CORRECTLY excluded)

- Pensions (a federal transfer, not the city's production)
- Social Security payments (federal)
- Benefits / welfare (a transfer, not production)
- Investment income (not work)
- Inheritance (not production)
- Alimony (a transfer between citizens)

### Why excluding pensions is CORRECT

A pension is not the city's income. It is a transfer from the federal budget or from past
savings. Including pensions creates a perverse incentive: the mayor attracts rich pensioners
instead of creating jobs. The W-2 measures the city's NET economic productivity — only what
is earned here, by this employer, by this worker.

### The self-employed (1099)

The self-employed have no W-2 but PRODUCE in the city. Their median income ($36K) is below
the median W-2 ($45K). Including the self-employed would lower the median. The coefficient
1.5 (household) already contains an indirect correction. An additional coefficient is NOT
NEEDED.

## 48b.2. Protection of W-2 data: five levels

AB-EXIT creates NO NEW incentive to distort the W-2 (unlike the Census, where AB-EXIT would
create an incentive to inflate income in a survey without punishment). The W-2 is protected
by five levels, each working independently.

**Level 1: Triple copying.** The W-2 exists in three copies simultaneously: a copy to the
worker, a copy to the SSA, a copy to the IRS. All three are reconciled automatically. If the
employer stated $30K and the worker stated $40K in his return — the mismatch is detected
automatically and triggers an audit. Forging one copy is impossible — all three must be
forged simultaneously in three different organisations.

**Level 2: Payroll software.** 95 %+ of employers in the USA use automated payroll: ADP,
Paychex, QuickBooks, Gusto. The software calculates wages, withholdings and W-2s
automatically on the basis of real bank transactions. The employer does not fill in the W-2
by hand — the system generates the forms from actual payments. Forging a W-2 = hacking
corporate payroll software and bank records. This is not accounting fraud — it is
cybercrime.

**Level 3: Worker-witnesses.** Every worker knows his wage. Everyone receives a pay stub
every 2 weeks. Everyone receives a copy of the W-2 in January. A mismatch between the W-2
and the real wage = a worker's complaint to the IRS. One aggrieved fired employee = one call
= an audit of the whole company. An employer with 50 employees = 50 potential witnesses in 1
year, 500 in 10 years.

**Level 4: Criminal punishment (REALLY applied).** Employment tax fraud (forging W-2s /
failing to remit withheld taxes):

- Statute: 26 USC §7202, §7206, §7201
- Punishment: up to 5 years in prison + a $10,000 fine FOR EACH YEAR of violation
- IRS Criminal Investigation: conviction rate 90–97.3 % (the HIGHEST of all federal
  agencies)
- 300–400 criminal cases for employment tax fraud annually
- Average prison term: 37 months (2022–2024 data)
- 66 % of the convicted receive a REAL sentence

Specific cases (2023–2024 only, employment tax only):

- January 2024: a payroll-company owner, Oregon — 2+ years in prison
- October 2023: the CFO of a construction firm — 2 years in prison
- November 2023: the owners of a landscaping firm, Pennsylvania — guilty
- June 2024: a businesswoman, Virginia — convicted
- April 2024: a payroll-company owner, Maryland — guilty + theft from workers' 401(k)
- March 2024: a businessman, Florida — prison

The IRS treats failure to remit withheld payroll taxes as THEFT from the worker (money
withheld from the wage but not passed to the state), which explains the high priority of
prosecution and the severity of punishment.

**Level 5: The statistical impossibility of mass forgery.** For AB-EXIT what matters is not
a specific W-2 but the MEDIAN for the city. To shift the median, MASS forgery is needed:

- Detroit: 180,000 W-2 forms. The median = the 90,000th in the list
- Shifting the median by 5 % ($1,900) requires ~9,000 simultaneous forgeries
- 9,000 employers must simultaneously: forge payroll software + bank records + three copies
  of the W-2 + risk prison at a 97 % conviction rate + avoid complaints from all workers
- Coordinating 9,000 independent crimes = PHYSICALLY impossible
- Forgery by one employer (10 W-2s out of 180,000) = 0.006 % = statistical noise, the
  median DOES NOT SHIFT

For comparison: forging the Census requires ~1,000 of 20,000 respondents (5 %) to inflate
income individually, without coordination, without punishment. That is EASY. Forging the
W-2 = IMPOSSIBLE.

## 48b.3. Why AB-EXIT creates NO new incentive to distort the W-2

Census: before AB-EXIT the incentive to lie = $0. After AB-EXIT the incentive to lie = $600+
(the dividend). Punishment = $0. Conclusion: AB-EXIT BREAKS the Census.

IRS/W-2: before AB-EXIT the incentive to understate = tax savings. After AB-EXIT the
incentive = the same. Punishment = prison. Conclusion: AB-EXIT DOES NOT BREAK the W-2 (the
incentive is unchanged, the protection is not weakened).

## 48b.4. Cross-verification and the four-agency rule

| Source | Role | Frequency |
| :---- | :---- | :---- |
| SSA W-2 | PRIMARY (calculation) | Annually |
| IRS SOI | Verification | Annually (with a lag) |
| Census ACS | Verification of household structure | Annually |
| BLS QCEW | Quarterly trend check | Quarterly |

**The divergence rule:** if the PRIMARY (SSA) and any of the verification sources diverge
by more than 10 % — an automatic independent audit. The auditor is appointed by the judicial
branch. Results are public within 90 days.

**The four-agency rule:** the dividend calculation continues as long as AT LEAST ONE of the
four agencies (SSA, IRS, Census, BLS) publishes income data. Four federal agencies must
cease to exist simultaneously for AB-EXIT to lose its data source.

## 48b.5. The mayor controls NOT A SINGLE variable

| Variable | Who controls | Can the mayor influence it? |
| :---- | :---- | :---- |
| M (median wage) | SSA (federal agency) | NO |
| CPI (inflation) | BLS (federal agency) | NO |
| K (1 %) | The charter (referendum) | NO |
| 1.5 (household) | The charter (once a decade) | NO |
| N (recipients) | Citizens (free choice) | NO |

---

**Related sections:** [§2 — requirements for the data source (universal)](../01-introduction/002-protection.md) · [§3 — the data timeline (universal)](../01-introduction/003-rejected-variants.md) · [§48c — the American timeline and IRS modernisation](048c-data-timeline-us.md) · [§42 — the poison pill](../08-implementation/042-poison-pill.md)
