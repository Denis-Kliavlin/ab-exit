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

## 3. Why a token is better than a photograph

A photograph can be forged and can be devalued: photographed, then spoiled the ballot and took a new one. So a photo is weak proof in both directions. A token issued by the electoral system cannot be forged, but then two properties are needed: the candidate's server must be unable to inflate its own count, and the token must not lead to a person. Both come from a blind signature (Chaum): the system signs the token without seeing it, one per voter; the token presented later verifies as genuine but is not linked to whom it was issued. One token — one vote, without a name.

The boundary: if the falsifier is the electoral system itself, it may refuse to issue tokens. Then the Golos variant remains — photographs, weaker but workable. A refusal to issue tokens when the open channel is permitted is already a signal.

## 4. How this adds up with the protocol

Double entry closes the B share, tokens close the A-open share. Only A-secret stays in the dark. The field for manipulation is already reduced after the protocol (048h.2); the third channel reduces it once more, and now it is measurable: the share of secret ballots is the ceiling of what can be painted, and the painting must not drop below the lower bounds presented for each candidate.

Coercion. The open channel gives a boss what he wanted: proof. But the comparison must be made with the system in force (048h.6): photographing a ballot is lawful in 25 US states and unlawful in 13, and technically possible everywhere. Under the protocol the direct attack "vote openly for my man" costs the instigator D plus a risk premium, and the coerced person has the exit into B (048h.5). That is, the main protection is not secrecy but the floor price of a vote.

## 5. Two remainders for discussion

**Loss of deniability for those who have already stayed.** The floor price protects before the choice of status. Someone who has already refused D and stayed to vote no longer has that protection: for him the demand "since you stayed — show the token" is free for the instigator. Today he could show a photo and re-vote; an official token cannot be fooled that way. The Estonian device (an open vote can be overridden by a secret one, the last counts) restores deniability but takes away the token's power of proof: one cannot have a vote that is both provable for the count and deniable to the boss. It is the same trio "verifiability, secrecy, accessibility" (048h.1); the architect's construction chooses verifiability for volunteers.

**The signal from choosing the secret channel.** Once the open channel is official, choosing the secret one may read as "something to hide" — the literature calls this the unravelling of voluntary disclosure. The argument against: where ballot photos are lawful, no noticeable unravelling is observed. The argument for: in a dependent environment (a company town, the public sector under autocracy) pressure to "vote openly" is more likely. This is tested in a pilot by the share of open votes across types of territory.

And a general limitation: proof is not enforcement. In Belarus the forgery was proven and changed nothing. A parallel count works where there is a court willing to act on arithmetic.

## 6. Weak point of the section

The construction is described at the level of an idea: there is no token-issuance protocol, no answer to who holds the signing key and how it is verified that exactly one token per voter was issued, no legal frame — in many jurisdictions disclosing one's vote is prohibited, and an open channel requires a change in the law. The assessment of "unravelling" rests on the absence of an observed effect, not on a measurement. 🟡

---

**Related:** 048f (double entry) · 048h (secrecy, verifiability, the price of coercion; the trilemma) · 057b (Belarus) · 056d.2 (the count and the opposition) · 033c.4 (publicity of status) · 059d.5 (the floor price of a vote; Proof-of-Stake) · 057c.6 (open source, multisignature) · 042 (poison pills)
