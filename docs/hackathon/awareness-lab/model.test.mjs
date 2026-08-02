import assert from "node:assert/strict";
import test from "node:test";
import {
  awarenessProfile,
  simulateAwareness,
  validateAwarenessProfile,
} from "./model.mjs";

test("profile reconciles to the official Alaska electorate and ballot count", () => {
  assert.equal(validateAwarenessProfile(), true);
  assert.equal(awarenessProfile.electorate, 601161);
  assert.equal(awarenessProfile.observedBallots, 266943);
});

test("every citizen is in exactly one current and AB-EXIT state", () => {
  const result = simulateAwareness(2000);
  assert.equal(
    result.current.recordedBallots + result.current.unrecorded,
    result.electorate,
  );
  assert.equal(
    result.abExit.vote + result.abExit.exit + result.abExit.missed,
    result.electorate,
  );
});

test("the reference payment makes considered participation nearly universal", () => {
  const result = simulateAwareness(2000);
  assert.ok(result.abExit.engagementRate > 0.95);
  assert.ok(result.abExit.engagementRate < 0.97);
  assert.ok(result.abExit.vote > 0);
  assert.ok(result.abExit.exit > 0);
  assert.ok(result.abExit.missed > 0);
});

test("comparison never invents a mental-state split for current voters", () => {
  const result = simulateAwareness(2000);
  assert.deepEqual(Object.keys(result.current).sort(), [
    "recordedBallots",
    "recordedRate",
    "unrecorded",
  ]);
  assert.equal(
    result.additionalRecordedDecisions,
    result.abExit.considered - awarenessProfile.observedBallots,
  );
});

test("the previously unrecorded cohort is revealed only by modeled AB-EXIT actions", () => {
  const result = simulateAwareness(2000);
  const cohort = result.abExit.previouslyUnrecorded;
  assert.equal(cohort.vote + cohort.exit + cohort.missed, result.current.unrecorded);
  assert.equal(cohort.madeExplicitDecision, cohort.vote + cohort.exit);
  assert.ok(cohort.vote > 0);
  assert.ok(cohort.exit > 0);
  assert.ok(cohort.missed > 0);
  assert.ok(cohort.explicitDecisionRate > 0.9);
});

test("AB-EXIT creates a self-balancing vote multiplier", () => {
  const result = simulateAwareness(2000);
  assert.ok(result.abExit.voteWeight > 1);
  assert.ok(Math.abs(
    result.abExit.voteWeight
      - result.abExit.considered / result.abExit.vote,
  ) < 0.00001);
});

test("small payments attract less attention than meaningful payments", () => {
  const low = simulateAwareness(100);
  const reference = simulateAwareness(2000);
  const high = simulateAwareness(12000);
  assert.ok(low.abExit.considered < reference.abExit.considered);
  assert.ok(reference.abExit.considered < high.abExit.considered);
  assert.ok(low.abExit.voteWeight < high.abExit.voteWeight);
});

test("invalid payments are rejected", () => {
  assert.throws(() => simulateAwareness(0), /greater than zero/);
});
