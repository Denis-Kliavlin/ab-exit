# Implementation and Technology

The register, identification, privacy, fraud, administration.
General rules of the base — [in the introduction](index.md).

---

*An early-draft layer (note of 01.10.2026 after audit 040m). In entries Q-IMP-001 and Q-IMP-002 "a transfer from the trust" and "to weigh the votes" are the earlier wording: the budget pays under law, ballots are not weighted; on the secrecy of choice B see Article 9 of the charter. The exact-answers sheet 1d and the charter 048m are in force.*

### Q-IMP-001 · How is it technically determined who chose A and who chose B?

**Status:** 🔁 contested
**Who asks:** engineers, election commissions
**Source in the book:** [§2](../01-introduction/002-protection.md), [§48 "W-2 as a data source"](../10-usa/048-w2-data-source.md), [§49](../10-usa/049-legal-statute.md)
**Related:** Q-IMP-002, Q-ECO-002

**Answer.** The infrastructure rests on state registers that already exist:
identification and income through SSA/W-2, payment by automatic transfer from the trust.
The protocol requires no new technological entities; that is what makes it administratively
cheap compared with UBI.

**Weak point of the answer.** "Rests on existing registers" is true for the US and false
for most other countries. Besides, tying electoral status to a tax identifier creates a link
between two databases that are today kept separate deliberately.

---

### Q-IMP-002 · Isn't a register of those who chose B a disclosure of political behaviour?

> **Amendment of 30.09.2026 (048k §3).** The architect's decision: secrecy is for the ballot; exit from voting is not specially hidden, but neither is it published by name — precinct figures are visible. Getting the money is not complicated for the sake of secrecy.

**Status:** 🟡 open
**Who asks:** privacy specialists, human-rights advocates — **a strong objection**
**Source in the book:** not examined
**Related:** Q-SOC-003, Q-SOC-004

**Answer.** There is no answer. Here is a genuine internal contradiction of the protocol:

- to pay, the state must know who chose B;
- to protect against pressure (Q-SOC-003), nobody must know who chose B;
- to weigh the votes, the size of the remaining electorate must be publicly verifiable.

Ballot secrecy in modern democracies protects against exactly this. AB-EXIT introduces
a politically significant choice that **by construction cannot be secret**, because
a payment follows it.

**Weak point of the answer.** The weak point here is the absence of an answer itself. Possible
directions (publishing aggregates only; separating the payment operator from the electoral
body; cryptographic schemes such as blind signatures) were not considered in the book.
**This is priority no. 1 for development** — without it the privacy objection stays unanswered.

---

### Q-IMP-003 · What about fraud: dead souls, double payments, bots?

**Status:** 🟡 open
**Who asks:** auditors, administrators
**Source in the book:** indirectly [§44](../08-implementation/044-election-interference.md)
**Related:** Q-IMP-001

**Answer.** There is no direct section. The outline: since both the electoral roll and tax
identification already exist and are already protected against fraud, AB-EXIT creates no new
class of vulnerability — it inherits the existing level of protection.

**Weak point of the answer.** It does create a new incentive: today a fictitious voter yields
one vote; after AB-EXIT he also yields **money**. The economics of fraud change, and
"we inherit the existing protection" does not cover that. **A section is needed.**

---

### Q-IMP-004 · Does AB-EXIT protect against external interference in elections?

**Status:** ✅ answered
**Who asks:** security specialists, diplomats
**Source in the book:** [§44, items 94.2–94.8](../08-implementation/044-election-interference.md)
**Related:** Q-GEO-002

**Answer.** Yes, and this is one of the book's strongest applied arguments. §44 examines
six interference methods of 2024–2026 and shows that all of them strike one point —
**manipulation of the weakly motivated voter**. AB-EXIT removes that group from the electorate
voluntarily and in advance, that is, it disarms the methods **structurally** rather than
technologically: it does not depend on which platform or technology is used for the attack.
Romania 2024 is cited as proof of the helplessness of the current system of protection.

**Weak point of the answer.** The attacker adapts. If the weakly motivated voter ceases to be
the target, the next target is **the A/B choice itself**: a campaign for mass exit in the
right region gives the same effect as a turnout campaign, but cheaper and more legally.
That scenario is not examined in §44.

---

### Q-IMP-005 · All of this is estimates. Where is the pilot?

**Status:** 🟡 plan
**Who asks:** everyone — experts, donors, journalists
**Source in the book:** [048l "The Courtyard Pilot"](../08-implementation/048l-courtyard-pilot.md), [045 §45.7](../08-implementation/045-campaign-economics.md)
**Related:** Q-IMP-001, Q-META-002

**Answer.** A courtyard, an association or a village of 500–1,000 adults with a fund of its own and a real question. Two buttons, a sum by the yardstick "from what sum would 40–50 % forgo the right to decide", a time scale with a premium for the early and a late payment at a discount, a counter by building, the weight of the vote by arithmetic, a control courtyard with an ordinary vote, two rounds. Run by an independent institute on a plan published in advance; payments through a notary; open data. Measured: the share taking the money and its age profile, those refusing the sum to vote "against", those returning for the late payment, the shift of opinions among those who remain on Fishkin's model, recognition of the result by those who exited, and the simplicity of the rule. A fund of 15 thousand euros per thousand people plus 10–15 thousand for the institute.

**Weak point of the answer.** A stake in a courtyard is not a stake in a national election; the shape of the dependence and the sign carry over, not the number. A courtyard has no thermostat — the quality of the decision will be judged by observers, not by a number on an account.

---
