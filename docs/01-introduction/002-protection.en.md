# 2. Requirements for the Data Source

**Chapter:** 01
**File version:** v2 (universalised)
**Date:** 2026-06-11 · universalised 2026-09-15
**Source:** v6.53 §4, §5

---

The formula in §1 rests on a single number: the jurisdiction's median wage. Where that
number comes from determines the stability of the whole protocol — substitute the source
and you can kill the mechanism without touching another line of the law (see
[§42](../08-implementation/042-poison-pill.md)). The source is therefore fixed in the
statute alongside the coefficients.

## 2.1. Four requirements for the source

**First — administrative reporting, not a survey.** Only a source qualifies where the
number arises from an employer's mandatory reporting to the state and is confirmed on
both sides. A survey estimate of income does not qualify: once AB-EXIT exists, the
respondent has a financial motive to overstate income and there is no penalty for doing
so. Administrative reporting is not governed by that motive — understating income there
is already an offence and already investigated, and AB-EXIT changes nothing about it.

**Second — independence from the executive.** The body publishing the median must not
report to the person whose term depends on its size. A mayor, governor or minister can
influence none of the formula's variables.

**Third — regularity and verifiability.** Publication on a fixed schedule, with an open
methodology and the ability to cross-check against at least one independent statistical
series.

**Fourth — resilience to losing one source.** Computation continues as long as at least
one of several authorised bodies publishes income data. The protocol must not die because
one agency closes.

## 2.2. What the source must count

**Included:** wages of salaried employees, bonuses, commissions — every form of
compensation paid by an employer within the jurisdiction.

**Excluded:** pensions, state social payments, benefits, investment income, inheritance,
alimony.

The logic of exclusion is single: the formula measures the **net economic productivity of
a territory** — what is earned here and now, not what is transferred in. Include
transfers and a perverse incentive appears: local government finds it more profitable to
attract recipients of transfers than to create jobs. The dividend rises; the economy does
not.

**The self-employed.** In most jurisdictions their income falls under a separate
reporting regime and its median sits below the salaried one. Including the self-employed
lowers the median; the 1.5 coefficient already carries an indirect correction, so no
additional coefficient is needed.

## 2.3. The divergence rule

One source is designated primary, the others verifying. If the primary and any verifying
source diverge by more than 10%, an independent audit is triggered automatically. The
auditor is appointed by the judicial branch; results are public within 90 days.

## 2.4. K \= 1% (the dividend coefficient)

- Fixed in the statute
- The local representative body may raise it to 2% on two conditions: the previous
  cycle's savings exceed the cost of AB-EXIT threefold, **and** two-thirds of the body
  approve
- Above 2% — only by referendum with a two-thirds majority
- Below 1% — only by referendum

**Why 1%:** it can be computed in your head in two seconds (drop two zeros). It is
universal across jurisdictions and currencies. "1%" is a brand, not merely a number.

## 2.5. 1.5 (the household coefficient)

- Converts the individual median into an approximate household median
- Average number of earners per household in developed economies: 1.3–1.7
- The coefficient 1.5 \= the midpoint
- Fixed in the statute
- Revisited once every ten years against the national census

**The arithmetic, for a citizen:**
median 40,000 \+ half of it (20,000) \= 60,000. Drop two zeros \= 600. Three steps, five
seconds, in any currency.

---

**Country-specific implementation:** which document actually satisfies these requirements
is a question for the country, not the protocol. The American variant (Form W-2 via the
SSA, five layers of data protection, the four-agency rule) is covered in
[§48b](../10-usa/048b-w2-source-detail.md).

---
