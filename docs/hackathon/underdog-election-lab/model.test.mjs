import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  findAssumptionFalsification,
  findNearestLoss,
  runRankedChoice,
  simulateUnderdogElection,
  simulateUncertainty,
  validateElectionProfile,
} from "./model.mjs";
import { simulateAwareness } from "../awareness-lab/model.mjs";

const profile = JSON.parse(
  await readFile(new URL("./alaska-2022.json", import.meta.url), "utf8"),
);
const run = (payment = 2000, variant = "central") => (
  simulateUnderdogElection({ payment, profile, variant })
);

test("official Alaska totals reconcile exactly", () => {
  assert.equal(validateElectionProfile(profile), true);
  assert.equal(profile.registeredVoters, 601161);
  assert.equal(profile.ballotsCast, 266943);
  assert.equal(
    profile.candidates.reduce((sum, candidate) => sum + candidate.observedVotes, 0)
      + profile.observedOtherVotes
      + profile.undervotesAndInvalid,
    profile.ballotsCast,
  );
});

test("observed first-choice result reproduces Walker's 54,668", () => {
  assert.equal(profile.candidates.find(({ id }) => id === "walker").observedVotes, 54668);
  assert.equal(profile.candidates.find(({ id }) => id === "dunleavy").observedVotes, 132632);
});

test("official four-candidate count stops with Dunleavy above 50%", () => {
  const firstRound = Object.fromEntries(
    profile.candidates.map(({ id, observedVotes }) => [id, observedVotes]),
  );
  const result = runRankedChoice(firstRound, profile);
  assert.equal(result.winner, "dunleavy");
  assert.equal(result.rounds.length, 1);
});

test("reference hypothesis reproduces approximately 161,215 Walker votes", () => {
  const result = run();
  assert.ok(Math.abs(result.candidateVotes.walker - profile.reference.targetWalkerVotes) <= 10);
  assert.equal(result.winner, "walker");
  assert.equal(result.rcv.rounds.length, 1);
});

test("all projected candidate counts sum to the active electorate", () => {
  const result = run();
  assert.equal(
    Object.values(result.candidateVotes).reduce((sum, votes) => sum + votes, 0),
    result.activeVoters,
  );
  assert.equal(
    result.activeVoters + result.exiters + result.undecided,
    profile.registeredVoters,
  );
  assert.deepEqual(result.decisionBreakdown, {
    vote: result.activeVoters,
    exit: result.exiters,
    missed: result.undecided,
  });
});

test("A, B, and residual Ø stay aligned with Awareness Lab", () => {
  for (let payment = 500; payment <= 3400; payment += 100) {
    const result = run(payment);
    const awareness = simulateAwareness(payment);
    assert.equal(result.activeVoters, awareness.abExit.vote);
    assert.equal(result.exiters, awareness.abExit.exit);
    assert.equal(result.undecided, awareness.abExit.missed);
    assert.equal(
      result.activeVoters + result.exiters + result.undecided,
      profile.registeredVoters,
    );
  }
});

test("vote multiplier is registered voters divided by active voters", () => {
  const result = run();
  assert.ok(
    Math.abs(result.voteWeight - profile.registeredVoters / result.activeVoters) < 0.00001,
  );
  assert.ok(result.voteWeight > 1);
});

test("central projection activates historically absent citizens", () => {
  const result = run();
  assert.ok(result.reactivatedNonvoters > 100000);
  assert.ok(result.capableCore > 100000);
  assert.ok(result.walkerSources.some(({ id, votes }) => (
    id === "exhausted-capable-nonvoters" && votes > 70000
  )));
});

test("low-payment case can require ranked-choice transfers", () => {
  const result = run(100);
  assert.ok(result.walkerShare < 0.5);
  assert.equal(result.winner, "walker");
  assert.ok(result.rcv.rounds.length > 1);
});

test("conservative, central, and strong variants order Walker votes", () => {
  const uncertainty = simulateUncertainty({ payment: 2000, profile });
  assert.ok(uncertainty.results.conservative.candidateVotes.walker
    < uncertainty.results.central.candidateVotes.walker);
  assert.ok(uncertainty.results.central.candidateVotes.walker
    < uncertainty.results.strong.candidateVotes.walker);
  assert.equal(uncertainty.walkerWinsAll, true);
});

test("payment-only scan finds no Walker loss in the displayed range", () => {
  assert.equal(findNearestLoss({ payment: 2000, profile }), null);
});

test("assumption stress test exposes a finite falsification boundary", () => {
  const boundary = findAssumptionFalsification({ payment: 2000, profile });
  assert.ok(boundary);
  assert.equal(boundary.winner, "dunleavy");
  assert.ok(boundary.stress >= 1.35 && boundary.stress <= 1.45);
  assert.ok(boundary.walkerVotes > 0);
});

test("zero payment and unknown variants are rejected", () => {
  assert.throws(() => run(0), /greater than zero/);
  assert.throws(() => run(2000, "invented"), /Unknown variant/);
});
