# 1. The Core Formula

**Chapter:** 01
**File version:** v2 (universalised)
**Date:** 2026-06-11 · universalised 2026-09-15
**Source:** v6.53 §1

---

D \= M × 1.5 × K

**Where:**

- **D** — the size of the Civic Dividend (the payment a citizen receives for voluntarily
  declining to vote)
- **M** — the median wage of the jurisdiction, as published by an independent statistical
  authority (requirements for the source — §2)
- **1.5** — the single coefficient converting an individual median into a household median
- **K** — the dividend coefficient. **Not a dogma:** it is chosen to serve the protocol's purpose (see "How K is chosen" below); the 1% in the table illustrates a starting value

---

The formula contains no national constant. It is tied to the median wage of **the economy
in which it is introduced**, so it computes identically for any country:

| Economy with a median of | Calculation | Dividend per cycle |
| :---- | :---- | :---- |
| 45,000 units/year | × 1.5 × 1% | ≈ 675 units |
| 20,000 units/year | × 1.5 × 1% | ≈ 300 units |
| 13,300 units/year | × 1.5 × 1% | ≈ 200 units |
| 80,000 units/year | × 1.5 × 1% | ≈ 1,200 units |

Hence the self-calibrating property: as the economy grows the dividend grows with it, but
citizens' incomes grow faster, so the incentive to exit weakens on its own, without any
politician intervening.

### How K is chosen: not a dogma but a balance

*(The architect's position, 29.09.2026.)* The percentage is not a dogma. The sum must be **important and desirable for those who have no wish to vote**: the apathetic and those who vote on impulse (protest, grievance, "against all"). The protocol's aim is to take them out of the decisive vote without hurting them financially; K is whatever value produces that result.

A balance has to be found here — but not a point of rest: for the money some of the uninterested leave, while for the increased weight of the vote others come, and the system keeps moving from cycle to cycle (055c §6.3b, 001b §4). The sum is fixed by referendum, and when it changes both sides change at once — those who take the money and those who come back for the weight of the vote. The third moving parameter is the sum itself: it remains a percentage of the median income and adjusts to the economy automatically (see "self-calibration" above). For a person whose income moves with the median, the weight of the sum does not change; it changes for those who grow poorer or richer faster than the rest (055c §6.3b):

| If K is too small | If K is too large |
|---|---|
| The sum is not desirable for the uninterested; they stay in the election, and the protocol does not change who decides. **A populist wins only when the payment is insufficient** (055c §6.3b): in Saxony-Anhalt the AfD loses first place only when more than 73% of its electorate takes the payment | The cost to the budget grows while the effect saturates: exit among the populist's poor base hits its ceiling, and wealthier voters do not leave for the sum — the increased weight of their vote keeps them. In Saxony-Anhalt the step from 1% to 2% takes 4.1 pp off the AfD, the step from 2% to 3% only 2.7 pp for the same added cost (055c §6.3b) |

The working measure is **a sum desirable for 40–50% of the population**. The exit rate is a function of the sum relative to a person's disposable remainder: 90–95% exit comes with a sum of the order of a month's earnings of the lower half (045). Example for Russia: 40–50 thousand ₽ per cycle, about 0.6–0.75 of the median monthly wage (056f §13b).

The sum is not the people's question, and an error in it is cheaper than dictatorship. A democracy can later correct an overstated K openly; dictatorship offers no such possibility (056f §13b). What stays fixed is something else: K, like the whole formula, is set by referendum, not by the sitting government.

The specific source of median data, the legal route to adoption and the source that funds
the trust are the three things tuned per country. They are covered in **Part IV (country
implementations)**, not here.

---
