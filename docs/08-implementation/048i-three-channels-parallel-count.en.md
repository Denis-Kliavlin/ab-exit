# Three Channels and a Parallel Count: Money, an Open Verifiable Vote, a Secret Ballot

**Chapter:** 08 — Implementation
**File:** 08_048i · v1 · 20 September 2026 (the architect's proposal in response to 048h; verified against primary sources)
**Source:** the architect's proposal: "I offer the voter three choices — take the money, vote openly by phone and verifiably, or vote the old way; this hinders nobody but makes elections far more verifiable. I have a vote token in my phone, and together with all my supporters I want to check on an external server how many of us there are in total; this is possible if they all re-submit an anonymous token to my candidate's server. Parallel control is entirely possible." Precedent: the Golos platform, Belarus, August 2020. Cryptographic basis: Chaum's blind signatures. Supplements 048f (double entry) and 048h (secrecy, verifiability, the price of coercion).

---

## 1. The construction

Before an election the citizen has not two but three paths:

| Channel | What happens | What verifies it |
|---|---|---|
| B — take the money | Exit for the cycle, dividend into the account | Bank statement; the budget identity (048f) |
| A-open | A vote by phone; the voter receives a token confirming his choice | The token; a parallel count by supporters (§2) |
| A-secret | A paper ballot in the booth, as now | Nothing beyond today's: observers, protocols |

The key property: nobody loses anything. Whoever needs secrecy votes as now; the objection "secrecy is not a relic" (048h.4) does not touch this construction, because it does not abolish secrecy but adds a voluntary alternative beside it.

## 2. A parallel count by supporters

A voter who chose the open channel voluntarily hands his token to the candidate's server. The server sums. The result is not the full outcome but a **lower bound**: "at this polling station no fewer than N votes were cast for our candidate". If the official protocol shows fewer than N — falsification is proven by arithmetic, without experts, statistics or observers. This is a check in the spirit of the German court's requirement (048h.1), better than any cryptography: anyone can understand "more of us showed ourselves than you counted".

A precedent exists. In Belarus in August 2020 the Golos platform accepted ballot photographs through chat bots: more than 500 thousand photographs were received, the data covered about 23 % of polling stations, and at almost 300 stations the official protocols were below the number of ballots submitted — that is, the forgery was proven by the lower bound. The final report was published on 18 August 2020 together with the Zubr platform and the Honest People initiative. This is exactly the architect's scheme, assembled on the fly and without tokens.

## 3. The exit poll: the third channel already exists

The architect's argument: "if elections are secret, why then do exit polls exist? They are parallel elections, and almost everyone answers in them." An exit poll is a functioning, lawful and familiar precedent of a voluntary parallel count alongside the secret ballot. Checking against the data refines three things.

**How many answer.** In the US, in Edison Research exit polls roughly 40–50 % of those approached agree to take part; in 2004 — 53 %, earlier it was about 60 %. Not "almost everyone", but almost half — and with no benefit to themselves.

**How they answer.** Formally in confidence: the questionnaire is self-completed and dropped into a box. The architect's correction: "everyone sees the person, and psychologically it is NOT anonymous for him — and still he is not afraid". True, and it strengthens the argument: the poll is conducted face to face, at the exit of the polling station, in view of the neighbours; a person stops, takes a tablet or a form and tells a stranger what the law orders to be kept secret. He gains nothing from it. If fear of disclosure were widespread, the share agreeing would tend to zero, yet it has held at about half for decades. The construction of §2 is gentler than an exit poll: the token is actually anonymous, not merely on paper.

**What it can and cannot do.** Ukraine, the 2004 runoff: the exit poll showed 54 to 43 for Yushchenko, the official result 49.46 to 46.61 for Yanukovych; the discrepancy set off the protest, and the Supreme Court annulled the round's results. The exit poll worked as a detector although it had no legal force. Its weakness is single and systemic: it is an *estimate* from a sample, and uneven refusal breaks it. In 2004 the American exit polls overstated the margin for Kerry by 6.5 points because his voters answered more readily (by the organisers' own calculation, 56 % against 50 %); in 2020 the same recurred with Trump's supporters. A parallel count by tokens is free of that disease: it estimates nothing, it gives a lower bound, and a lower bound holds under any skew in who responded. Where an exit poll argues about the sample, a token presents arithmetic.

The reverse is telling too: exit polls are banned where a parallel count is feared — in Singapore for the whole election period.

Two corrections to the external model's conclusions. First: refusing to answer does not imply the person would have taken the money. Everyone an exit poll approaches has already come to vote, that is, by revealed behaviour they are group A; refusal correlates not with apathy but with distrust of the pollsters and with partisanship. Second: that half answer does not imply the rest need no secrecy — quite the opposite, the other half decline even anonymous disclosure. Hence a useful guide for a pilot: the share of the open channel among those who stay is of the order of half, and the secret channel is mandatory.

## 4. Why a token is better than a photograph

A photograph can be forged and can be devalued: photographed, then spoiled the ballot and took a new one. So a photo is weak proof in both directions. A token issued by the electoral system cannot be forged, but then two properties are needed: the candidate's server must be unable to inflate its own count, and the token must not lead to a person. Both come from a blind signature (Chaum): the system signs the token without seeing it, one per voter; the token presented later verifies as genuine but is not linked to whom it was issued. One token — one vote, without a name.

The boundary: if the falsifier is the electoral system itself, it may refuse to issue tokens. Then the Golos variant remains — photographs, weaker but workable. A refusal to issue tokens when the open channel is permitted is already a signal.

## 5. How this adds up with the protocol

Double entry closes the B share, tokens close the A-open share. Only A-secret stays in the dark. The field for manipulation is already reduced after the protocol (048h.2); the third channel reduces it once more, and now it is measurable: the share of secret ballots is the ceiling of what can be painted, and the painting must not drop below the lower bounds presented for each candidate.

Coercion. The open channel gives a boss what he wanted: proof. But the comparison must be made with the system in force (048h.6): photographing a ballot is lawful in 25 US states and unlawful in 13, and technically possible everywhere. Under the protocol the direct attack "vote openly for my man" costs the instigator D plus a risk premium, and the coerced person has the exit into B (048h.5). That is, the main protection is not secrecy but the floor price of a vote.

## 6. Two remainders for discussion

**Loss of deniability for those who have already stayed.** The floor price protects before the choice of status. Someone who has already refused D and stayed to vote no longer has that protection: for him the demand "since you stayed — show the token" is free for the instigator. Today he could show a photo and re-vote; an official token cannot be fooled that way. The Estonian device (an open vote can be overridden by a secret one, the last counts) restores deniability but takes away the token's power of proof: one cannot have a vote that is both provable for the count and deniable to the boss. It is the same trio "verifiability, secrecy, accessibility" (048h.1); the architect's construction chooses verifiability for volunteers.

**The signal from choosing the secret channel.** Once the open channel is official, choosing the secret one may read as "something to hide" — the literature calls this the unravelling of voluntary disclosure. The argument against, and it is a strong one: exit polls have existed for half a century, almost half of those who voted answer them voluntarily, and this has not unravelled the secrecy of the ballot (§3); where ballot photos are lawful, no effect is visible either. The argument for: in a dependent environment (a company town, the public sector under autocracy) pressure to "vote openly" is more likely. This is tested in a pilot by the share of open votes across types of territory.

And a general limitation: proof is not enforcement. In Belarus the forgery was proven and changed nothing. A parallel count works where there is a court willing to act on arithmetic.

## 7. Weak point of the section

The construction is described at the level of an idea: there is no token-issuance protocol, no answer to who holds the signing key and how it is verified that exactly one token per voter was issued, no legal frame — in many jurisdictions disclosing one's vote is prohibited, and an open channel requires a change in the law. The assessment of "unravelling" rests on the absence of an observed effect in free societies; for a dependent environment there are no data. 🟡

---

**Related:** 048f (double entry) · 048h (secrecy, verifiability, the price of coercion; the trilemma) · 057b (Belarus) · 056d.2 (the count and the opposition) · 033c.4 (publicity of status) · 059d.5 (the floor price of a vote; Proof-of-Stake) · 057c.6 (open source, multisignature) · 042 (poison pills)
