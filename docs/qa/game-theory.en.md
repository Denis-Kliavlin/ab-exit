# Game Theory and Mathematics

Equilibria, the stability of the formula, attempts to play against the mechanism.
General rules of the base — [in the introduction](index.md).

---

### Q-GAM-001 · Four ways to kill the mechanism with one clause of law

**Status:** ✅ answered
**Who asks:** legislators, legal drafters, institutional sceptics
**Source in the book:** [§42 "The poison pill", items 73.2–73.6](../08-implementation/042-poison-pill.md)
**Related:** Q-LEG-004, Q-ECO-002

**Answer.** Outright repeal is politically expensive, so the real attack is substitution of the code.
§42 lists four vectors:

1. **Substituting general fund revenue for the source** — the payment becomes hostage
   to the budget cycle and to bargaining.
2. **Substituting Census for the source** — a soft, revisable estimate instead of hard W-2.
3. **Dilution through a composite index** — "the median adjusted for…" turns
   the formula into a matter of discretion.
4. **Killing the automaticity** — the payment remains but grows a barrier at the exit
   (an application, a check, a deadline), and actual availability falls.

The general principle of defence: the source, the coefficients and the automaticity are fixed
in text adopted by referendum, and change only by a new referendum.

**Weak point of the answer.** The defence recognises the attacks but does not guarantee repelling them:
everything turns on a court's readiness to read the text literally. A fifth vector — sabotage
by execution with the law formally untouched — is not in the list.

---

### Q-GAM-002 · Is there an equilibrium in which the mechanism collapses?

**Status:** ✅ answered
**Who asks:** academics, game theorists
**Source in the book:** [§13 "Game theory"](../03-theory/013-game-theory.md) — Downs, Buchanan-Tullock, Shapley, Nash, mechanism design; [§15b.6b, 6d "The catharsis spiral"](../03-theory/015b-catharsis-spiral.md); [§4.3b](../01-introduction/004-basic-principles.md)
**Related:** Q-ELE-003, Q-GAM-003

**Answer.** §13 examines the mechanism within the standard apparatus and finds no
internal contradiction. The "runaway" scenario in which this question was posed in the first
edition — exit grows → the weight of the remaining grows → the gain from participation grows →
some return → oscillation instead of equilibrium — describes not a breakdown but **the mechanism's
normal operation**.

The architect's correction (21 September 2026): "the authorities will never be ideal, and there
will always be sleepers and then an awakening. Under AB-EXIT there is always a balance: either
aggrieved and took it, or indifferent and took the money, or aggrieved and voting. And so it swings
forever, without an ideal, as in nature." The demand "prove the oscillations damp out" assumes
that the goal is rest. The goal is a working feedback loop: **a damped thermostat is a thermostat
that has stopped responding.** A collapse of the mechanism would look different — as the
disappearance of one of the poles (nobody takes the sum, or nobody votes), not as oscillation between them.

Three structural limiters of amplitude are described in §15b.6d: the insensitive share
(the indifferent take the sum under any government and do not respond to a campaign — §4.3b),
the floating rate (D = M × 1.5 × K falls with the median, so as the economy worsens the payment
does not become relatively more attractive) and the moving equilibrium point (the bar of demands
rises — the trajectory is a spiral, not a circle, §15b.6b).

**Weak point of the answer.** A formal analysis of the dynamics across cycles is still absent,
and remains desirable — not to prove damping but to estimate **amplitude** and **period**: it is
unknown how much life must worsen for those who returned to take the sum again (§15b.6b).
The practical price of the oscillation is named there too: a lag of one cycle — a bad government
gets to serve out its term. Measured by a pilot.

---

### Q-GAM-003 · Can the median be manipulated to raise or crash the payment?

**Status:** 🟡 open
**Who asks:** economists, mechanism-design specialists
**Source in the book:** [§2](../01-introduction/002-protection.md) — protection of the data source
**Related:** Q-GAM-001, Q-ECO-002

**Answer.** The choice of W-2 via the SSA makes administrative manipulation of the source difficult
(see Q-ECO-002). But the question of manipulating **the median itself** — through tax policy,
the structure of employment or mass behaviour — has not been examined.

**Weak point of the answer.** The median is more robust than the mean, and that is good. But it is not
invulnerable: a policy that shifts the structure of formal employment shifts it too. The attack
is expensive and slow, but it formally exists. **A section is needed.**

---

### Q-GAM-004 · Why exactly 1.5 % and K = 1 %, and not other numbers?

**Status:** 🔁 contested
**Who asks:** academics, meticulous readers
**Source in the book:** [§1](../01-introduction/001-formula.md), [§2](../01-introduction/002-protection.md), [§3 "Rejected variants"](../01-introduction/003-rejected-variants.md)
**Related:** Q-ECO-001

**Answer.** §3 shows which variants of the formula were considered and why they were discarded,
and §2 explains the meaning of the household multiplier 1.5 and the coefficient K = 1 %. The logic:
the sum must be noticeable, but not so large as to become an offer that cannot be refused.

**Weak point of the answer.** "Noticeable but not decisive" is a qualitative criterion,
and the specific numbers are calibrated for the US. The threshold at which the incentive becomes
coercive (Q-ETH-004) is computed nowhere — so it cannot be shown that 1.5 % lies below it.
The final values are set by referendum in any case, but the opening proposal needs better grounding.

---

### Q-GAM-005 · You call the protocol incentive-compatible. Where is the theorem?

**Status:** ✅ answered
**Who asks:** academics, referees
**Source in the book:** [013f "A Formal Statement"](../03-theory/013f-formal-statement.md)
**Related:** Q-GAM-001, Q-GAM-002, Q-GAM-006

**Answer.** The word was imprecise: for Myerson it is a property of a mechanism with messages, while in the protocol nobody reports anything — the type shows in the act. Five statements are proved: "nothing" is dominated at any positive sum; the thermostat equilibrium exists and is unique (a fixed point of a decreasing map); exactly those with a stake above the threshold vote, and the exit share rises with the sum with damping; a stakeless person's vote cannot be bought for less than the sum; a group above the size threshold dissolves into individuals. Two assumptions: an impulse is not a stake, and money is worth the same to everyone (removed by replacing the stake with the stake in one's own money). The stake is defined as everything for which a person is willing to forgo the sum — the motive does not matter, the willingness to pay does.

**Weak point of the answer.** Uniqueness rests on the threshold depending on the exit share only through the weight of the vote; under herding there may be several points — the first thing a referee will check, and only a pilot can answer.

---

### Q-GAM-006 · Feddersen and Pesendorfer proved that it pays the uninformed to abstain. Why pay, then?

**Status:** ✅ answered
**Who asks:** economists, voting theorists
**Source in the book:** [013f §1b](../03-theory/013f-formal-statement.md)
**Related:** Q-GAM-005, Q-ELE-002

**Answer.** Their theorem is the direct predecessor: the departure of the uninformed improves the decision. But their equilibrium does not arrive in life: a person does not consider himself uninformed, and he is brought in; he does not feel the gain of staying home. The protocol makes it tangible — as money. And the protocol's criterion is wider: theirs removes the uninformed, ours whoever has no horizon. The button at the election is a test of the horizon by an act: money now or influence on what comes later. Knowledge enters the stake as a component, not as a condition: whoever has a horizon and does not know stays and, having stayed, finds out, because he paid for his ticket.

**Weak point of the answer.** The claim "whoever stays will find out" rests on accuracy-incentive experiments and on those mobilised by an incentive; there is no direct measurement for those self-selected by stake.

---
