import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  applyAttack,
  applyCycleTransition,
  applyHysteresis,
  coreActivationProbability,
  falsificationBoundary,
  informationDiffusionStep,
  liquidityStress,
  paymentTrustFactor,
  politicalRoi,
  robustnessVolume,
  simulateReferendumLab,
  validateProfile,
  voteWeight,
  voterConcentration,
} from "./model.mjs";

const profile = JSON.parse(
  await readFile(new URL("./defaults.json", import.meta.url), "utf8"),
);

const run = (payment = 2000, medianHouseholdIncome = 90000, customProfile = profile) => (
  simulateReferendumLab({ payment, medianHouseholdIncome, profile: customProfile })
);

test("profile is internally valid", () => {
  assert.equal(validateProfile(profile), true);
  assert.equal(
    profile.segments.reduce((sum, segment) => sum + segment.count, 0),
    profile.populationSize,
  );
});

test("vote weight follows N / active voters and remains finite", () => {
  assert.equal(voteWeight(0.5), 2);
  assert.ok(Math.abs(voteWeight(0.9) - 10) < 1e-10);
  assert.ok(Number.isFinite(voteWeight(1)));
});

test("liquidity stress rises with payment and falls with income", () => {
  assert.ok(liquidityStress(2000, 30000, 2) > liquidityStress(1000, 30000, 2));
  assert.ok(liquidityStress(1000, 30000, 2) > liquidityStress(1000, 90000, 2));
  assert.throws(() => liquidityStress(0, 90000), /positive/);
});

test("payment delay and institutional trust affect effective value", () => {
  const immediate = paymentTrustFactor({
    ...profile.paymentTrust,
    delayDays: 0,
  });
  const delayed = paymentTrustFactor({
    ...profile.paymentTrust,
    delayDays: 365,
  });
  assert.ok(immediate > delayed);
  assert.ok(immediate <= 1 && delayed >= 0);
});

test("political ROI can be higher for a citizen with more exposed assets", () => {
  const common = {
    influenceProbability: 0.25,
    parameters: profile.politicalRoi,
  };
  const survival = politicalRoi({ annualIncome: 18000, exposedAssets: 1000, ...common });
  const owner = politicalRoi({ annualIncome: 120000, exposedAssets: 500000, ...common });
  assert.ok(owner > survival);
});

test("latent-core activation rises with the expected value of a vote", () => {
  const base = coreActivationProbability({
    voteWeight: 1,
    normalizedRoi: 0,
    parameters: profile.coreActivation,
  });
  const amplified = coreActivationProbability({
    voteWeight: 5,
    normalizedRoi: 0,
    parameters: profile.coreActivation,
  });
  assert.ok(amplified > base);
  assert.ok(amplified <= profile.coreActivation.ceiling);
});

test("cross-cycle transition conserves the electorate", () => {
  const next = applyCycleTransition({ voters: 6500, exiters: 3500 }, profile.cycleTransition);
  assert.ok(Math.abs(next.voters + next.exiters - 10000) < 1e-8);
  assert.throws(
    () => applyCycleTransition(
      { voters: 10, exiters: 10 },
      { ...profile.cycleTransition, voteToVote: 0.9 },
    ),
    /sum to one/,
  );
});

test("information can reproduce, while an attack may help or hurt support", () => {
  const nextAware = informationDiffusionStep(0.1, profile.informationDiffusion);
  assert.ok(nextAware > 0.1);
  assert.ok(nextAware <= profile.informationDiffusion.capacity);
  assert.ok(applyAttack(0.5, { supportLogitDelta: 0.2 }) > 0.5);
  assert.ok(applyAttack(0.5, { supportLogitDelta: -0.2 }) < 0.5);
});

test("verified and failed experience create hysteresis in opposite directions", () => {
  const promise = applyHysteresis(0.55, "promise", profile.hysteresis);
  const verified = applyHysteresis(0.55, "verified", profile.hysteresis);
  const failed = applyHysteresis(0.55, "failed", profile.hysteresis);
  assert.ok(verified > promise);
  assert.ok(failed < promise);
});

test("VHHI distinguishes balanced and concentrated active electorates", () => {
  const balanced = voterConcentration({ a: 100, b: 100, c: 100 });
  const concentrated = voterConcentration({ a: 280, b: 10, c: 10 });
  assert.ok(Math.abs(balanced) < 1e-10);
  assert.ok(concentrated > balanced);
  assert.ok(concentrated <= 1);
});

test("default result obeys accounting, tail, and producing-core constraints", () => {
  const result = run();
  for (const proposal of [result.abExit, result.universalPayment]) {
    assert.equal(proposal.yes + proposal.no + proposal.didNotVote, profile.populationSize);
    assert.ok(proposal.yes > 0);
    assert.ok(proposal.no > 0);
    assert.ok(proposal.didNotVote > 0);
    assert.ok(proposal.core.yes <= proposal.yes);
    assert.ok(proposal.core.no <= proposal.no);
    assert.ok(proposal.core.didNotVote <= proposal.didNotVote);
  }
  assert.ok(result.expectedElection.voteWeight > 1);
  assert.ok(result.expectedElection.newlyActivatedCoreCount > 0);
});

test("payment cannot use the fictitious zero endpoint", () => {
  assert.throws(() => run(0), /greater than zero/);
});

test("a trivial AB-EXIT amount may fail quorum while a salient amount clears it", () => {
  const trivial = run(10).abExit;
  const salient = run(2000).abExit;
  assert.ok(trivial.turnoutShare < salient.turnoutShare);
  assert.equal(trivial.quorumMet, false);
  assert.equal(salient.quorumMet, true);
});

test("universal-payment support rises and then reverses under fiscal stress", () => {
  const small = run(100).universalPayment.yesShare;
  const moderate = run(1000).universalPayment.yesShare;
  const extreme = run(10000).universalPayment.yesShare;
  assert.ok(moderate > small);
  assert.ok(extreme < moderate);
  assert.ok(extreme > 0);
});

test("stronger vote-value elasticity lowers expected exit", () => {
  const lowerProfile = structuredClone(profile);
  const higherProfile = structuredClone(profile);
  lowerProfile.influenceElasticity.value = 0.3;
  higherProfile.influenceElasticity.value = 2;
  assert.ok(run(2000, 90000, higherProfile).expectedElection.exitShare
    < run(2000, 90000, lowerProfile).expectedElection.exitShare);
});

test("a higher activation ceiling activates more exhausted capable citizens", () => {
  const lowerProfile = structuredClone(profile);
  const higherProfile = structuredClone(profile);
  lowerProfile.coreActivation.ceiling = 0.2;
  higherProfile.coreActivation.ceiling = 0.9;
  assert.ok(run(2000, 90000, higherProfile).expectedElection.newlyActivatedCoreCount
    > run(2000, 90000, lowerProfile).expectedElection.newlyActivatedCoreCount);
});

test("robustness volume reports every tested grid point", () => {
  const result = robustnessVolume({
    payments: [100, 1000, 2000],
    incomes: [60000, 90000],
    profile,
  });
  assert.equal(result.total, 6);
  assert.equal(result.cases.length, 6);
  assert.ok(result.share >= 0 && result.share <= 1);
});

test("falsification boundary returns the nearest failing tested point", () => {
  const boundary = falsificationBoundary({
    payments: [10, 1000, 2000],
    incomes: [90000],
    profile,
    originPayment: 2000,
    originIncome: 90000,
  });
  assert.ok(boundary);
  assert.equal(boundary.passed, false);
  assert.equal(boundary.payment, 1000);
  assert.ok(boundary.normalizedDistance >= 0);
});
