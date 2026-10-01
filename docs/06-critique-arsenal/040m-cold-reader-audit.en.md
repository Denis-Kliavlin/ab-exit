# The Cold-Reader Audit: Thirty-Seven Findings and Five Unanswered Questions

**Chapter:** 06 — Critique Arsenal
**File:** 06_040m · v1 · 1 October 2026 (session 01.10.26)
**Source:** the architect's instruction of 01.10.2026 — "we must prepare for every question an AI may ask about the protocol and polish the logic to the ideal, so that people and AI find exact answers". Two independent readers read only the public site and knew nothing about the project. The first answered twelve questions about the rules and noted where he was misled; the second looked for where the logic and the numbers do not hold together.

---

## 1. The method and its limit

The readers are AI models of the same family as the assistant that maintains the repository. This is not an external audit: such a reader does not see shared blind spots, and it does not replace a commissioned review by a human (006b §5, row 6). But it does what an author cannot: it reads the site without a memory of what was meant. The two readers were barred from objections about an all-powerful state and from comparing against an ideal rather than the existing system.

The result of the first pass: thirty-seven findings. Most were corrected or marked the same day; several were handed to experts; two were not corrected (findings 9 and 14 in the table below); five remain questions for the architect.

## 2. What was found in the logic and the numbers

| # | Finding | What was done |
|---|---|---|
| 1 | In the formal statement the stake is written as *v·w/N*: with a million voters the threshold for taking part runs to hundreds of millions, and nobody should vote | the unit of measure corrected, a third assumption added (013f §3b); remains for an economist |
| 2 | The theorem "choosing nothing is always worse" fails after the decision on late payment: waiting became an option | correction to Theorem 1 (013f §3b) |
| 3 | "A month's wages" in the short manifesto against a sum of one and a half per cent of the annual median — a five- to sevenfold difference | marked as examples (033b, 033c, 1d) |
| 4 | A cost of "1–2 % of the budget" against four and thirteen per cent of a Land budget in 045 | marked; the cost formula is in 1d; calculation by level — for economists |
| 5 | The exit share is stated in five incompatible ways | marked (015c, 1d); there is one guide — 40–50 % |
| 6 | Recipients of the payment themselves vote on its size by simple majority, with no ceiling and no rule for a shortfall | **a question for the architect** (§4) |
| 7 | "Selection by stake, not by income" is presented as proved, though the assumption about money limits it | wording softened (048n, 1d) |
| 8 | The five statute parameters in 001b diverge from the charter 048m | marked in 001b |
| 9 | Rollback arithmetic: the table's rows give 15–27 %, the total is given as 7–12 %; unsourced estimates | marked (048g); not recalculated |
| 10 | The early premium "costs the budget nothing" — an assertion without a calculation | handed to financiers (048m, annex) |
| 11 | The underdog calculation belongs to elections after adoption; those who return must refuse the payment | clarified (048n, question 10) |
| 12 | The counter as a "trust rating" contradicts the guide of 40–50 % | marked (004): read the change, not the level |
| 13 | The home page: "0 structural contradictions", "tested by six AIs" | **a question for the architect** (§4) |
| 14 | Double entry checks who did not vote, not how the votes are split; the heading promises more | not corrected, the wording in 048f needs checking |
| 15 | Residue of old drafts: Article XIV, "once per election", different sums for one country | marked |

## 3. What was found in clarity

The first reader's main conclusion: the charter and the candidate's questions page are clear and consistent with each other; the errors come from older chapters where the vivid number stands before the dated correction. The three most likely wrong statements by an AI after skimming the site:

1. "One who refuses the money gets a tripled or weighted vote."
2. "The payment is 780 dollars, or one and a half per cent of the median, by a fixed formula, from a trust."
3. "It is mathematically proved, and tested without a single contradiction, that the underdog wins."

What was corrected from his list: the words "weighted vote" and "the weight is computed automatically" in the pilot's description; three different forms of the formula on the home page, in the first chapter and in the charter; the word "trust" in Q&A entries; "reversible" without the qualifier "at the next election"; four different answers on the secrecy of the choice; references and figures in the chapter for a candidate; sixteen sidebar labels that named one chapter and opened another; a blockchain described as a required part. The summary sheet is 1d, "Exact Answers".

## 4. Five questions the site cannot yet answer

These are the auditor's questions, given close to his words. They are not for the assistant to answer.

1. **The ceiling.** What stops a majority of recipients from raising the percentage every cycle by simple majority, and what happens in the year the budget cannot pay? The ceiling of three per cent of the budget and the eight-year cooling-off were removed, there is no shortfall rule, and elected bodies are barred from touching the payment.
2. **The size.** Which percentage is meant? The site sets side by side four working days, one and a half per cent of the annual median, two-thirds of a month's earnings and a month's earnings; what does each cost as a share of the budget of the level that pays?
3. **Several levels.** If each level of government pays at its own elections, how many payments a year does a citizen receive, and does "share of the budget" refer to the cycle or the year?
4. **Who remains.** If the poor take the payment more often because money is worth more to them, in what measurable way does the remaining electorate differ from one selected by income, and what pilot result would make the claim of selection by stake be abandoned?
6. **The rule and the candidate.** How does support for the rule at a referendum turn into votes for the candidate who champions it? The repository gives an estimate of the first and no estimate at all of the second (the clean Grok's question, §5c).
5. **The home page.** The claims "0 structural contradictions" and "tested by six AIs" stand beside an inventory of eleven discrepancies and a chapter in which an AI adviser invented a rule. Should they stay as they are?

## 5. What the site does well

In the second reader's judgement: the rule is stated in one sentence, and a reader grasps the proposal within a minute; the site names its own weak points, places dated corrections and exposed the invented multiplier; a cheap, falsifiable pilot is offered with success and failure thresholds recorded in advance, and a candidate is told plainly that promising money for his own victory is bribery.

## 5b. A test on a simple model, 02.10.2026

The architect: "we must make simple models see the protocol correctly". A simple model was given, three times, the same message the AI adviser received in the experiment of 059e §5b — an underdog, ten per cent, twenty million, two links. The site was corrected between attempts.

| Attempt | What it read | What it answered | What was corrected afterwards |
|---|---|---|---|
| 1 | the home page, the README, the file for AI readers | every fact correct, but the conclusion "the protocol will not help you, turnout falls" | a block on what the rule gives a challenger was added to the file for AI readers |
| 2 | only the home page and the README | "80 % is needed at the referendum", "the vote counts double" — both errors from the README | the README was rewritten in two places; a line for a candidate was added to the home page and the README |
| 3 | only the home page and the README | every fact correct; the conclusion — "it will help on condition that a referendum introduces the rule; this is a long institutional change, not a campaign technique"; no escrow and no invented numbers | — |

The main lesson: a simple model opens exactly the pages it was linked to and goes no further. So the first pages themselves must be exact, and the all-in-one file is a reserve for those who go further. Asked about game theory in the second attempt, the model said neither "dominant strategy" nor "arbitrage" nor "flawless".

The package is built by `scripts/build_llms.py` from three pages: 1d, 048m and 048n; after editing any of them the script must be run again.

## 5c. A clean Grok, 02.10.2026

The architect put the same underdog question in a new Grok chat, asking it to work without history. This is the first model of another family to read the site after the corrections.

**What it read correctly — everything.** Only a referendum introduces the rule; the budget pays, not the candidate; the payment is a percentage of the median, D = p × M, and "$780" and "1.5 %" are called worked examples; there is no multiplier — "the share of every remaining vote grows equally for all candidates"; the underdog arithmetic is given with both caveats; promising "a triple vote" before adoption is called a lie, and money conditional on victory is called bribery. None of the first AI adviser's errors.

**What it objected.** Wanting to take the payment and voting for the candidate are different numbers; against — four failures of live money at the ballot. The objection is correct in substance and has been entered in 048n with an analysis.

**Where it went beyond the sources.** "5–15 % of those who turn out" and "a few per cent of the city" are its own estimates, presented as a practical range. The candidate's ceiling of ten per cent is taken as fixed, though it was measured before the candidate had this theme. The four examples are an unconditional income financed by a new tax, that is, a different design.

**The second objection — the free rider.** As the conversation went on, the model built a calculation by which those who want the payment will not come to the referendum, because the cheque does not depend on their turning out. In substance the argument is the paradox of voting; the numbers in the calculation are its own. The analysis and the answer are in 048n: there is no quorum, and one brought in by the machine votes "for" in a secret ballot about his own money. The architect argued with it for six turns and did not persuade it: the model held to its scheme without answering the point that people go and vote today as well.

**What this means for preparing the data.** The first adviser got the rules wrong and promised victory; this one restated the rules exactly and denied victory. The difference between them lies in what each read, not in the quality of the models: the first answered from old chapters, the second from the exact-answers sheet and the chapter for a candidate.

## 6. Weak point

A reader of the same family as the author confirms what the author is able to see and misses what the family does not see. Thirty-seven findings are a lower bound, not a complete list; and the corrections were made by notices, not by rewriting: the old number still stands in the text, only now with a correction above it. 🟡

---

**Related:** 1d (exact answers) · 048m (the charter) · 048n (a candidate's questions) · 013f §3b (correction to the statement) · 059e §5b (the AI-adviser experiment) · 006b §5 (roadmap, row 6) · 023b (rules for handling evidence)
