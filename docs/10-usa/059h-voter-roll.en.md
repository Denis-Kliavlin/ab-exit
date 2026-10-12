# USA: the Voter Roll — the Real Problem in Numbers and How the Protocol Solves It

**Chapter:** 10 — Case: USA
**File:** 10_059h · v1 · 12 October 2026
**Source:** the architect's decision of 12 October 2026: "the real problem with the US roll and how the protocol could solve it exactly and quite realistically must be in the repo — it is the right comparison for demonstrating the protocol". The architect's move is in 059g item 2 ("the scandal will run the other way"); here — the problem in numbers, the mechanism for each defect, and what remains. Numbers are from the sources below; estimates are marked 🟡.

---

*How to read. The voter roll is where the protocol solves someone else's problem without setting itself the task: a rule about the price of non-participation says not a word about lists, and the list becomes accurate because of it. This is a demonstration of the mechanism, not a promise: every item in §3 is deduced from the charter and is tested by the very first cycle.*

## 1. The problem in numbers

| Defect | Number | Source |
|---|---|---|
| eligible but not registered | 73.6 % of citizens of voting age registered in 2024 → ≈ 62 million not on the roll | Census CPS 2024 |
| invalid or significantly inaccurate records | ≈ 24 million, one in eight | Pew, 2012 |
| deceased on the roll | > 1.8 million | Pew, 2012 |
| registered in more than one state | ≈ 2.75 million | Pew, 2012 |
| wrong addresses | ≈ 12 million | Pew, 2012 |
| removed from rolls between the 2020 and 2022 elections | > 19 million, 8.5 % of all registered; 21 % more than in 2014–2016 | EAC via Brennan Center and Dēmos |
| interstate cross-check (ERIC) | eight to nine states left in 2022–2023 on partisan grounds; states without ERIC had no replacement for months | Brennan Center, Votebeat |
| the federal SAVE database, 2026 | 65 million checked in 26 states, 28,635 flagged as "potential noncitizens"; Texas: 2,724 flagged, ≈ 600 turned out to be citizens; Travis County — error 10–21 % | NPR, Votebeat (059g item 2) |
| the federal centre against the states | the Justice Department is suing more than 25 states for their rolls; the March 2026 order on a list of citizens was voided by a court in sections 2–3 | Brennan Center (059g item 2) |

Summary: a quarter of the eligible are outside the list, one record in eight inside it is inaccurate, 8.5 % of records are removed in two years, and no side trusts the other's cross-check.

## 2. Why nobody fixes it

**The record has no owner.** A bank account is accurate because its owner checks it — every month, with money at stake. A roll record has no owner: it costs the voter nothing until he comes to the polls, and even then an error costs him one day. The roll's accuracy is nobody's personal business.

**Accuracy is partisan.** "A clean roll" is one party's slogan (strike off), "a broad roll" the other's (enter); any cross-check is suspected of working for the opponent, and ERIC — the only interstate cross-check that worked — fell apart exactly along that line. The federal attempt (SAVE, the order) is read by the states as a takeover, and the courts side with the states.

**Cleaning is costly to the cleaner and free to the cleaned.** The NVRA bans systematic removals within 90 days of an election but creates nobody's interest in accuracy between elections; a wrongful removal costs the state nothing but a rare lawsuit.

## 3. What the protocol changes — defect by defect

One rule: the payment goes to everyone on the roll who chose B, automatically (048m Art. 4); the precinct balance is public (Art. 10); names are not published (Art. 9 part 3). Hence, row by row of the table in §1:

| Defect | Today | Under the protocol |
|---|---|---|
| 62 million not on the roll | nobody needs them except the parties before an election | registration is $840 🟡 per cycle; the unregistered goes to the roll himself; the first registration wave is the largest in history, and free for the state |
| 24 million inaccurate records | nobody checks his own line | every record acquires an owner with money at stake: a wrong address or name means no payment, and the owner corrects the record himself — **a self-checking roll** |
| 1.8 million deceased | tolerated: handy for stuffing, costly to clean | the state pays for each — 1.8 million × $840 ≈ $1.5 billion per cycle 🟡 — and for the first time wants them gone; choice B is an act of a living person with identity verification, the dead do not perform it, and an unclaimed payment flags the record by itself |
| 2.75 million in two states | nobody cross-checks, ERIC fell apart | a payment in two states is a double spend across treasuries, visible by tax number; the person chooses one state himself, because the second is a criminal offence (Art. 5 part 3, Art. 11); interstate cross-checking is revived by money, not trust |
| 12 million wrong addresses | mail does not arrive, nobody notices | the payment needs an account or address — the owner updates it himself |
| 19 million removed in two years | the removed finds out at the polls; a lawsuit is rare | the removed is a plaintiff with a loss of $840 and a date; the precinct balance shows the hole on payment day, not after years; a wrongful removal costs the state for the first time |
| 28,635 "potential noncitizens", 600 errors | an ideological dispute about suppression | a monetary dispute: each wrongful entry costs the budget $840, citizenship verification becomes the taxpayer's demand; each wrongly flagged citizen is a plaintiff for $840; verification happens when the payment is claimed, not when voting, and deprives nobody of the vote |
| accuracy is partisan | the two parties want different lists | "those who stay" as taxpayers do not want to pay the ineligible, "the takers" do not want to be struck off — for the first time both sides want one list from different ends |
| the centre against the states | who compiles the list is a question of power | the list belongs to the jurisdiction that pays; the counter is public; no federal list is needed, because each state cross-checks its own with money |

**The mechanism in one word — an owner.** The protocol does not clean the roll: it gives every record an owner with a personal interest, and the state a price for every superfluous line. Accuracy becomes what it is for a bank account: a consequence of both sides counting their money. Today the dispute about the roll is about who is struck off; under the protocol it is about who was not entered (059g item 2), and from a battlefield it becomes a queue at the entrance.

## 4. The numbers as an incentive

| What | Calculation 🟡 | Meaning |
|---|---|---|
| the cost of inaccurate records to the states | 24 million × $840 ≈ $20 billion per cycle | a reason to clean that never existed |
| the cost of the deceased | 1.8 million × $840 ≈ $1.5 billion | a reason to remove dead souls — the government's own |
| the cost of duplicate records | 2.75 million × $840 ≈ $2.3 billion | a reason to revive interstate cross-checking |
| the cost of a wrongful removal | $840 per person, with a date | a lawsuit over a loss instead of a lawsuit over a right |

## 5. Comparison with the 2026 executive order

| | The March 2026 order | The protocol |
|---|---|---|
| who compiles the list | the federal centre — about citizens | each citizen — about himself |
| instrument of enforcement | the mail withholds the ballot from anyone not on the list | money arrives or does not |
| who checks the errors | the same one who compiled it | the one the error deprives of the payment |
| fate | sections 2–3 void, 23 states against | introduced by a state referendum, without the federal centre |
| result | 600 wrongly flagged citizens in Texas alone | 600 lawsuits for $840 — and correction within a month |

## 6. What remains

- **Identity without documents.** The payment needs an account and proof of identity; the homeless and those without ID remain outside the roll, as today — the protocol creates no documents for them. This is a threshold of selection by access to an account (040p §1 in another form), which the pilot will measure.
- **The state's knowledge.** Names are not published (Art. 9 part 3), but the treasury knows who took — as the state knows today who is registered; the protocol creates no more knowledge than exists, nor less.
- **Theft of the payment.** Someone else's payment on someone else's record is the same risk as with any benefit; the protection is the double spend on the commission and the token (048m Art. 5 part 3, Art. 15 part 4), and every theft leaves a trace in money, not in a ballot.
- **A referendum on the rule without B** — the precinct balance does not extend to it; a candidate for the sixteenth decision (048k §3).
- **The first wave.** 62 million registrations in one cycle — a load on the state's apparatus that never existed; cheaper than any cleaning, but not free in time.

## Weak point

Pew's numbers are from 2012 and are estimates; the EAC and Census figures are newer but count different things (citizens of voting age versus the eligible). Everything in §3 is a deduction from the charter, not a measurement: that a person will correct his record for $840 follows from his correcting a bank account for less, but the share who will not come even for money is unknown until the pilot. And the protocol solves the roll problem in the jurisdiction that adopted it — interstate cross-checking "by money" requires both states to pay, otherwise a duplicate record stays invisible from one side.

---

**Related:** [059g item 2](059g-midterms-2026-missouri-scenario.md) · [1i](../01-introduction/001i-consequences.md) · [048m Arts. 4, 5, 9, 10, 11](../08-implementation/048m-charter.md) · [048k §3](../08-implementation/048k-charter-inventory.md) · [040p §1](../06-critique-arsenal/040p-how-to-refute.md) · [048f](../08-implementation/048f-double-entry-elections.md)

**Sources:** [Pew, 2012: one in eight records inaccurate, 51 million unregistered](https://www.pewtrusts.org/en/about/news-room/press-releases/2012/02/14/pew-one-in-eight-voter-registrations-inaccurate-51-million-citizens-unregistered) · [Brennan Center: purges, 19 million in 2020–2022](https://www.brennancenter.org/topics/voting-elections/vote-suppression/voter-purges) · [Brennan Center: states leaving ERIC](https://brennancenter.org/our-work/analysis-opinion/states-cave-conspiracy-theories-and-leave-voter-data-cooperative-eric) · [Route Fifty: states after ERIC](https://route-fifty.com/management/2023/12/documents-show-republican-led-states-struggling-clean-voter-rolls-after-leaving-eric/392802) · [registration 2024, 73.6 %](https://factually.co/fact-checks/politics/number-eligible-us-citizens-not-registered-to-vote-7a176f) · [NPR: the Supreme Court and SAVE, 25 Sep 2026](https://www.npr.org/2026/09/25/nx-s1-5976804/supreme-court-trump-save-noncitizen-voting) · [Votebeat: Texas and SAVE](https://www.votebeat.org/texas/2026/07/30/save-potential-noncitizens-gave-proof-of-citizenship-to-dps/) · [Brennan Center: the ruling on the order, 25 Jun 2026](https://www.brennancenter.org/our-work/analysis-opinion/voting-rights-groups-applaud-ruling-declaring-2026-executive-order)
