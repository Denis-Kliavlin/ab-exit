# A Formal Statement: Four Theorems and Two Assumptions

**Chapter:** 03 — Theoretical Foundations (paired with §13)
**File:** 03_013f · v1 · 30 September 2026 (session 29.09.26)
**Source:** the architect's question "how is it to be proved?" on a row of the 006b table: "Vickrey and Myerson have a proven theorem; we have a statement in words". Closes gap 2 of the roadmap (006b §5) in the part that can be closed without a referee.

---

## 1. What exactly is to be proved

§13 calls the protocol *incentive-compatible*. In Myerson that is a property of a mechanism with **messages**: the agent reports his type, and the truth is the best reply. In the protocol nobody reports anything: a person makes a choice, and the type shows in the act. That is a different class — a self-selection mechanism — and what needs proving is not the revelation principle but four statements, each simpler and each rigorous.

## 1b. The predecessor: the theorem of profitable abstention

The nearest proven result is Feddersen and Pesendorfer, "The Swing Voter's Curse" (American Economic Review, 1996). A voter who does not know which of two candidates is better affects the outcome only when the others are split evenly; but then his random vote cancels, with probability one half, the vote of someone who knew. So it pays him to abstain and hand the decision to the informed — even at zero cost of going to the polls — and the outcome is better than under universal voting. The departure of the uninformed improves the decision: for them it is a theorem, not an assumption.

What they lack. In life their equilibrium does not arrive: the uninformed vote anyway — a person does not consider himself uninformed, and he is brought in. The theorem says it pays him to stay home, but he does not feel that gain; the protocol makes it tangible — as money on the account. And the protocol's criterion is different and wider: their voter leaves because he does not know; ours because he has no horizon (§2, the definition of the stake). Knowledge enters the stake as one component, not as a condition: a person may know and have no horizon — then he leaves; he may have a horizon and not know — then he stays and, having stayed, finds out (BJPS: the mobilised acquire information when participation is worth it). Theorems 2–4 are their result carried over from being informed to willingness to pay, and supplied with the price at which it is realised.

## 2. The setting

There are N citizens. Each knows privately:

- *v* — the stake: everything for which he is willing to forgo the payment in this cycle, in money — influence on the outcome, taxes that threaten him or are promised to him, the wish to be among the voters. The motive does not matter; the willingness to pay does (040l §3); in substance it is the future a person takes into account: for whoever "later" does not exist the stake is small and he takes the sum; whoever has a horizon does not. The architect: "that is exactly why he takes the money at the election; and if there is a horizon, he does not" (019g §8). The button is a test of the horizon by an act;
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

**Theorem 5 — the group-size threshold.** Let a group of *N* members receive on winning a collective benefit *B*, shared equally, and vote as a bloc with a chance π of deciding the outcome. A member stays to vote if *(B/N)·w·π* > *D + c*, that is, if *N* < *N\** = *B·w·π/(D + c)*. Groups above the threshold dissolve into individuals, each of whom takes the sum; groups below it hold.

*Proof.* Directly from the comparison of utilities in §2 with the personal stake *v* replaced by the share of the collective benefit *B/N* multiplied by π. ∎

Two corollaries. First: the big machines dissolve first — in a union of a hundred thousand each member's share is negligible, the gain accrues to all regardless of his vote, while the sum is his alone (015c §7b, Olson's reversal). Second: the threshold falls as *D* rises — the higher the percentage, the more groups dissolve. A boundary of the theorem, not its price: a small group with a large share and a high π — a parish in a district of five hundred — remains, as it remains today; the protocol has nothing to do with it, and the others receive the sum and the right to return next cycle (015c §7b: "if the rest are content, what is bad about it"). And the small group has a problem of its own — it is small: in isolation it cannot build a factory or a large store, and in a large city it is insignificant; it can capture only what is not worth capturing. Fanatics are a problem of society in general, not of elections and not of the protocol.

## 4. Two assumptions

The theorems hold under two conditions, and their place is in the statement, like zero transaction costs in Coase.

**Assumption 1 — an impulse is not a stake.** The model sorts by *v*. The claim "the apathetic and the impulsive leave" requires that the impulsive and the frightened have no stake in the outcome, only an induced state. This is an empirical condition, not a theorem; the evidence is Brexit 49 % against 69 % (001b §3) and "I am fine, the country is not" in the KAS survey (055c §6.2).

**Assumption 2 — money is worth the same to everyone.** In §2 the utility of money is linear. To a poor person a rouble is dearer; the repository's simulator accounts for this with a hyperbola over the remainder (055c §6.3b). In the rigorous model *v* is replaced by *v/u′(m)* — the stake in the person's own money — and theorems 2–4 survive that replacement.

## 4b. Rules rather than discretion: a map onto Kydland and Prescott

Kydland and Prescott (1977) showed that a power deciding afresh each period loses to a power bound by a rule, even if it is clever and well-meaning — because people foresee the temptation to depart from the promise, and the promise stops working. They have three parts; the protocol has all three and two more.

| In Kydland and Prescott | In the protocol |
|---|---|
| The temptation to depart once people have believed | the pre-election handout, the promise without a price (029.4b, 029.10) |
| A rule that cannot be changed in the current period | the formula in the law; the percentage only by referendum and no more than once per cycle (048k §3) |
| An observable quantity | the median and the number on everyone's account |
| **Memory** — for them rational expectations, that is, people who remember and calculate; in life 47 % of promises unkept without consequences (029.10) | **built into the rule:** the number on the account with its trend and the comparison with the neighbours (049) remembers for the voter; the audit is not the power's report on itself but a sum it cannot rewrite. The architect: "a promise is disbelieved only if the voters do not remember it; after AB-EXIT the number remembers — that is the disease 'before': with antibiotics in every pharmacy there is no sepsis from a scratch". And a second, active memory: "the active also simply remember the words, listen to the underdogs at the next election and review the past campaigns — they can, and it interests them, because they paid 700 dollars for it; this is a film they will watch to the end, and very attentively". The price of the vote is the price of attention: a free vote is not worth remembering, one bought by forgoing the sum is (§1b: those mobilised by an incentive acquire information themselves) |
| **Punishment** — for them external, through expectations | built in: depart — inflation a cycle later — the median down — the payment down for the very clientele (039), and the vote of the deceived weighs three times more |

The gain from tying one's hands, in their sense, is the list of policies impossible today not for lack of willing politicians but because they cannot be believed: pension reform (burdening the present for the unborn), opening construction (the owners decide), reducing debt (the voter does not care). All three become possible not because a good politician arrives but because a voter with a horizon can be trusted and a number cannot be lied to. The illustration is 023c §7: Australia's rent tax (discretion) was rewritten in six weeks and repealed in four years; a payment by formula (a rule) is repealed only by a majority voting against its own money, 7–12 % for rollback (048g).

**Long projects survive a change of power, and the names remain.** The architect: "a new power will close the projects that are really not needed, and will carry on and try to finish the good ones; the average tenure of a power is 2×4 — eight years, and that is enough for 95 % of important and even long projects; and if the new power took a project over from the old one, that is 2×4 + 2×4 — sixteen years, and the new power will most likely finish the important project and take all the glory. The remembering voter will cover with shame the name of the power that made the inflation and under which the payment was small, and everyone will know it." Today a successor closes the predecessor's work on principle, because finishing it hands the glory to whoever began, and the voter does not remember who began. After the protocol the number counts the result, not the authorship: finished — the median and the payment rose under him, the glory is his; closed a good one — they did not rise, and that is visible; closed a useless one — a budget line was freed, and that too is visible. Finishing pays better than breaking. And the payment comes with a history — under whom it rose, under whom it fell: a public ledger of governments by name that cannot be rewritten; shame and glory acquire an address. This is also the boundary of discretion: the budget and the projects remain with the power, because discretion is now judged by result and by name.

## 5. The task for an economist

A 10–15-page note in mechanism theory: the primitives of §2; theorems 1–4 with full proofs; comparative statics in *D*, *c* and the shape of *F*; the extension to assumption 2; a check against the simulator (`simulation/referendum-lab/model.mjs` — a logit version of the same model). A referee should be given not "we are incentive-compatible" but "here is the fixed point, here are the conditions, refute them".

## 6. Weak point

Uniqueness in theorem 2 rests on the threshold depending on β only through the weight of the vote. If people's stakes depend on how many others have left — herding, "everyone is taking it, so will I" — the map stops being monotone, and there may be several equilibria. This is the first thing a referee will check, and the model has no answer to it: a measurement in a pilot is needed. 🟡

---

**Related:** §13 (game theory, mechanism design) · 13.9 (the thermostat) · 013c (the referendum game) · 013d (Bayes) · 001c §3 (the main fork) · 019d (the market price of a vote) · 029.4b (the autocrat already pays) · 055c §6.3b (the simulator's formula) · 006b (the roadmap, gap 2)
