import { simulateReferendumLab } from "../referendum-lab/model.mjs";

export const EQUAL_BUDGET_DEFAULTS = Object.freeze({
  medianHouseholdIncome: 90000,
  cycleMonths: 48,
});

export function simulateEqualBudgetLab({
  payment,
  profile,
  medianHouseholdIncome = EQUAL_BUDGET_DEFAULTS.medianHouseholdIncome,
  cycleMonths = EQUAL_BUDGET_DEFAULTS.cycleMonths,
}) {
  if (!(payment > 0)) throw new RangeError("Payment must be greater than zero");
  if (!(medianHouseholdIncome > 0)) {
    throw new RangeError("Median household income must be greater than zero");
  }
  if (!Number.isInteger(cycleMonths) || cycleMonths < 1) {
    throw new RangeError("Cycle months must be a positive integer");
  }

  const abExitScenario = simulateReferendumLab({
    payment,
    medianHouseholdIncome,
    profile,
  });
  const expectedBeneficiaries = Math.round(abExitScenario.expectedElection.exitCount);
  const equalBudget = payment * expectedBeneficiaries;
  const ubiCyclePayment = equalBudget / profile.populationSize;
  const ubiMonthlyPayment = ubiCyclePayment / cycleMonths;
  const ubiRegularMonthlyPayment = Math.floor(ubiMonthlyPayment * 100) / 100;
  const ubiFinalMonthPayment = Math.round((
    ubiCyclePayment - ubiRegularMonthlyPayment * (cycleMonths - 1)
  ) * 100) / 100;
  const ubiScenario = simulateReferendumLab({
    payment: ubiCyclePayment,
    medianHouseholdIncome,
    profile,
  });
  const ubi = ubiScenario.universalPayment;

  return {
    modelVersion: profile.profileVersion,
    scenario: `${profile.scenario}-equal-budget`,
    inputs: {
      payment,
      medianHouseholdIncome,
      cycleMonths,
      populationSize: profile.populationSize,
    },
    budget: {
      abExit: equalBudget,
      ubi: ubi.grossCost,
      difference: ubi.grossCost - equalBudget,
      fiscalExposure: equalBudget / (profile.budgetPerCapita * profile.populationSize),
    },
    abExit: {
      ...abExitScenario.abExit,
      payment,
      grossCost: equalBudget,
      fiscalExposure: equalBudget / (profile.budgetPerCapita * profile.populationSize),
      expectedBeneficiaries,
      voteWeight: abExitScenario.expectedElection.voteWeight,
    },
    ubi: {
      ...ubi,
      monthlyPayment: ubiMonthlyPayment,
      regularMonthlyPayment: ubiRegularMonthlyPayment,
      finalMonthPayment: ubiFinalMonthPayment,
      cyclePayment: ubiCyclePayment,
      expectedBeneficiaries: profile.populationSize,
    },
    outcome: abExitScenario.abExit.passed
      ? (ubi.passed ? "both" : "ab-exit-only")
      : (ubi.passed ? "ubi-only" : "neither"),
    evidenceBoundary: "Equal nominal public cost over one election cycle; behavioral coefficients remain hypotheses.",
  };
}
