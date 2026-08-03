import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { simulateEqualBudgetLab } from "./model.mjs";

const profile = JSON.parse(
  await readFile(new URL("../referendum-lab/defaults.json", import.meta.url), "utf8"),
);

const run = (payment = 2000, cycleMonths = 48) => simulateEqualBudgetLab({
  payment,
  cycleMonths,
  medianHouseholdIncome: 90000,
  profile,
});

test("AB-EXIT and UBI use exactly the same cycle budget", () => {
  for (const payment of [500, 1000, 2000, 3400]) {
    const result = run(payment);
    assert.ok(Math.abs(result.budget.difference) < 1e-7);
    assert.ok(Math.abs(result.budget.abExit - result.budget.ubi) < 1e-7);
  }
});

test("monthly UBI reconstructs the equal cycle budget", () => {
  const result = run();
  const reconstructed = (
    result.ubi.regularMonthlyPayment * (result.inputs.cycleMonths - 1)
      + result.ubi.finalMonthPayment
  )
    * result.inputs.populationSize;
  assert.ok(Math.abs(reconstructed - result.budget.abExit) < 1e-7);
  assert.equal(Number.isInteger(result.abExit.expectedBeneficiaries), true);
});

test("universal payment per citizen equals AB-EXIT payment times B share", () => {
  const result = run();
  const exitShare = result.abExit.expectedBeneficiaries / result.inputs.populationSize;
  assert.ok(Math.abs(result.ubi.cyclePayment - result.inputs.payment * exitShare) < 1e-9);
  assert.ok(result.ubi.cyclePayment < result.inputs.payment);
});

test("reference scenario passes AB-EXIT and rejects budget-equivalent UBI", () => {
  const result = run();
  assert.equal(result.outcome, "ab-exit-only");
  assert.equal(result.abExit.passed, true);
  assert.equal(result.ubi.passed, false);
});

test("a small inherited payment can leave both referendums without a quorum", () => {
  const result = run(500);
  assert.equal(result.outcome, "neither");
  assert.equal(result.abExit.quorumMet, false);
  assert.equal(result.ubi.quorumMet, false);
});

test("invalid payment and cycle length are rejected", () => {
  assert.throws(() => run(0), /greater than zero/);
  assert.throws(() => run(2000, 0), /positive integer/);
});
