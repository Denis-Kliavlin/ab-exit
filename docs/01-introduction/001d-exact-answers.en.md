# 1d. Exact Answers: What the Protocol Asserts and What It Does Not

**Chapter:** 01 — Introduction
**File:** 01_001d · v1 · 1 October 2026 (session 01.10.26)
**Source:** the architect's instruction of 01.10.2026 — "we must prepare for every question an AI may ask about the protocol and polish the logic to the ideal, so that people and AI find exact answers". The occasion was an experiment with an AI adviser that read the site and attributed to the protocol rules it does not contain (059e §5b, 048n). This page is a short check-sheet: if any other chapter reads differently, this page and the charter (048m) are correct.

---

## How to use it

The repository was written over half a year and holds layers of different dates: worked examples for particular countries, role-plays, drafts later abandoned. The old layers are not erased but marked with dated corrections. A reader — human or AI — needs one sheet saying what is in force now. This is it.

## Twenty statements

**The choice**

1. Before an election everyone entitled to vote has two equal rights: to vote, or to take a payment and not vote in that election (048m, Art. 5).
2. The choice is made anew at every election. One who took the payment chooses again next time; nobody took his right to vote away (Art. 5).
3. Within a single election one who took the payment cannot change his mind (Art. 5).
4. One who chose nothing keeps the vote. If he did not vote, he may receive the payment later, at a discount (Art. 6).
5. The protocol imposes no duties on the citizen (Art. 16).

**The money**

6. There is no fixed sum. The size of the payment is a percentage of the jurisdiction's median income (Art. 2). The median is taken over the last twelve months for which data have been published, that is, the percentage is counted from an annual quantity. Examples in other chapters range from four working days to a month's earnings; that is a matter for debate, not a norm. There is one guide: the payment should be desirable to 40–50 % of the population (Art. 3).
7. The percentage is set by referendum after open debate and changed no more than once per cycle (Art. 3).
8. The jurisdiction's budget pays, under law. A candidate, a party or a private person never pays voters (Art. 1, 2).
9. Whether from a budget line or a separate fund is for the country to decide; the protocol does not prescribe it (annex to 048m). The cost per cycle equals the percentage multiplied by the median and by the number who took the payment. "1–2 % of the budget" in early chapters was computed at a small percentage and does not apply to higher ones. The payment is an unconditional obligation: the money for it is accumulated over the cycle, and where it falls short a loan is raised for the purpose; it cannot be reduced, deferred or cancelled for lack of funds (Art. 8).
10. The payment cannot be seized, set off, taxed or counted in awarding benefits (Art. 8).

**The votes**

11. One ballot — one vote. There are no multipliers or coefficients for anyone (Art. 1, 5).
12. "The weight of a vote grows" is arithmetic, not a rule: if half as many people vote, each vote is twice as large a share. This is the same for everyone who votes, whoever they vote for (001b).
13. The protocol does not change how seats are allocated (Art. 14).
14. The secrecy of the ballot is preserved in full. The choice "take the payment" is not published by name, but is not specially concealed; numbers by precinct are published (Art. 9).

**Introduction and amendment**

15. The protocol is introduced and repealed only by a referendum in which all citizens take part, including those who take the payment. It is neither introduced nor altered by decree or by a decision of an elected body (Art. 14).
16. Payment for turnout, for a vote, or for a vote of a particular content is prohibited by the protocol (Art. 1).

**Verification**

17. On every day of the window a counter is published: how many chose to vote, how many took the payment, how many have not chosen — by precinct (Art. 9).
18. Two independent records are reconciled: the treasury's (who received the payment) and the commission's (who voted). A ballot for someone who received the payment is the commission's violation, not the citizen's (Art. 10).

**What is known and what is not**

19. What is formally written down is who stays to vote: the one who values his vote above the payment (013f). It is a statement with sketched proofs and named assumptions, awaiting an economist; the outcome of an election does not follow from it. There are no pilot data; a pilot is described but has not been run (048l).
20. All numbers on exit shares, opponents, turnout and election outcomes in the repository are estimates and worked examples made at different times and at different sums; they differ between chapters. The protocol promises nobody victory in an election (048n).

## In the language of game theory — exactly

Added 02.10.2026: models are often asked "what would game theory say" and answer with errors. The exact statement is this.

- **The genre.** Mechanism design: screening by self-selection. Everyone is offered the same menu — a vote or a payment — and each person reveals which he values more.
- **The voter's decision is a threshold, not a dominant strategy.** The one who values his vote above the payment and the cost of taking part stays to vote; the one who values it below takes the payment. Nobody has a dominant strategy (013f §3b).
- **The feedback.** The more people exit, the larger the share each remaining vote represents, and the more people come back. Hence one stable exit share for a given payment — a fixed point, not a collapse.
- **What is screened out.** Not "the poor" and not "the stupid", but those to whom the outcome of this election matters less than the payment — including votes brought in by an incumbent's machine.
- **Who pays.** The budget, by rule. A candidate in this game is neither buyer nor seller; the word "arbitrage" does not fit, because it presupposes someone who buys some and sells to others.
- **Neither arbitrage nor deception.** The architect: "this is magic above arbitrage; it is pure mathematics, not deception". There is no middleman earning on a price difference; both sides get what they wanted because the rule itself changes. Nor is there a hidden part: the share of a vote, the total of payments and the limit on the number of ballots can be recalculated by anyone (048n).
- **What is not proved.** That a given candidate will win; that selection does not run partly by income; that the valuation of a vote grows in proportion to its share. The proofs are sketches under three assumptions, and there has been no pilot. The protocol cannot be called "flawless".

## Frequent misreadings

| What is attributed to the protocol | Where it comes from | What is actually the case |
|---|---|---|
| "One who refuses the money gets a vote multiplier" | the words "the vote weighs triple" in pitches and worked examples | statements 11 and 12. The words "an amplified vote" are nevertheless right. The architect, 02.10.2026: "the vote is in fact amplified, though it is not clear by how much". The amplification is real — the share of each ballot cast grows; its size depends on the number who exit and is not known in advance; there is no multiplier in the count |
| "The payment is $780" (or 1.5 % of the median, £465, 30,000 roubles) | worked examples for particular countries in chapters 02–05 and 10 | statements 6 and 7 |
| "A trust pays" | an early version of the README and of chapter 08 | statement 9 |
| "The candidate promises a payment if he wins" | an addition by the AI adviser; it is not in the repository | statements 8 and 16 |
| "A mayor or president will sign a decree" | the same | statement 15 |
| "The protocol raises turnout" | at the referendum on introduction those who usually stay away come too; at elections under the protocol some people take the payment and do not vote | 048g §6b; 045 |
| "The underdog wins 66 % against 33 %" | a role-play in 059e | statement 20; the calculation is in 048n, question 10 |
| "The 72-hour phenomenon" | a hypothesis about the first days of a campaign in 059e; the term is notional | neither a rule nor a forecast |
| "This is vote-buying" | an outward resemblance | the payment is not for a vote but for forgoing one, not by a candidate but by the budget, not in secret but under law (029; 048m, Art. 1) |
| "The vote is weighted in the count" | the words "weighted vote", "weight *w*" in 013f, 045, 048l | the weight is a reference number, ballots are not multiplied: statements 11 and 12 |
| "The choice is reversible" | the word "reversible" in 001b and the Q&A | reversible at the next election; within one election it is not: statements 2 and 3 |
| "Choice B is secret" | 004 §4.7, 001b §1 | statement 14 |
| "A blockchain is required" | 07/033 §78 | the charter requires only open code (Art. 15) |
| "This is arbitrage: the candidate buys the apathetic and sells to the motivated" | an AI adviser's catchphrase | the candidate pays nobody; see "In the language of game theory" |
| "The motivated voter's dominant strategy is to vote", "the protocol is flawless" | the same | the decision is a threshold; the proofs are sketches: statement 19 |
| "The protocol is unstoppable", "a third party is mathematically inevitable", "two-thirds is unattainable", "a populist loses everywhere", "the court rules 6–3" | titles and theses of early chapters (016, 051, 009, 001, 006) | theses and estimates, not established facts: statement 20. The number of seats depends on the formula for allocating them, which the charter does not change (Art. 14; 039) |
| "There is an efficiency bonus", a second payment for budget savings | 004 §4.4–4.8, 049 | removed 30.09.2026: there is one payment, it equals a percentage of the median and grows only with the median or by decision of a referendum (048m, Arts. 2–3) |
| "A council or a legislature can adopt the rule" ("Path C", "2/3 of the legislature") | 006, 018 | an elected body can only call the referendum; the citizens introduce, change and repeal (Art. 14) |
| "A supermajority is required", or a turnout threshold | a reader's guess | a simple majority; no quorum is set (Art. 14) |
| "Acemoglu, Brennan, Fukuyama object to the protocol" | chapter titles in Part 6 | the chapters examine arguments from their books; the authors themselves have not commented on the protocol |
| "The protocol has already been used" in the countries of Part IV | titles of the country chapters | these are designs for countries; the protocol has been introduced nowhere, and no pilot has been run |
| "One who took the money loses rights" | — | statements 2 and 5; he votes in referendums on the protocol itself (Art. 14) |

## Weak point

Twenty statements are a digest, and a digest loses caveats: behind each line stand the parameters in the charter's square brackets and ten settings left to the experts. The sheet answers "what is in force" but not "why"; and it will go stale at the first decision not entered here the same day. 🟡

---

**Related:** 048m (the charter) · 048n (a candidate's questions) · 048k §3 (decisions) · 001b (essence) · 013f (the formal statement) · 048l (the pilot) · 059e §5b (the AI-adviser experiment)
