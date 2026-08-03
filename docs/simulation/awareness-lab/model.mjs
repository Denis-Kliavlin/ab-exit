import { SHARED_PAYMENT_POLICY } from "../shared/payment-policy.mjs";

const EPSILON = 1e-9;

export const awarenessProfile = {
  version: "1.1.0",
  title: "Alaska 2022 awareness counterfactual",
  electorate: 601161,
  observedBallots: 266943,
  referencePayment: SHARED_PAYMENT_POLICY.defaultValue,
  segments: [
    {
      id: "strong-preference",
      label: "Strong candidate preference this cycle",
      count: 147668,
      observedBallots: 147668,
      baseAttention: 0.8,
      politicalValue: 1.4,
      civicControl: 1.2,
      satisfaction: 0.4,
      cashSensitivity: 0.7,
      participationCost: 0.1,
      influenceSensitivity: 1.4,
    },
    {
      id: "weak-fit",
      label: "Weak fit / strategic party choice this cycle",
      count: 115300,
      observedBallots: 115300,
      baseAttention: 0.65,
      politicalValue: 0.7,
      civicControl: 0.6,
      satisfaction: 0.7,
      cashSensitivity: 1,
      participationCost: 0.2,
      influenceSensitivity: 0.9,
    },
    {
      id: "no-usable-choice",
      label: "No usable candidate choice recorded",
      count: 3975,
      observedBallots: 3975,
      baseAttention: 0.55,
      politicalValue: 0.5,
      civicControl: 0.4,
      satisfaction: 0.6,
      cashSensitivity: 1.1,
      participationCost: 0.2,
      influenceSensitivity: 0.7,
    },
    {
      id: "satisfied-reserve",
      label: "Satisfied reserve electorate this cycle",
      count: 150000,
      observedBallots: 0,
      baseAttention: 0.45,
      politicalValue: 0.8,
      civicControl: 0.7,
      satisfaction: 1.4,
      cashSensitivity: 1,
      participationCost: 0.15,
      influenceSensitivity: 1.3,
    },
    {
      id: "low-current-stakes",
      label: "Low personal stakes this cycle",
      count: 80000,
      observedBallots: 0,
      baseAttention: 0.35,
      politicalValue: 0.35,
      civicControl: 0.3,
      satisfaction: 1.2,
      cashSensitivity: 1.5,
      participationCost: 0.35,
      influenceSensitivity: 0.6,
    },
    {
      id: "unrecorded-reserve",
      label: "Other unrecorded citizens this cycle",
      count: 104218,
      observedBallots: 0,
      baseAttention: 0.25,
      politicalValue: 0.4,
      civicControl: 0.35,
      satisfaction: 1,
      cashSensitivity: 1.2,
      participationCost: 0.3,
      influenceSensitivity: 0.7,
    },
  ],
};

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

function roundedPartition(entries, target) {
  const rounded = Object.fromEntries(
    Object.entries(entries).map(([key, value]) => [key, Math.floor(value)]),
  );
  let remaining = target - sum(Object.values(rounded));
  const order = Object.entries(entries)
    .map(([key, value]) => ({ key, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let index = 0; remaining > 0; index += 1, remaining -= 1) {
    rounded[order[index % order.length].key] += 1;
  }
  return rounded;
}

export function validateAwarenessProfile(profile = awarenessProfile) {
  if (profile.version !== "1.1.0") throw new RangeError("Unsupported profile version");
  if (sum(profile.segments.map(({ count }) => count)) !== profile.electorate) {
    throw new RangeError("Segment counts must equal the electorate");
  }
  if (sum(profile.segments.map(({ observedBallots }) => observedBallots))
      !== profile.observedBallots) {
    throw new RangeError("Segment ballots must equal observed ballots");
  }
  return true;
}

function engagementProbability(segment, payment) {
  const paymentSignal = 2 * Math.log1p(payment / 500);
  const score = logit(segment.baseAttention)
    + paymentSignal
    + 0.25 * segment.politicalValue
    - 0.35 * segment.participationCost;
  return logistic(score);
}

function voteProbability(segment, payment, voteWeight) {
  const cashUtility = segment.cashSensitivity * Math.log1p(payment / 2000);
  const score = -0.25
    + segment.politicalValue
    + 0.7 * segment.civicControl
    + 1.15 * segment.influenceSensitivity * Math.log(voteWeight)
    - 0.85 * segment.satisfaction
    - cashUtility
    - segment.participationCost;
  return logistic(score / 0.75);
}

function solveAbExit(payment, profile) {
  let voteWeight = 1.8;
  let segmentResults = [];

  for (let iteration = 0; iteration < 160; iteration += 1) {
    segmentResults = profile.segments.map((segment) => {
      const engagement = engagementProbability(segment, payment);
      const vote = voteProbability(segment, payment, voteWeight);
      return {
        ...segment,
        engagementProbability: engagement,
        voteProbability: vote,
        vote: segment.count * engagement * vote,
        exit: segment.count * engagement * (1 - vote),
        missed: segment.count * (1 - engagement),
      };
    });
    const vote = sum(segmentResults.map((segment) => segment.vote));
    const exit = sum(segmentResults.map((segment) => segment.exit));
    const nextWeight = (vote + exit) / Math.max(1, vote);
    if (Math.abs(nextWeight - voteWeight) < EPSILON) {
      voteWeight = nextWeight;
      break;
    }
    voteWeight = 0.55 * voteWeight + 0.45 * nextWeight;
  }

  const raw = {
    vote: sum(segmentResults.map((segment) => segment.vote)),
    exit: sum(segmentResults.map((segment) => segment.exit)),
    missed: sum(segmentResults.map((segment) => segment.missed)),
  };
  const counts = roundedPartition(raw, profile.electorate);
  const previouslyUnrecordedSegments = segmentResults.filter(
    (segment) => segment.observedBallots === 0,
  );
  const previouslyUnrecorded = roundedPartition({
    vote: sum(previouslyUnrecordedSegments.map((segment) => segment.vote)),
    exit: sum(previouslyUnrecordedSegments.map((segment) => segment.exit)),
    missed: sum(previouslyUnrecordedSegments.map((segment) => segment.missed)),
  }, profile.electorate - profile.observedBallots);
  return {
    ...counts,
    considered: counts.vote + counts.exit,
    engagementRate: (counts.vote + counts.exit) / profile.electorate,
    voteWeight: (counts.vote + counts.exit) / counts.vote,
    previouslyUnrecorded: {
      ...previouslyUnrecorded,
      madeExplicitDecision: previouslyUnrecorded.vote + previouslyUnrecorded.exit,
      explicitDecisionRate: (previouslyUnrecorded.vote + previouslyUnrecorded.exit)
        / (profile.electorate - profile.observedBallots),
    },
    segments: segmentResults,
  };
}

export function simulateAwareness(payment, profile = awarenessProfile) {
  validateAwarenessProfile(profile);
  if (!(payment > 0)) throw new RangeError("Payment must be greater than zero");

  const abExit = solveAbExit(payment, profile);
  const current = {
    recordedBallots: profile.observedBallots,
    unrecorded: profile.electorate - profile.observedBallots,
    recordedRate: profile.observedBallots / profile.electorate,
  };
  return {
    payment,
    electorate: profile.electorate,
    current,
    abExit,
    additionalRecordedDecisions: abExit.considered - current.recordedBallots,
    recordedDecisionMultiplier: abExit.considered / current.recordedBallots,
  };
}
