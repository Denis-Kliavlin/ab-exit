# 48c. The American Data Timeline and IRS Modernisation

**Chapter:** 10 — Case: USA
**File version:** v1
**Date:** 2026-06-11 · moved 2026-09-15
**Source:** moved from §3 during the universalisation of v6.58.0

---

The universal principle of the timeline and the symmetry of reporting is in
[§3](../01-introduction/003-rejected-variants.md). Here — what it looks like with American
infrastructure and what specifically stands in the way of speeding it up.

## 48c.1. The timeline under current infrastructure

| Step | Deadline | Source |
| :---- | :---- | :---- |
| Employers file W-2s | 31 January (for the previous year) | Employers → SSA |
| SSA aggregates by ZIP | By April (+90 days) | SSA |
| The city calculates the median | By May (+30 days) | City administration |
| Publication of the dividend | 30 days before the election | City |
| The A/B declaration window | 30–5 days before the election (default value, see 4.1) | Citizens |
| Payment of the base (D_base) | 1 day before the election | Treasury → bank |
| Election | Day X | — |
| Budget audit | +6 months | Independent auditor |
| Payment of the bonus (B) | After the audit | Treasury → bank |

**Total data lag: 5 months** (January W-2 → June payment).

This is a REALISTIC scenario under current infrastructure. The SSA already receives W-2s by
January and is technically able to aggregate data by ZIP code within days (an SQL query on
an existing database = 30 seconds). The 90-day lag is a reserve for bureaucratic procedures,
not for computation.

## 48c.2. The "citizen vs state" asymmetry in American figures

**Requirements on the citizen:**

- File a return: strictly by 15 April
- 1 day late: a 5 %/month penalty
- 60 days late: a penalty of $485 or 100 % of the tax
- Didn't file: a criminal case, up to 1 year in prison
- Accuracy: to the cent, with documents for 7 years

**Requirements on the state (for reporting to citizens):**

- Deadline for publishing data: not set
- Lateness: a $0 penalty
- Format: a 200-page PDF if it likes
- Accuracy: ±billions, "we'll revise"

An Apple shareholder knows more about his $5,000 investment than a citizen about his $5,000
of taxes — because the SEC obliges Apple to report quarterly, while the city is never obliged
to report.

## 48c.3. Who blocks modernisation

The IRS and the SSA run on 1960s systems not because modernisation is impossible but because
nobody demands it. Three groups block modernisation:

1. **The tax-preparation industry (~$30B/year):** Intuit (TurboTax), H&R Block and 100,000+
   accountants lobby AGAINST tax simplification, because simple taxes = the death of their
   business. ProPublica (2019) documented Intuit's 20-year campaign against free filing
2. **Politicians of both parties:** Republicans cut the IRS budget (fewer audits = good for
   donors), Democrats are interested in opacity (complex taxes = an unnoticed increase)
3. **The IRS employees' union (NTEU):** modernisation = automation = cutting 50,000 of
   80,000 jobs

AB-EXIT creates the FIRST mass incentive for modernisation: millions of citizens whose
dividend depends on the speed of data publication become lobbyists for IRS reform.

## 48c.4. The ideal timeline after reform

| Step | Current deadline | Ideal deadline | What must change |
| :---- | :---- | :---- | :---- |
| W-2s from employers | 31 January | 31 January (unchanged) | Nothing |
| SSA/IRS aggregation by ZIP | +90 days (April) | +30 days (March) | An API instead of manual processing |
| Publication of the median | +30 days (May) | +7 days (March) | Automatic calculation |
| IRS SOI full publication | +2–3 years | +6 months (July) | A legislative speed requirement |
| Census/BLS verification | +9–12 months | +3 months | Synchronisation of agencies |

**Ideal lag: 37 days** (January W-2 → February/March publication) instead of the current
5 months.

Technically this is a 30-second SQL query on a database that already exists. 150 days of
current lag = 149 days, 59 minutes and 30 seconds of bureaucracy.

## 48c.5. The cascade effect of IRS modernisation through AB-EXIT

When millions of citizens demand fast data for the dividend calculation, IRS modernisation
will trigger side reforms:

1. A pre-filled return (as in Estonia, Denmark, Sweden — filing in 3 minutes instead of
   13 hours). Savings to citizens: $30B/year on preparation services
2. Automatic audit via AI. Cutting the tax gap ($600B/year) by 30–50 % = $180–300B of
   additional taxes
3. Instant refunds (3 days instead of 21). 100M refunds a year
4. Real-time income transparency by ZIP code — every neighbourhood sees its median and
   compares with its neighbours

AB-EXIT does not require IRS modernisation to LAUNCH (the W-2 via the SSA with a 5-month
lag = sufficient). But AB-EXIT creates PRESSURE that will lead to IRS modernisation within
3–5 years — because for the first time millions of citizens are PERSONALLY interested in
the speed of state data.

---

**Related sections:** [§3 — the data timeline (universal)](../01-introduction/003-rejected-variants.md) · [§48b — the W-2 via the SSA](048b-w2-source-detail.md) · [§58 — the affordability crisis of 2026](058-affordability-2026.md)
