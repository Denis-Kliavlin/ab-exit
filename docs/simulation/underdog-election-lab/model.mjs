import { SHARED_PAYMENT_POLICY } from "../shared/payment-policy.mjs";
import { simulateAwareness } from "../awareness-lab/model.mjs";

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

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function largestRemainder(entries, target) {
  const result = Object.fromEntries(
    Object.entries(entries).map(([key, value]) => [key, Math.floor(value)]),
  );
  let remaining = target - sum(Object.values(result));
  const order = Object.entries(entries)
    .map(([key, value]) => ({ key, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder);

  for (let cursor = 0; remaining > 0; cursor += 1, remaining -= 1) {
    result[order[cursor % order.length].key] += 1;
  }
  return result;
}

export function validateElectionProfile(profile) {
  if (profile.profileVersion !== "1.0.0") {
    throw new RangeError("Unsupported profile version");
  }
  if (!(profile.registeredVoters > 0) || !(profile.ballotsCast > 0)) {
    throw new RangeError("Observed electorate totals must be positive");
  }

  const segmentTotal = sum(profile.segments.map((segment) => segment.count));
  if (segmentTotal !== profile.registeredVoters) {
    throw new RangeError("Segment counts must equal registered voters");
  }

  const candidateVoteTotal = sum(
    profile.candidates.map((candidate) => candidate.observedVotes),
  ) + profile.observedOtherVotes;
  if (candidateVoteTotal + profile.undervotesAndInvalid !== profile.ballotsCast) {
    throw new RangeError("Official votes and undervotes must equal ballots cast");
  }

  const candidateIds = new Set(profile.candidates.map((candidate) => candidate.id));
  for (const segment of profile.segments) {
    const preferenceKeys = Object.keys(segment.preferences);
    if (preferenceKeys.some((key) => !candidateIds.has(key))) {
      throw new RangeError(`Unknown candidate in segment ${segment.id}`);
    }
    if (Math.abs(sum(Object.values(segment.preferences)) - 1) > EPSILON) {
      throw new RangeError(`Preferences must sum to one in segment ${segment.id}`);
    }
  }

  return true;
}

function segmentVoteProbability(segment, payment, weight, profile, variant) {
  const referencePayment = profile.reference.payment;
  const referenceWeight = profile.reference.voteWeight;
  const monthlyIncome = segment.annualIncome / 12;
  const currentLiquidity = Math.log1p(payment / monthlyIncome);
  const referenceLiquidity = Math.log1p(referencePayment / monthlyIncome);
  const lowPaymentGap = Math.max(0, 1 - payment / referencePayment);
  const variantShift = segment.latent ? variant.latentVoteLogitShift : 0;
  const score = logit(segment.baseVoteProbability)
    + profile.behavior.influenceElasticity
      * segment.influenceSensitivity
      * Math.log(weight / referenceWeight)
    - segment.cashSensitivity * (currentLiquidity - referenceLiquidity)
    - segment.lowSalienceSensitivity * lowPaymentGap
    + variantShift;
  const tail = profile.behavior.minimumProbability;
  return clamp(logistic(score), tail, 1 - tail);
}

function solveActiveElectorate(payment, profile, variant) {
  let weight = profile.reference.voteWeight;
  let segments = [];

  for (let iteration = 0; iteration < 120; iteration += 1) {
    segments = profile.segments.map((segment) => ({
      segment,
      voteProbability: segmentVoteProbability(segment, payment, weight, profile, variant),
    }));
    const activeVoters = sum(
      segments.map((entry) => entry.segment.count * entry.voteProbability),
    );
    const nextWeight = profile.registeredVoters / Math.max(1, activeVoters);
    if (Math.abs(nextWeight - weight) < EPSILON) {
      weight = nextWeight;
      break;
    }
    weight = 0.55 * weight + 0.45 * nextWeight;
  }

  segments = profile.segments.map((segment) => ({
    segment,
    voteProbability: segmentVoteProbability(segment, payment, weight, profile, variant),
  }));
  const activeVoters = sum(
    segments.map((entry) => entry.segment.count * entry.voteProbability),
  );
  return { activeVoters, voteWeight: profile.registeredVoters / activeVoters, segments };
}

function alignActiveElectorate(active, targetActiveVoters, registeredVoters) {
  let low = -20;
  let high = 20;
  for (let iteration = 0; iteration < 120; iteration += 1) {
    const shift = (low + high) / 2;
    const adjustedTotal = sum(active.segments.map(({ segment, voteProbability }) => (
      segment.count * logistic(logit(voteProbability) + shift)
    )));
    if (adjustedTotal < targetActiveVoters) low = shift;
    else high = shift;
  }
  const shift = (low + high) / 2;
  const segments = active.segments.map(({ segment, voteProbability }) => ({
    segment,
    voteProbability: logistic(logit(voteProbability) + shift),
  }));
  return {
    activeVoters: targetActiveVoters,
    voteWeight: registeredVoters / targetActiveVoters,
    segments,
  };
}

function adjustedPreferences(segment, walkerShare, profile, variant) {
  const baseWalker = segment.preferences.walker;
  let shift = segment.coordinationSensitivity
    * Math.log((walkerShare + EPSILON) / profile.reference.walkerShare);
  if (segment.latent) shift += variant.latentWalkerLogitShift;
  if (segment.weakPartisan) shift += variant.weakWalkerLogitShift;

  const walker = logistic(logit(baseWalker) + shift);
  const nonWalkerBase = 1 - baseWalker;
  const scale = nonWalkerBase > EPSILON ? (1 - walker) / nonWalkerBase : 0;
  return Object.fromEntries(
    Object.entries(segment.preferences).map(([candidate, probability]) => [
      candidate,
      candidate === "walker" ? walker : probability * scale,
    ]),
  );
}

function solveCandidateAllocation(active, profile, variant) {
  let walkerShare = profile.reference.walkerShare;
  let candidateTotals = {};
  let segmentResults = [];

  for (let iteration = 0; iteration < 120; iteration += 1) {
    candidateTotals = Object.fromEntries(profile.candidates.map(({ id }) => [id, 0]));
    segmentResults = active.segments.map(({ segment, voteProbability }) => {
      const activeCount = segment.count * voteProbability;
      const preferences = adjustedPreferences(segment, walkerShare, profile, variant);
      const votes = Object.fromEntries(
        Object.entries(preferences).map(([candidate, probability]) => [
          candidate,
          activeCount * probability,
        ]),
      );
      for (const [candidate, votesForCandidate] of Object.entries(votes)) {
        candidateTotals[candidate] += votesForCandidate;
      }
      return { segment, activeCount, preferences, votes };
    });
    const nextWalkerShare = candidateTotals.walker / active.activeVoters;
    if (Math.abs(nextWalkerShare - walkerShare) < EPSILON) {
      walkerShare = nextWalkerShare;
      break;
    }
    walkerShare = 0.6 * walkerShare + 0.4 * nextWalkerShare;
  }

  candidateTotals = Object.fromEntries(profile.candidates.map(({ id }) => [id, 0]));
  segmentResults = active.segments.map(({ segment, voteProbability }) => {
    const activeCount = segment.count * voteProbability;
    const preferences = adjustedPreferences(segment, walkerShare, profile, variant);
    const votes = Object.fromEntries(
      Object.entries(preferences).map(([candidate, probability]) => [
        candidate,
        activeCount * probability,
      ]),
    );
    for (const [candidate, votesForCandidate] of Object.entries(votes)) {
      candidateTotals[candidate] += votesForCandidate;
    }
    return { segment, activeCount, preferences, votes };
  });

  const roundedActive = Math.round(active.activeVoters);
  return {
    candidateTotals: largestRemainder(candidateTotals, roundedActive),
    segmentResults,
    walkerShare: candidateTotals.walker / active.activeVoters,
  };
}

export function runRankedChoice(firstRound, profile) {
  const continuing = new Set(profile.candidates.map(({ id }) => id));
  const votes = Object.fromEntries(Object.entries(firstRound).map(([key, value]) => [key, value]));
  const rounds = [];
  let exhausted = 0;

  while (continuing.size) {
    const activeVotes = sum([...continuing].map((candidate) => votes[candidate]));
    const ordered = [...continuing].sort((a, b) => votes[b] - votes[a]);
    const leader = ordered[0];
    rounds.push({
      round: rounds.length + 1,
      votes: Object.fromEntries(ordered.map((candidate) => [candidate, Math.round(votes[candidate])])),
      activeVotes: Math.round(activeVotes),
      exhausted: Math.round(exhausted),
    });

    if (votes[leader] > activeVotes * profile.rules.majorityShare || continuing.size <= 2) {
      return { winner: leader, rounds, exhausted: Math.round(exhausted) };
    }

    const eliminated = ordered.at(-1);
    const eliminatedVotes = votes[eliminated];
    continuing.delete(eliminated);
    const transferRule = profile.rcvTransfers[eliminated];
    const destinationWeights = Object.entries(transferRule)
      .filter(([candidate]) => candidate === "exhausted" || continuing.has(candidate));
    const weightTotal = sum(destinationWeights.map(([, weight]) => weight));
    for (const [candidate, transferWeight] of destinationWeights) {
      const transferred = eliminatedVotes * transferWeight / weightTotal;
      if (candidate === "exhausted") exhausted += transferred;
      else votes[candidate] += transferred;
    }
    votes[eliminated] = 0;
    rounds.at(-1).eliminated = eliminated;
  }

  throw new Error("Ranked-choice count did not produce a winner");
}

export function simulateUnderdogElection({ payment, profile, variant = "central" }) {
  if (!(payment > 0)) throw new RangeError("Payment must be greater than zero");
  validateElectionProfile(profile);
  const variantParameters = profile.behavior.variants[variant];
  if (!variantParameters) throw new RangeError(`Unknown variant: ${variant}`);

  const awareness = simulateAwareness(payment);
  const active = alignActiveElectorate(
    solveActiveElectorate(payment, profile, variantParameters),
    awareness.abExit.vote,
    profile.registeredVoters,
  );
  const allocation = solveCandidateAllocation(active, profile, variantParameters);
  const rcv = runRankedChoice(allocation.candidateTotals, profile);
  const historicalStayers = sum(
    allocation.segmentResults
      .filter(({ segment }) => segment.historicalVoter)
      .map(({ activeCount }) => activeCount),
  );
  const reactivatedNonvoters = sum(
    allocation.segmentResults
      .filter(({ segment }) => !segment.historicalVoter)
      .map(({ activeCount }) => activeCount),
  );
  const capableCore = allocation.segmentResults.find(
    ({ segment }) => segment.id === "exhausted-capable-nonvoters",
  )?.activeCount ?? 0;
  const walkerSources = allocation.segmentResults
    .map(({ segment, votes }) => ({
      id: segment.id,
      label: segment.label,
      votes: Math.round(votes.walker),
      evidence: segment.evidence,
    }))
    .sort((a, b) => b.votes - a.votes);

  return {
    modelVersion: profile.profileVersion,
    scenario: profile.scenario,
    variant,
    payment,
    projected: true,
    registeredVoters: profile.registeredVoters,
    activeVoters: Math.round(active.activeVoters),
    exiters: awareness.abExit.exit,
    undecided: awareness.abExit.missed,
    decisionBreakdown: {
      vote: Math.round(active.activeVoters),
      exit: awareness.abExit.exit,
      missed: awareness.abExit.missed,
    },
    voteWeight: active.voteWeight,
    historicalStayers: Math.round(historicalStayers),
    reactivatedNonvoters: Math.round(reactivatedNonvoters),
    capableCore: Math.round(capableCore),
    candidateVotes: allocation.candidateTotals,
    walkerShare: allocation.candidateTotals.walker / Math.round(active.activeVoters),
    walkerSources,
    rcv,
    winner: rcv.winner,
    evidenceBoundary: "Official 2022 totals are observed; all AB-EXIT behavior and transfer coefficients are hypotheses.",
  };
}

export function simulateUncertainty({ payment, profile }) {
  const variants = Object.keys(profile.behavior.variants);
  const results = Object.fromEntries(
    variants.map((variant) => [variant, simulateUnderdogElection({ payment, profile, variant })]),
  );
  const walkerVotes = variants.map((variant) => results[variant].candidateVotes.walker);
  return {
    results,
    walkerRange: [Math.min(...walkerVotes), Math.max(...walkerVotes)],
    walkerWinsAll: variants.every((variant) => results[variant].winner === "walker"),
  };
}

export function findNearestLoss({
  payment,
  profile,
  minimum = SHARED_PAYMENT_POLICY.minimum,
  maximum = SHARED_PAYMENT_POLICY.maximum,
  step = SHARED_PAYMENT_POLICY.step,
  variant = "central",
}) {
  const losses = [];
  for (let testedPayment = minimum; testedPayment <= maximum; testedPayment += step) {
    const result = simulateUnderdogElection({ payment: testedPayment, profile, variant });
    if (result.winner !== "walker") {
      losses.push({
        payment: testedPayment,
        winner: result.winner,
        walkerVotes: result.candidateVotes.walker,
        distance: Math.abs(testedPayment - payment),
      });
    }
  }
  losses.sort((a, b) => a.distance - b.distance || a.payment - b.payment);
  return losses[0] ?? null;
}

export function findAssumptionFalsification({
  payment,
  profile,
  maximumStress = 6,
  step = 0.05,
}) {
  for (let stress = 0; stress <= maximumStress + EPSILON; stress += step) {
    const falsification = {
      latentVoteLogitShift: -stress,
      latentWalkerLogitShift: -stress,
      weakWalkerLogitShift: -stress / 2,
    };
    const stressedProfile = {
      ...profile,
      behavior: {
        ...profile.behavior,
        variants: {
          ...profile.behavior.variants,
          falsification,
        },
      },
    };
    const result = simulateUnderdogElection({
      payment,
      profile: stressedProfile,
      variant: "falsification",
    });
    if (result.winner !== "walker") {
      return {
        stress: Number(stress.toFixed(2)),
        parameters: falsification,
        winner: result.winner,
        walkerVotes: result.candidateVotes.walker,
        activeVoters: result.activeVoters,
      };
    }
  }
  return null;
}
