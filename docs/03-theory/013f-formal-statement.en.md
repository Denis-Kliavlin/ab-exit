# A Formal Statement: Four Theorems and Two Assumptions

**Chapter:** 03 — Theoretical Foundations (paired with §13)
**File:** 03_013f · v1 · 30 September 2026 (session 29.09.26)
**Source:** the architect's question "how is it to be proved?" on a row of the 006b table: "Vickrey and Myerson have a proven theorem; we have a statement in words". Closes gap 2 of the roadmap (006b §5) in the part that can be closed without a referee.

---

## 1. What exactly is to be proved

§13 calls the protocol *incentive-compatible*. In Myerson that is a property of a mechanism with **messages**: the agent reports his type, and the truth is the best reply. In the protocol nobody reports anything: a person makes a choice, and the type shows in the act. That is a different class — a self-selection mechanism — and what needs proving is not the revelation principle but four statements, each simpler and each rigorous.

## 2. The setting

There are N citizens. Each knows privately:

- *v* — the stake: how much he values influence on this cycle's outcome, in money;
- *c* — the cost of taking part: time, travel, studying the question. For simplicity it is the same for all; a personal *c* makes the threshold personal and changes none of the theorems.

The mechanism offers three actions. **A** — a vote; its weight is *w* = 1/(1 − β), where β is the share who took the sum. **B** — the sum *D*. **Nothing** — zero.

The utility of A: *v·w/N − c*. The utility of B: *D*. That is the whole model.

## 3. Four theorems

**Theorem 1 — the dominated void.** With *D* > 0 the action "nothing" is worse than B for every type.

*Proof.* *D* > 0 for any *v* and *c*. ∎

This is the rigorous form of the main fork in 001c §3: free abstention stops being a choice.

**Theorem 2 — existence and uniqueness of equilibrium.** There is exactly one exit share β\* at which nobody wants to change his action.

*Proof.* A person chooses A if *v·w/N − c* > *D*, that is *v* > *v\**(β) = *N(D + c)*(1 − β). Let *F* be the continuous distribution function of stakes. The exit share must satisfy β = *G*(β), where *G*(β) = *F*(*N(D + c)*(1 − β)). *G* is continuous, maps [0, 1] into [0, 1] and is non-increasing in β, because the threshold falls as β rises. The function *h*(β) = *G*(β) − β is continuous, strictly decreasing, *h*(0) ≥ 0, *h*(1) ≤ 0. By the intermediate value theorem a root exists; by strict monotonicity it is the only one. ∎

This is the thermostat (13.9) as a fixed point: the more have left, the dearer the vote, the more return. The point is an equilibrium of flow, not of rest: from cycle to cycle the distribution of stakes changes and β\* moves with it (055c §6.3b: "there is no equilibrium, the system keeps moving" — true of the trajectory; the theorem speaks of each single cycle).

**Theorem 3 — sorting by a single quantity.** In equilibrium those and only those vote whose *v* > *v\**(β\*). The exit share rises with *D*, but more slowly than it would without the feedback.

*Proof.* The first part is the definition of the threshold. The second: as *D* rises, *G* shifts upward at every β, the root of *h* shifts right, so dβ\*/d*D* > 0. The rise of β\* raises *w* and thereby lowers the threshold, damping part of the effect; the direct effect *F′·N*(1 − β) is divided by 1 + *F′·N(D + c)* > 1. ∎

Neither income nor stated motive nor education enters the threshold — only the stake. This is the architect's position of 26.09.2026 ("the exit rate is counted by the personal stake in the outcome") as a lemma, and the damping is the line "the effect fades, the cost does not" of 055c §6.3b.

**Theorem 4 — a floor on the price of a vote.** For a person for whom going to the polls is not worthwhile by itself (*v·w/N* ≤ *c*) to vote to order, he must be paid no less than *D*.

*Proof.* A bought vote yields *b + v·w/N − c*; refusing the deal yields *D*. The deal pays if *b* ≥ *D + c − v·w/N*. With *v·w/N* ≤ *c* the right-hand side is no less than *D*; for a person with no stake (*v* = 0) it equals *D + c*. ∎

The dividend is a lower bound on the market price of a bought vote (019d). Pre-election handouts (029.4b) are *b*, and they were above *D*: the buyer paid by this theorem without knowing it.

## 4. Two assumptions

The theorems hold under two conditions, and their place is in the statement, like zero transaction costs in Coase.

**Assumption 1 — an impulse is not a stake.** The model sorts by *v*. The claim "the apathetic and the impulsive leave" requires that the impulsive and the frightened have no stake in the outcome, only an induced state. This is an empirical condition, not a theorem; the evidence is Brexit 49 % against 69 % (001b §3) and "I am fine, the country is not" in the KAS survey (055c §6.2).

**Assumption 2 — money is worth the same to everyone.** In §2 the utility of money is linear. To a poor person a rouble is dearer; the repository's simulator accounts for this with a hyperbola over the remainder (055c §6.3b). In the rigorous model *v* is replaced by *v/u′(m)* — the stake in the person's own money — and theorems 2–4 survive that replacement.

## 5. The task for an economist

A 10–15-page note in mechanism theory: the primitives of §2; theorems 1–4 with full proofs; comparative statics in *D*, *c* and the shape of *F*; the extension to assumption 2; a check against the simulator (`simulation/referendum-lab/model.mjs` — a logit version of the same model). A referee should be given not "we are incentive-compatible" but "here is the fixed point, here are the conditions, refute them".

## 6. Weak point

Uniqueness in theorem 2 rests on the threshold depending on β only through the weight of the vote. If people's stakes depend on how many others have left — herding, "everyone is taking it, so will I" — the map stops being monotone, and there may be several equilibria. This is the first thing a referee will check, and the model has no answer to it: a measurement in a pilot is needed. 🟡

---

**Related:** §13 (game theory, mechanism design) · 13.9 (the thermostat) · 013c (the referendum game) · 013d (Bayes) · 001c §3 (the main fork) · 019d (the market price of a vote) · 029.4b (the autocrat already pays) · 055c §6.3b (the simulator's formula) · 006b (the roadmap, gap 2)
