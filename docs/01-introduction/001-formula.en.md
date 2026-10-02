# 1. The Core Formula

**Chapter:** 01
**File version:** v2 (universalised)
**Date:** 2026-06-11 · universalised 2026-09-15
**Source:** v6.53 §1

---

*Correction of 01.10.2026. The form D = M × 1.5 × K in this chapter is the first version of the formula. The current norm: the size of the payment is set by a single number — a percentage of the median income approved by referendum; what that percentage is composed of is for the country's experts (048k §3; 048m, Article 2; 1d).*

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

A balance has to be found here — but not a point of rest: for the money some of the uninterested leave, while for the increased weight of the vote (each ballot is still one vote; its share grows) others come, and the system keeps moving from cycle to cycle (055c §6.3b, 001b §4). The sum is fixed by referendum, and when it changes both sides change at once — those who take the money and those who come back for the weight of the vote. The third moving parameter is the sum itself: it remains a percentage of the median income and adjusts to the economy automatically (see "self-calibration" above). For a person whose income moves with the median, the weight of the sum does not change; it changes for those who grow poorer or richer faster than the rest (055c §6.3b):

| If K is too small | If K is too large |
|---|---|
| The sum is not desirable for the uninterested; they stay in the election, and the protocol does not change who decides. **A populist wins only when the payment is insufficient** (055c §6.3b): in Saxony-Anhalt the AfD loses first place only when more than 73% of its electorate takes the payment | The cost to the budget grows while the effect saturates: exit among the populist's poor base hits its ceiling, and wealthier voters do not leave for the sum — the increased weight of their vote keeps them. In Saxony-Anhalt the step from 1% to 2% takes 4.1 pp off the AfD, the step from 2% to 3% only 2.7 pp for the same added cost (055c §6.3b) |

The working measure is **a sum desirable for 40–50% of the population**. The exit rate is a function of the sum relative to a person's disposable remainder: 90–95% exit comes with a sum of the order of a month's earnings of the lower half (045). Example for Russia: 40–50 thousand ₽ per cycle, about 0.6–0.75 of the median monthly wage (056f §13b).

The sum is not the people's question, and an error in it is cheaper than dictatorship. A democracy can later correct an overstated K openly; dictatorship offers no such possibility (056f §13b). What stays fixed is something else: K, like the whole formula, is set by referendum, not by the sitting government.

### Why one number has so many consequences

*(Added 29.09.2026 following the architect's remarks: "strange — so many complex calculations and consequences from one percentage figure"; "simplicity gives a good chance of similar results — one number here and there.")*

**The complexity lives not in the rule but in people.** For the citizen the protocol is simple: one number, two buttons, a decision in a minute. Each person computes only his own case — whether this money matters more to him than the vote. The complex calculations (those who take, those who come back for the vote weight, the sum following the median — 055c §6.3b) are needed only by someone who wants to predict in advance what everyone will decide together. The payment algorithm itself learns nothing and a year later does exactly what it did on day one (033); what changes is not the rule but the response of millions to it. The quality of governance is a property that cannot be derived from a single voter (Anderson, 036d); a market price likewise conveys knowledge that no single participant has (Hayek, 013e).

**This is a class of mechanisms, not an exception.** A central bank's key rate is one number on which loans, the exchange rate, prices and elections depend; economists spend years computing its consequences and still get them wrong, yet no one asks the borrower to understand macroeconomics — he decides only whether to take the loan. A market price is one number behind which stand the decisions of all buyers and sellers. The protocol is built the same way: a one-line rule, with the result assembled from personal decisions. Hence the protection against manipulation: if the mechanism required complex calculations from the citizen, it would be easy to steer — "complicated is when they steal" (033c); that is why an opponent will first of all try to kill the simplicity (040c).

**Simplicity makes the rule transferable.** A complex system cannot be transplanted into another country without distortion: every detail grows local exceptions. One number and two buttons carry over as they are — this is how independent central banks spread around the world, one of the reforms where the rule changed and behaviour adjusted by itself (015c). The same number makes countries directly comparable: the scoreboard does not need translating and does not need to be believed — it is received (040b.4). The authorities have almost no knobs to turn: the sum is approved by referendum, the median comes from an independent source (001b §1, 048f.5).

**The same shape, different percentages.** One number gives the same shape of result, not the same figures. A rate works in the same direction everywhere — a higher rate, a dearer loan — but shifts each economy in its own way. So here: a populist loses everywhere if the payment is sufficient (a thesis from the calculation in 055c §6.3b, not an observation), because his base is poor and takes the money more often than the rest (055c §6.3b), and party shares change only through the difference in how readily different electorates take the money. The final figures in Saxony-Anhalt and in Russia will differ, because the people differ and so does what is left in their pockets.

The specific source of median data, the legal route to adoption and the budget source of
the payment are the three things tuned per country. They are covered in **Part IV (country
implementations)**, not here.

---
