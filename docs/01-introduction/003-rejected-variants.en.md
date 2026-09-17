# 3. The Data Timeline and the Symmetry of Reporting

**Chapter:** 01
**File version:** v2 (universalised)
**Date:** 2026-06-11 · universalised 2026-09-15
**Source:** v6.53 §6, §7

---

## 3.1. The sequence of steps

The timeline is the same for any jurisdiction; only the national reporting deadlines and
the election date change.

| Step | Timing | Who |
| :---- | :---- | :---- |
| Employers file wage reports | Per the national calendar, for the prior year | Employers → statistical authority |
| The authority aggregates the median by territory | After collection | Statistical authority |
| The jurisdiction computes the dividend | After the median is published | Administration |
| The dividend amount is published | 30 days before the election | Jurisdiction |
| A/B declaration window | 30–15 days before the election | Citizens |
| Base payment (D\_base) | 1 day before the election | Treasury → bank |
| Election | Day X | — |
| Budget audit | \+6 months | Independent auditor |
| Bonus payment (B) | After the audit | Treasury → bank |

In existing systems the data lag runs to several months. It is worth understanding what
that lag consists of: aggregating a median by territory takes seconds in technical terms
(a query against a database that already exists). Everything else is slack for
bureaucratic procedure.

The protocol works even with a lag of several months: the median moves slowly, and a
three-year average corrected for inflation smooths the remainder. Acceleration is a
desirable consequence, not a condition of launch.

## 3.2. The fundamental asymmetry: citizen vs state

Existing systems are almost universally asymmetric.

**What is required of the citizen:** file by a hard deadline; a penalty for every day
late; criminal liability for failing to file; accuracy down to the last unit of currency;
document retention for years.

**What is required of the state in reporting to the citizen:** a publication deadline is
usually not set at all; there is no penalty for being late; the format is discretionary;
the accuracy is revisable.

A shareholder in a listed company knows more about their investment than a citizen knows
about their taxes — because the market regulator obliges the company to report quarterly,
while the jurisdiction is obliged to report never.

AB-EXIT restores SYMMETRY: the state is obliged to give every citizen a specific number
(the dividend), by a specific date, at a specific accuracy. It is the first obligation of
its kind — with a date, a figure and an addressee.

## 3.3. A side effect: pressure to modernise statistics

State data-collection systems are slow not because modernisation is impossible but
because nobody demands it. There is simply no interested party: no citizen has a personal
reason to push for the median to be published three months earlier.

AB-EXIT creates the first mass incentive. Millions of citizens whose payment depends on
publication speed become a stakeholder. That pulls along side reforms which several
countries have already implemented and which serve as the model: pre-filled tax returns
(Estonia, Denmark, Sweden — filing in minutes rather than hours), automated auditing,
fast refunds, public transparency of incomes by territory.

The protocol does not require such modernisation in order to launch. It creates the
pressure that leads to it.

---

**Country-specific implementation:** American deadlines, the composition of the blocking
groups and the achievable acceleration are covered in
[§48c](../10-usa/048c-data-timeline-us.md).

---
