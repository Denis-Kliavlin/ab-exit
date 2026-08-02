const EPSILON = 1e-9;

export function clamp(value, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function logistic(value) {
  return 1 / (1 + Math.exp(-value));
}

export function logit(probability) {
  const p = clamp(probability, EPSILON, 1 - EPSILON);
  return Math.log(p / (1 - p));
}

export function voteWeight(exitShare) {
  return 1 / (1 - clamp(exitShare, 0, 1 - EPSILON));
}

export function liquidityStress(payment, annualIncome, stressMultiplier = 1) {
  if (!(payment > 0) || !(annualIncome > 0) || stressMultiplier < 0) {
    throw new RangeError("Payment, income, and stress multiplier must be positive");
  }
  return (payment / (annualIncome / 12)) * stressMultiplier;
}

export function paymentTrustFactor(paymentTrust) {
  const delayDiscount = Math.exp(
    -(paymentTrust.delayDays * paymentTrust.annualDelayDiscount) / 365,
  );
  return clamp(
    paymentTrust.reliability
      * paymentTrust.institutionalIndependence
      * delayDiscount,
  );
}

export function politicalRoi({
  annualIncome,
  exposedAssets,
  influenceProbability,
  parameters,
}) {
  if (annualIncome < 0 || exposedAssets < 0) {
    throw new RangeError("Income and exposed assets cannot be negative");
  }

  const expectedExposure = (
    annualIncome * parameters.incomeExposureRate
      + exposedAssets * parameters.assetExposureRate
  ) * clamp(influenceProbability);
  const timeCost = parameters.timeHours
    * parameters.hourlyTimeCostRate
    * (annualIncome / 2080);
  const personalRisk = annualIncome * parameters.personalRiskRate;

  return expectedExposure - timeCost - personalRisk;
}

export function coreActivationProbability({ voteWeight: weight, normalizedRoi, parameters }) {
  return parameters.ceiling * logistic(
    parameters.intercept
      + parameters.voteValueCoefficient * Math.log(Math.max(1, weight))
      + parameters.roiCoefficient * normalizedRoi,
  );
}

export function applyCycleTransition({ voters, exiters }, transition) {
  validateTransition(transition);
  return {
    voters: voters * transition.voteToVote + exiters * transition.exitToVote,
    exiters: voters * transition.voteToExit + exiters * transition.exitToExit,
  };
}

export function informationDiffusionStep(awareShare, parameters, attack = null) {
  const aware = clamp(awareShare);
  const capacity = clamp(parameters.capacity, EPSILON, 1);
  const available = Math.max(0, capacity - aware);
  const newAwareness = parameters.reproductionNumber * aware * (available / capacity);
  const forgotten = parameters.forgettingRate * aware;
  const attackDelta = attack?.awarenessDelta ?? 0;

  return clamp(aware + newAwareness - forgotten + attackDelta, 0, capacity);
}

export function applyAttack(supportProbability, attackBackfire) {
  return logistic(logit(supportProbability) + attackBackfire.supportLogitDelta);
}

export function applyHysteresis(supportProbability, state, parameters) {
  const shifts = {
    promise: parameters.promiseOnlyLogitLift,
    verified: parameters.verifiedLogitLift,
    failed: parameters.failedLogitLift,
  };
  if (!(state in shifts)) {
    throw new RangeError(`Unknown experience state: ${state}`);
  }
  return logistic(logit(supportProbability) + shifts[state]);
}

export function voterConcentration(blocCounts) {
  const counts = Object.values(blocCounts).filter((count) => count > EPSILON);
  const total = counts.reduce((sum, count) => sum + count, 0);
  if (total <= EPSILON || counts.length <= 1) return counts.length === 1 ? 1 : 0;

  const hhi = counts.reduce((sum, count) => sum + (count / total) ** 2, 0);
  const equalShareHhi = 1 / counts.length;
  return clamp((hhi - equalShareHhi) / (1 - equalShareHhi));
}

export function validateProfile(profile) {
  if (profile.profileVersion !== "1.0.0") {
    throw new RangeError("Unsupported profile version");
  }
  if (!Number.isInteger(profile.populationSize) || profile.populationSize < 100) {
    throw new RangeError("populationSize must be an integer of at least 100");
  }
  if (!(profile.budgetPerCapita > 0)) {
    throw new RangeError("budgetPerCapita must be positive");
  }
  const segmentTotal = profile.segments.reduce((sum, segment) => sum + segment.count, 0);
  if (segmentTotal !== profile.populationSize) {
    throw new RangeError("Segment counts must equal populationSize");
  }
  validateTransition(profile.cycleTransition);
  return true;
}

function validateTransition(transition) {
  const voteRow = transition.voteToVote + transition.voteToExit;
  const exitRow = transition.exitToVote + transition.exitToExit;
  if (Math.abs(voteRow - 1) > EPSILON || Math.abs(exitRow - 1) > EPSILON) {
    throw new RangeError("Every transition row must sum to one");
  }
}

function estimateElectionChoice(payment, medianHouseholdIncome, profile) {
  const trust = paymentTrustFactor(profile.paymentTrust);
  const effectivePayment = payment * trust;
  const elasticity = profile.influenceElasticity.value;
  let exitShare = 0.3;
  let segmentChoices = [];

  for (let iteration = 0; iteration < 100; iteration += 1) {
    const weight = voteWeight(exitShare);
    segmentChoices = profile.segments.map((segment) => {
      const annualIncome = Math.max(1, medianHouseholdIncome * segment.incomeMultiple);
      const stress = liquidityStress(effectivePayment, annualIncome, segment.liquidityStress);
      const influenceProbability = clamp(
        (1 - 1 / weight) * segment.coordinationPotential,
      );
      const roi = politicalRoi({
        annualIncome,
        exposedAssets: medianHouseholdIncome * segment.assetExposureMultiple,
        influenceProbability,
        parameters: profile.politicalRoi,
      });
      const normalizedRoi = (roi / medianHouseholdIncome) * 100;
      const score = -1.15
        + 1.65 * Math.log1p(stress)
        - 0.9 * segment.civicUtility
        - segment.influenceSensitivity * elasticity * Math.log(weight)
        - 0.35 * normalizedRoi;
      return {
        segment,
        stress,
        roi,
        normalizedRoi,
        exitProbability: clamp(
          logistic(score),
          profile.minimumGroupTail,
          1 - profile.minimumGroupTail,
        ),
      };
    });

    const nextExitShare = segmentChoices.reduce(
      (sum, choice) => sum + choice.segment.count * choice.exitProbability,
      0,
    ) / profile.populationSize;
    if (Math.abs(nextExitShare - exitShare) < EPSILON) {
      exitShare = nextExitShare;
      break;
    }
    exitShare = 0.55 * exitShare + 0.45 * nextExitShare;
  }

  const weight = voteWeight(exitShare);
  const activeByBloc = {};
  let newlyActivatedCoreCount = 0;
  for (const choice of segmentChoices) {
    const activationProbability = coreActivationProbability({
      voteWeight: weight,
      normalizedRoi: choice.normalizedRoi,
      parameters: profile.coreActivation,
    });
    const newlyActivated = choice.segment.count
      * (1 - choice.segment.baselineTurnout)
      * choice.segment.activationEligibleShare
      * activationProbability;
    newlyActivatedCoreCount += newlyActivated;
    choice.activationProbability = activationProbability;
    choice.newlyActivated = newlyActivated;
    activeByBloc[choice.segment.bloc] = (activeByBloc[choice.segment.bloc] ?? 0)
      + choice.segment.count * (1 - choice.exitProbability);
  }

  return {
    trust,
    effectivePayment,
    exitShare,
    exitCount: exitShare * profile.populationSize,
    voteWeight: weight,
    newlyActivatedCoreCount,
    concentration: voterConcentration(activeByBloc),
    segmentChoices,
  };
}

function largestRemainder(rawValues, target) {
  const floors = rawValues.map(Math.floor);
  let remaining = target - floors.reduce((sum, value) => sum + value, 0);
  const order = rawValues
    .map((value, index) => ({ index, fraction: value - floors[index] }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let cursor = 0; remaining > 0; cursor += 1, remaining -= 1) {
    floors[order[cursor % order.length].index] += 1;
  }
  return floors;
}

function evaluateProposal({ type, payment, medianHouseholdIncome, profile, election }) {
  const householdPaymentShare = (payment * 2) / (medianHouseholdIncome / 12);
  const fiscalExposure = type === "ab-exit"
    ? (payment * election.exitCount) / (profile.budgetPerCapita * profile.populationSize)
    : payment / profile.budgetPerCapita;
  const captureExcess = Math.max(
    0,
    election.concentration - profile.captureRisk.warningThreshold,
  );
  const capturePenalty = captureExcess * profile.captureRisk.supportPenalty;
  const rawGroups = [0, 0, 0];
  const rawCore = [0, 0, 0];
  const segmentResults = [];

  for (const choice of election.segmentChoices) {
    const { segment } = choice;
    const salience = logistic(-1.35 + 4 * householdPaymentShare * segment.liquidityStress);
    let supportScore;
    let turnout;

    if (type === "ab-exit") {
      const dualBenefit = 0.5 * Math.log1p(choice.stress)
        + segment.influenceSensitivity
          * profile.influenceElasticity.value
          * Math.log(election.voteWeight);
      const fiscalPenalty = 4 * Math.max(0, fiscalExposure - 0.05);
      supportScore = profile.referendum.abExitBaselineLogit
        + dualBenefit
        + 0.35 * choice.activationProbability
        - 1.1 * segment.institutionalSkepticism
        - fiscalPenalty
        - capturePenalty;
      turnout = 0.25 * segment.baselineTurnout
        + 0.65 * salience
        + 0.1 * choice.activationProbability;
    } else {
      const cashBenefit = 1.6 * Math.log1p(choice.stress);
      const fiscalPenalty = 4.5 * fiscalExposure
        + 7 * fiscalExposure ** 2 * (0.5 + segment.coreShare);
      supportScore = -0.45
        + cashBenefit
        - fiscalPenalty
        - 1.2 * segment.coreShare * fiscalExposure;
      const fiscalControversy = logistic(-2 + 8 * fiscalExposure);
      turnout = 0.25 * segment.baselineTurnout
        + 0.55 * salience
        + 0.2 * fiscalControversy;
    }

    const support = clamp(
      logistic(supportScore),
      profile.minimumGroupTail,
      1 - profile.minimumGroupTail,
    );
    turnout = clamp(
      turnout,
      profile.minimumGroupTail,
      1 - profile.minimumGroupTail,
    );
    const yes = segment.count * turnout * support;
    const no = segment.count * turnout * (1 - support);
    const didNotVote = segment.count * (1 - turnout);
    const groupValues = [yes, no, didNotVote];
    for (let index = 0; index < 3; index += 1) {
      rawGroups[index] += groupValues[index];
      rawCore[index] += groupValues[index] * segment.coreShare;
    }
    segmentResults.push({
      id: segment.id,
      supportProbability: support,
      turnoutProbability: turnout,
      expectedYes: yes,
      expectedNo: no,
      expectedDidNotVote: didNotVote,
      coreShare: segment.coreShare,
      evidence: segment.evidence,
    });
  }

  const [yes, no, didNotVote] = largestRemainder(rawGroups, profile.populationSize);
  const core = {
    yes: Math.min(yes, Math.round(rawCore[0])),
    no: Math.min(no, Math.round(rawCore[1])),
    didNotVote: Math.min(didNotVote, Math.round(rawCore[2])),
  };
  const votesCast = yes + no;
  const turnoutShare = votesCast / profile.populationSize;
  const yesShare = votesCast ? yes / votesCast : 0;
  const quorumMet = turnoutShare >= profile.referendum.quorum;
  const approvalMet = yesShare >= profile.referendum.approvalThreshold;

  return {
    type,
    projected: true,
    yes,
    no,
    didNotVote,
    votesCast,
    turnoutShare,
    yesShare,
    quorumMet,
    approvalMet,
    passed: quorumMet && approvalMet,
    core,
    grossCost: type === "ab-exit"
      ? payment * election.exitCount
      : payment * profile.populationSize,
    fiscalExposure,
    segmentResults,
  };
}

export function simulateReferendumLab({ payment, medianHouseholdIncome, profile }) {
  if (!(payment > 0)) throw new RangeError("Payment must be greater than zero");
  if (!(medianHouseholdIncome > 0)) {
    throw new RangeError("Median household income must be greater than zero");
  }
  validateProfile(profile);

  const election = estimateElectionChoice(payment, medianHouseholdIncome, profile);
  return {
    modelVersion: profile.profileVersion,
    scenario: profile.scenario,
    inputs: { payment, medianHouseholdIncome },
    expectedElection: {
      exitShare: election.exitShare,
      exitCount: election.exitCount,
      voteWeight: election.voteWeight,
      newlyActivatedCoreCount: election.newlyActivatedCoreCount,
      activeElectorateConcentration: election.concentration,
      captureWarning: election.concentration >= profile.captureRisk.warningThreshold,
      paymentTrustFactor: election.trust,
      effectivePayment: election.effectivePayment,
    },
    abExit: evaluateProposal({
      type: "ab-exit",
      payment,
      medianHouseholdIncome,
      profile,
      election,
    }),
    universalPayment: evaluateProposal({
      type: "universal-payment",
      payment,
      medianHouseholdIncome,
      profile,
      election,
    }),
    evidenceBoundary: "Synthetic projection; behavioral coefficients are hypotheses until calibrated.",
  };
}

export function findBudgetSafePaymentMaximum({
  medianHouseholdIncome,
  profile,
  minimum,
  maximum,
  step,
  fiscalCapShare,
}) {
  if (!(minimum > 0) || !(maximum >= minimum) || !(step > 0)) {
    throw new RangeError("Payment range must be positive and ordered");
  }
  if (!(fiscalCapShare > 0)) throw new RangeError("Fiscal cap must be positive");

  let safeMaximum = minimum;
  for (let payment = minimum; payment <= maximum; payment += step) {
    const result = simulateReferendumLab({ payment, medianHouseholdIncome, profile });
    if (result.abExit.fiscalExposure <= fiscalCapShare) safeMaximum = payment;
  }
  return safeMaximum;
}

export function robustnessVolume({ payments, incomes, profile, proposal = "abExit" }) {
  if (!payments.length || !incomes.length) throw new RangeError("Grid cannot be empty");
  const cases = [];
  for (const payment of payments) {
    for (const medianHouseholdIncome of incomes) {
      const result = simulateReferendumLab({ payment, medianHouseholdIncome, profile });
      cases.push({ payment, medianHouseholdIncome, passed: result[proposal].passed });
    }
  }
  const passing = cases.filter((entry) => entry.passed).length;
  return { passing, total: cases.length, share: passing / cases.length, cases };
}

export function falsificationBoundary({
  payments,
  incomes,
  profile,
  proposal = "abExit",
  originPayment,
  originIncome,
}) {
  const grid = robustnessVolume({ payments, incomes, profile, proposal });
  const failedCases = grid.cases.filter((entry) => !entry.passed);
  if (!failedCases.length) return null;

  const referencePayment = originPayment ?? payments[Math.floor(payments.length / 2)];
  const referenceIncome = originIncome ?? incomes[Math.floor(incomes.length / 2)];
  const paymentSpan = Math.max(...payments) - Math.min(...payments) || 1;
  const incomeSpan = Math.max(...incomes) - Math.min(...incomes) || 1;
  const ranked = failedCases.map((entry) => ({
    ...entry,
    normalizedDistance: Math.hypot(
      (entry.payment - referencePayment) / paymentSpan,
      (entry.medianHouseholdIncome - referenceIncome) / incomeSpan,
    ),
  })).sort((a, b) => a.normalizedDistance - b.normalizedDistance);

  return ranked[0];
}
