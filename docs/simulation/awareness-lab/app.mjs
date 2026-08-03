import { awarenessProfile, simulateAwareness } from "./model.mjs";
import { connectSharedPaymentDisplay } from "../shared/payment-policy.mjs";

const root = document.getElementById("awarenessLab");
const ids = [
  "paymentValue", "addedConsidered", "headlineCopy",
  "currentRecordedSlice", "currentMissingSlice", "currentRecorded",
  "currentMissing", "currentRate",
  "abVoteSlice", "abExitSlice", "abMissingSlice", "abVote", "abExit",
  "abMissing", "abRate", "journey", "journeyTitle", "journeySubtitle",
  "cohortVoteSlice", "cohortExitSlice", "cohortMissingSlice", "cohortKnownRate",
  "cohortVote", "cohortExit", "cohortMissing", "cohortCopy", "cohortTrack",
  "journeySteps", "journeyResult", "showCurrent", "showExit", "showVote",
];
const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

let currentResult;
let selectedChoice = "exit";

function setWidth(element, count) {
  element.style.width = `${count / awarenessProfile.electorate * 100}%`;
}

function setCohortWidth(element, count) {
  element.style.width = `${count / currentResult.current.unrecorded * 100}%`;
}

function renderJourney() {
  const result = currentResult;
  const isExit = selectedChoice === "exit";
  const isCurrent = selectedChoice === "current";
  elements.journey.dataset.choice = selectedChoice;
  elements.showCurrent.setAttribute("aria-pressed", String(isCurrent));
  elements.showExit.setAttribute("aria-pressed", String(isExit));
  elements.showVote.setAttribute("aria-pressed", String(!isExit && !isCurrent));

  if (isCurrent) {
    elements.journeyTitle.textContent = "What do we know about a person without a ballot today?";
    elements.journeySubtitle.textContent = "Only one thing: no decision appears in the final data.";
    const steps = [
      { title: "Election announced", detail: "The person is on the voter roll" },
      { title: "No ballot", detail: "Official observation ends here" },
      { title: "Motive unknown", detail: "Satisfied—or no acceptable candidate?" },
      { title: "Attention unknown", detail: "Considered the choice—or forgot?" },
      { title: "Signal lost", detail: "Every reason looks identical in the result" },
    ];
    elements.journeySteps.replaceChildren();
    steps.forEach((step, index) => {
      const item = document.createElement("div");
      item.className = "step";
      item.innerHTML = `<span class="step-number">${index + 1}</span><strong>${step.title}</strong><span>${step.detail}</span>`;
      elements.journeySteps.append(item);
    });
    elements.journeyResult.textContent = `${integer.format(result.current.unrecorded)} citizens left no distinguishable decision: the system merges deliberate abstention, satisfaction, lack of a suitable candidate, and simple inattention.`;
    return;
  }

  elements.journeyTitle.textContent = isExit
    ? "What did a person choosing B do?"
    : "What did a person choosing A do?";
  elements.journeySubtitle.textContent = isExit
    ? "They did not disappear from the election—they evaluated the value of their influence."
    : "They saw the payment but decided that influencing the outcome mattered more.";

  const finalStep = isExit
    ? { title: "Recorded B", detail: `Receives ${currency.format(result.payment)} for this cycle` }
    : { title: "Recorded A", detail: `Their vote weighs ${result.abExit.voteWeight.toFixed(2)}×` };
  const steps = [
    { title: "Noticed the election", detail: "The event became personally relevant" },
    { title: "Reviewed the candidates", detail: "Evaluated the available political choices" },
    { title: "Saw the terms", detail: `${currency.format(result.payment)} or a ${result.abExit.voteWeight.toFixed(2)}× vote` },
    { title: "Compared the options", detail: isExit ? "Current direction is acceptable for this cycle" : "The result matters more than the money" },
    finalStep,
  ];
  elements.journeySteps.replaceChildren();
  steps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "step";
    item.innerHTML = `<span class="step-number">${index + 1}</span><strong>${step.title}</strong><span>${step.detail}</span>`;
    elements.journeySteps.append(item);
  });
  elements.journeyResult.textContent = isExit
    ? `${integer.format(result.abExit.exit)} citizens followed this path and explicitly delegated political influence for this cycle only.`
    : `${integer.format(result.abExit.vote)} citizens followed this path and declined the payment for an amplified vote.`;
}

function render(payment) {
  const result = simulateAwareness(payment);
  currentResult = result;

  elements.paymentValue.value = currency.format(payment);
  elements.paymentValue.textContent = currency.format(payment);
  const additional = result.additionalRecordedDecisions;
  elements.addedConsidered.textContent = `${additional >= 0 ? "+" : ""}${integer.format(additional)}`;
  elements.headlineCopy.textContent = additional >= 0
    ? `${percent.format(result.abExit.engagementRate)} of the electorate left a distinguishable A or B decision`
    : "The payment is too small to create enough modeled engagement";

  setWidth(elements.currentRecordedSlice, result.current.recordedBallots);
  setWidth(elements.currentMissingSlice, result.current.unrecorded);
  elements.currentRecordedSlice.dataset.tooltip = `Ballot recorded: ${integer.format(result.current.recordedBallots)} citizens (${percent.format(result.current.recordedRate)} of the electorate).`;
  elements.currentMissingSlice.dataset.tooltip = `No ballot recorded: ${integer.format(result.current.unrecorded)} citizens. Their reasons are unknown in the current system.`;
  elements.currentRecorded.textContent = integer.format(result.current.recordedBallots);
  elements.currentMissing.textContent = integer.format(result.current.unrecorded);
  elements.currentRate.textContent = percent.format(result.current.recordedRate);

  setWidth(elements.abVoteSlice, result.abExit.vote);
  setWidth(elements.abExitSlice, result.abExit.exit);
  setWidth(elements.abMissingSlice, result.abExit.missed);
  elements.abVoteSlice.dataset.tooltip = `Choice A: ${integer.format(result.abExit.vote)} citizens kept an amplified vote.`;
  elements.abExitSlice.dataset.tooltip = `Choice B: ${integer.format(result.abExit.exit)} citizens accepted the payment and exited this election cycle.`;
  elements.abMissingSlice.dataset.tooltip = `Ø: ${integer.format(result.abExit.missed)} citizens did not complete an A/B decision.`;
  elements.abVote.textContent = integer.format(result.abExit.vote);
  elements.abExit.textContent = integer.format(result.abExit.exit);
  elements.abMissing.textContent = integer.format(result.abExit.missed);
  elements.abRate.textContent = percent.format(result.abExit.engagementRate);

  const cohort = result.abExit.previouslyUnrecorded;
  setCohortWidth(elements.cohortVoteSlice, cohort.vote);
  setCohortWidth(elements.cohortExitSlice, cohort.exit);
  setCohortWidth(elements.cohortMissingSlice, cohort.missed);
  elements.cohortVoteSlice.dataset.tooltip = `Former non-voters choosing A: ${integer.format(cohort.vote)}.`;
  elements.cohortExitSlice.dataset.tooltip = `Former non-voters choosing B: ${integer.format(cohort.exit)}.`;
  elements.cohortMissingSlice.dataset.tooltip = `Former non-voters remaining Ø: ${integer.format(cohort.missed)}.`;
  elements.cohortVote.textContent = integer.format(cohort.vote);
  elements.cohortExit.textContent = integer.format(cohort.exit);
  elements.cohortMissing.textContent = integer.format(cohort.missed);
  elements.cohortKnownRate.textContent = percent.format(cohort.explicitDecisionRate);
  elements.cohortCopy.textContent = `${integer.format(cohort.madeExplicitDecision)} former non-voters now leave a verifiable A or B decision; only ${integer.format(cohort.missed)} remain unknown.`;
  elements.cohortTrack.setAttribute(
    "aria-label",
    `Former non-voters: ${integer.format(cohort.vote)} chose A, ${integer.format(cohort.exit)} chose B, ${integer.format(cohort.missed)} did not complete a decision`,
  );

  renderJourney();
}

elements.showExit.addEventListener("click", () => {
  selectedChoice = "exit";
  renderJourney();
});
elements.showCurrent.addEventListener("click", () => {
  selectedChoice = "current";
  renderJourney();
});
elements.showVote.addEventListener("click", () => {
  selectedChoice = "vote";
  renderJourney();
});
let frame;
const sharedPayment = connectSharedPaymentDisplay((payment) => {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => render(payment));
});

try {
  render(sharedPayment.payment);
} catch (error) {
  root.innerHTML = `<p class="error">The simulation could not start: ${error.message}</p>`;
  throw error;
}
