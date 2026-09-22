# Double-Entry Bookkeeping Instead of Observers: Why the Protocol Cannot Be "Painted"

**Chapter:** 08 — Implementation
**File:** 08_048f · v1 · 16 September 2026 (Gemini dialogue, session 15-09-26)
**Source:** an analysis of M. Katz's logic on "the real contents of the ballot boxes" (video with recommendations for the 2026 elections) and the architectural answer; supplements §2 (requirements for the data source), §4 (the public counter), 042 (poison pills), 048b (protection of W-2 data). Here — protection of the *count*, not of the *data*.

---

## 1. Entropy injection

Visa and Mastercard process tens of thousands of cryptographic transactions per second; marketplaces recompute millions of stock balances in fractions of a second. Counting 80 million boolean values is a task a smartphone solves in seconds. Technically the "problem of counting votes" does not exist. What we see — three-day voting, paper ballots, sealed bags, electronic voting without open code — is not a failure but the system's basic architectural defence: **entropy injection**. If elections were made as transparent and instant as a bank transfer, the grey zone into which the required result can be "topped up" at any moment under the pretext of complexity would vanish. The state does not need to know the real vote — it needs a spectacle stretched over time.

## 2. The old opposition's contradiction

Katz utters the classic phrase of the losers: "the system can paint any result, but it matters greatly to it what it finds in the real ballot boxes". Ten seconds later — "the real contents of the boxes will become known to everyone". How? If the system controls both the database (remote e-voting) and the physical processor (the commissions), the contents of the boxes go into the shredder — literally, or informationally, by being overwritten in the final protocol. Three crutches of this argument: hope in observers and photos of primary protocols (subscribers will see them, the masses will see the figure on television); mathematical forensics (the Gaussian bell curve is esoterica for 90 %); the myth that "the system will scare itself" (the apparatus is not a conscientious person but an algorithm of holding power: seeing protest in the box, it ticks "garbage signal, overwrite, bonus for the riot police"). Katz is forced to sell this illusion because an honest "your paper goes to /dev/null" would collapse his audience — and without activity there are no views, donations or career. The boxes in such a system are waste bins for collecting the kinetic energy of the discontented: people spent their day off, vented their emotions, went home; the steam is let off.

You cannot hack a system by playing by the rules of an interface it drew for you itself. The protocol does not recount 80 million pieces of paper — it changes the financial incentive to participate, and the need for the three-day circus falls away: 70 % pressed Cash Out, the remaining 30 % vote through a transparent register in a second, because they no longer need to play hide-and-seek with the state. (The dialogue's wording. By the architect's decision the protocol at its first stage does not touch the existing election mechanism: the secret ballot stays, and the open verifiable vote is a voluntary channel beside it — 048h.2, 048i.1.)

## 3. A change of data type

In the old system a vote is a bit in a state table; `UPDATE votes SET candidate='System' WHERE id=123` executes in a millisecond and nobody in the physical world notices. The protocol protects the count not with "honest observers" but by **changing the data type**: the political signal becomes a financial transaction with double-entry bookkeeping.

**3.1. Audit through an empty wallet.** If a vote is stolen, the person will not know — his life will not change tomorrow. Here the choice of status is tied to bank clearing: to paint itself a majority the state must "move" millions from status B (took the money) to status A (voting loyalists) — but then the payment does not arrive on the card. No independent observer is needed: **the audit is an SMS from the bank.** A stolen "right to choose" provokes a sigh; a promised payment that did not arrive provokes the animal revolt of cheated depositors. The state is in a panic about touching other people's wallets.

**3.2. The budget balance.** An electoral commission can paint 20 million dead souls of turnout because ink is free. Here the voter database is synchronised with the treasury and a hard identity holds: [dividend budget] = [number who chose B] × D. Painting turnout (more A) means the treasury must show a saving, and the people "moved" into A demand their money. Painting abstainers (more B) to steal their payments means an imbalance in the banking system and a treasury deficit; this is no longer an electoral violation with a fine but embezzlement of budget funds on an especially large scale. Any falsification in any direction becomes a cash gap that does not reconcile.

**3.3. Proof-of-Stake instead of Proof-of-Hope.** Traditional elections are a proof of hope: you dropped a paper in and hope they count it. The protocol works like a smart contract requiring no trust in the electoral commission: chose the dividend — the contract executes instantly (money in the account); stayed in A — the vote becomes a public cryptographic token. Since the apathetic mass has left, the remaining core no longer needs the illusion of a secret ballot to protect itself from the boss — the managers vote openly, as at a shareholders' meeting (cf. 033c.4 on publicity of choice). A clarification: this is a possible distant consequence, not a norm of the protocol; at the first stage the existing election mechanism and the secret ballot for those who remain are preserved, and only the A or B status may be public (048h.2).

The upshot: the database administrator can paint anything, but he cannot make the banking system reconcile if millions did not receive their dividends. Elections are taken out of the jurisdiction of political technology (where lying reigns) into the jurisdiction of financial clearing (where mathematics reigns). Falsification turns into bankruptcy.

## 4. When everyone knows the amount: distributed audit

The chance of an unnoticed hack when the amount is public tends to zero, because corruption lives in darkness and silence. Usually budget oversight is the work of a narrow group of experts, journalists, the opposition; experts can be bought, the opposition can be "worn down" with commissions. Here oversight is automatically distributed among millions of recipients, each personally motivated to catch an underpayment; a million people watching their own money can be neither bought nor worn down. The main driver is the poor: an underpayment of 50 units is invisible to the rich; for the poor, at D = 780, it is three weeks of life; the poor voter with a calculator will compute every cent. An attempt to quietly distort the parameters is not an argument with an abstract opposition but a direct war with millions of the poor who will see the discrepancy on the dashboard and feel the theft in their pocket. Theft turns into public robbery in broad daylight.

## 4b. The observer is not abolished but redirected

The section's title is "double entry **instead of** observers", and §3.1 says outright: "no independent observer is needed". The architect's correction:

> "And there is also the effect of mobilising observers. At present they watch sadly as the authorities win almost honestly, and they do not volunteer. Here it will be the other way round."

The correction is right, and it exposes a hole in this section's own argument.

### What double entry closes and what it does not

Clearing protects the **denominator** — how many people exited for the dividend. A person cannot be moved from B to A, because then no payment reaches the card; extra abstainers cannot be drawn in, because the treasury will not balance. That part is solid.

But **clearing does not touch the numerator**. The distribution of votes among those who stayed in A is counted by the same commission in the same way: by the architect's decision the protocol does not alter the existing voting mechanism at the first stage (048h.2, 048i.1). And the September 2026 falsification was of exactly that kind: St Petersburg rewritten from ~20 % to 55 % — a forgery of the **distribution among people who actually voted**, not a forgery of turnout (056f.1).

An uncomfortable conclusion for the section's title: **double entry abolishes the observer on half the task and leaves him alone with the other half.**

### Why on that half he becomes stronger than he was

At present an observer must establish two things at once: how many came and how they voted. Both are contestable, and both must be established by his own means — exit polls, "honest precincts", photographs of protocols. Hence the sadness the correction describes: much labour, and the output is a contestable claim against an incontestable piece of paper.

The protocol hands him the first quantity ready-made and certified **not by the electoral system but by the treasury**. Turnout acquires a **published ceiling**: the roll minus those who exited. The observer no longer has to prove how many came — it is enough to compare two published numbers. The work turns from producing evidence into reconciling it, and anyone can reconcile.

### And second — where the observers themselves come from

The protocol produces an observer corps as a by-product of the choice it imposes. Refusing the dividend is a **costly signal**: a person has named a sum he preferred not to take in exchange for his vote. That is exactly the selection by which observers are recruited, only performed in advance, by the voter himself, and without any organisation.

And for the first time he acquires a **calculable personal loss**. Today a stolen vote costs the observer nothing measurable: he leaves the precinct with a feeling rather than with a sum. After adoption, a person whose vote was rewritten has lost specific money that he declined — and the size of the loss is printed in the statute.

| | Now | After adoption |
|---|---|---|
| what must be proved | turnout and distribution | distribution only |
| who certifies turnout | nobody; a clash of opinions | the treasury and the banks |
| qualification required | training, a day on one's feet | comparing two numbers |
| personal cost of forgery | a feeling | a declined sum, stated in law |
| where the people come from | organisations that can be closed | self-selection by those who refused money |

### What this effect does not give — and that must be said before any conclusions

**First, and decisively.** September 2026 is direct evidence against relying on proof. Observers were present, exit polls existed, the commissions rewrote "as if by a ruler", and no friction arose. The repository has already accepted this against itself: **seeing is not acting** (056f.1). The mobilisation effect changes **the cost and quality of evidence**, not the existence of a consequence, and it must not be recorded otherwise.

**Second: the supply side.** Access to a precinct is granted by the same system. Faced with rising motivation to observe, it will tighten accreditation — the cheapest of all its options, and one already used. A mobilised volunteer and an admitted observer are different quantities.

**Third, and this is a design requirement rather than a caveat.** A turnout ceiling exists only if the register of those who exited is published **by territory and before polling day**, not as an aggregate and not retrospectively. An aggregated or late register gives the observer nothing. The requirement must be written into the charter beside the formula, or the effect does not switch on.

**And the price of that requirement, which we are obliged to name ourselves.** A territorial register of exits is simultaneously **a precise target map for the regime**: it shows where the local bosses failed to hold their people. 048i.6c and 056f.1 already record that electoral results are used as a map for mobilisation and personnel decisions; a territorial register supplies a cleaner instrument than the one now available. The mitigation is partial: exiting is a lawful act, and punishing a territory means punishing the exercise of a right, which runs into the foreman test (23b.2). But it does not prevent a district head being dismissed "for poor work", which is what happens already.

**Weak point.** The effect is derived rather than observed: there is no case in which a paid exit by one group raised the supply of observers from another, and nowhere to look for one — the mechanism has never been introduced. The claim that "they do not volunteer now because the authorities win almost honestly" is the architect's testimony about a motive rather than a measurement; the assistant did not check statistics on observer numbers by year, and Russian survey data are inadmissible here (23b.3). The most vulnerable part is the assumption that refusing money selects the same people who will spend a day at a precinct: these are two different acts with different costs, and the overlap of the groups is plausible but unshown.

## 5. The hack is not through the formula but before and after it

The base dividend D = M × 1.5 × K cannot be hacked: not one variable is controlled by the city (the median comes from the federal database, inflation from an independent bureau, the coefficients are hard-wired in the statute and change only by referendum); any student can multiply three numbers and get the amount to the cent (048b: the four-agency rule, the 10 % rule). The attack zone is the efficiency bonus B = max(0, Plan − Actual) × 30 % / N: (a) an attack on the estimate — an inflated contract to a relative eats the saving before the figure reaches the formula; (b) dead souls in N — an inflated denominator dilutes everyone's payment, the difference accumulates in front accounts. The defence is not software but social: a dashboard to the standard of corporate reporting plus those very "14,000 free auditors" — accountants, engineers, entrepreneurs with an amplified vote who personally lose money from their bonus. The corrupt official must deceive not an algorithm but a crowd of the city's professional investors.

## 6. Weak point of the section

Double entry protects against rigging the *A/B shares* and the *payments*, but not against rigging the *content* of A votes in a system where the core votes through a state register: open voting of the core removes the problem only with a genuinely public register with individual verification of inclusion (057b.3). And the budget identity works only if the treasury and the voter database are genuinely synchronised by law — this is a requirement on the statute (049), not a property of the world. 🟡

---

**Related:** §2 (data source) · §4 (public counter) · 042 (poison pills) · 048b (W-2 protection, the four-agency rule) · 049 (statute) · 056d.2 (Katz: 54 students) · 056e.3 (double-spending) · 033c.4 (publicity) · 057b (Belarus: a verifiable record)
