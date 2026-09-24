# Implementation and Technology

The register, identification, privacy, fraud, administration.
General rules of the base — [in the introduction](index.md).

---

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
