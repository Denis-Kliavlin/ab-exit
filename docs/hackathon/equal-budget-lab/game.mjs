import { connectSharedPaymentDisplay } from "../shared/payment-policy.mjs";
import { connectSharedIncomeDisplay } from "../shared/income-policy.mjs";
import { simulateEqualBudgetLab } from "./model.mjs";

const root = document.getElementById("equalBudgetLab");
const ids = [
  "paymentValue", "incomeValue", "methodIncome", "budgetDifference", "abFormula", "abBudget", "ubiFormula",
  "ubiBudget", "result", "answerCopy", "answerMark", "abStatus", "abTrack",
  "abYesSlice", "abNoSlice", "abMissingSlice", "abYes", "abNo", "abMissing",
  "abCore", "ubiStatus", "ubiTrack", "ubiYesSlice", "ubiNoSlice",
  "ubiMissingSlice", "ubiYes", "ubiNo", "ubiMissing", "ubiCore",
];
const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const predictionButtons = [...document.querySelectorAll("[data-prediction]")];
const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const monthlyCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});
const profile = await fetch("../referendum-lab/defaults.json").then((response) => {
  if (!response.ok) throw new Error(`Could not load the profile: ${response.status}`);
  return response.json();
});

let currentResult;

function setWidth(element, value) {
  element.style.width = `${value / profile.populationSize * 100}%`;
}

function statusReason(proposal) {
  if (proposal.passed) return "PASSED";
  if (!proposal.quorumMet) return "NO QUORUM";
  return "REJECTED";
}

function renderProposal(prefix, proposal) {
  const status = elements[`${prefix}Status`];
  status.textContent = statusReason(proposal);
  status.className = `status ${proposal.passed ? "status--pass" : "status--fail"}`;
  setWidth(elements[`${prefix}YesSlice`], proposal.yes);
  setWidth(elements[`${prefix}NoSlice`], proposal.no);
  setWidth(elements[`${prefix}MissingSlice`], proposal.didNotVote);
  elements[`${prefix}YesSlice`].dataset.tooltip = `Yes: ${integer.format(proposal.yes)} people (${percent.format(proposal.yesShare)} of voters).`;
  elements[`${prefix}NoSlice`].dataset.tooltip = `No: ${integer.format(proposal.no)} people (${percent.format(proposal.no / profile.populationSize)} of the electorate).`;
  elements[`${prefix}MissingSlice`].dataset.tooltip = `Did not vote: ${integer.format(proposal.didNotVote)} people (${percent.format(proposal.didNotVote / profile.populationSize)} of the electorate).`;
  elements[`${prefix}Yes`].textContent = `${integer.format(proposal.yes)} · ${percent.format(proposal.yesShare)} of voters`;
  elements[`${prefix}No`].textContent = integer.format(proposal.no);
  elements[`${prefix}Missing`].textContent = integer.format(proposal.didNotVote);
  elements[`${prefix}Core`].textContent = `Producing core: ${integer.format(proposal.core.yes)} yes · ${integer.format(proposal.core.no)} no · ${integer.format(proposal.core.didNotVote)} did not vote`;
  elements[`${prefix}Track`].setAttribute(
    "aria-label",
    `${proposal.yes} yes, ${proposal.no} no, ${proposal.didNotVote} did not vote`,
  );
}

function reveal(prediction) {
  const correct = prediction === currentResult.outcome;
  predictionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.prediction === prediction));
  });
  elements.result.hidden = false;
  elements.answerMark.textContent = correct ? "Prediction matched" : "The model produced a different result";
  elements.answerCopy.textContent = currentResult.outcome === "both"
    ? "Both proposals pass under the equal budget."
    : currentResult.outcome === "ab-exit-only"
      ? "Only AB-EXIT passes under the equal budget."
      : currentResult.outcome === "ubi-only"
        ? "Only UBI passes under the equal budget."
        : "Neither referendum passes at this payment.";
  renderProposal("ab", currentResult.abExit);
  renderProposal("ubi", currentResult.ubi);
}

function render(payment, medianHouseholdIncome) {
  currentResult = simulateEqualBudgetLab({ payment, medianHouseholdIncome, profile });
  elements.paymentValue.value = currency.format(payment);
  elements.paymentValue.textContent = currency.format(payment);
  elements.incomeValue.value = currency.format(medianHouseholdIncome);
  elements.incomeValue.textContent = currency.format(medianHouseholdIncome);
  elements.methodIncome.textContent = currency.format(medianHouseholdIncome);
  elements.budgetDifference.textContent = `${currency.format(Math.abs(currentResult.budget.difference))} difference`;
  elements.abFormula.textContent = `${currency.format(payment)} × ${integer.format(currentResult.abExit.expectedBeneficiaries)} people choosing B`;
  elements.abBudget.textContent = currency.format(currentResult.budget.abExit);
  elements.ubiFormula.textContent = `${monthlyCurrency.format(currentResult.ubi.regularMonthlyPayment)} × 47 + ${monthlyCurrency.format(currentResult.ubi.finalMonthPayment)} in the final month · ${integer.format(currentResult.inputs.populationSize)} citizens`;
  elements.ubiBudget.textContent = currency.format(currentResult.budget.ubi);
  elements.result.hidden = true;
  predictionButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
}

predictionButtons.forEach((button) => {
  button.addEventListener("click", () => reveal(button.dataset.prediction));
});

let frame;
let currentPayment;
let currentIncome;
const rerender = () => {
  if (currentPayment === undefined || currentIncome === undefined) return;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => render(currentPayment, currentIncome));
};
const sharedPayment = connectSharedPaymentDisplay((payment) => {
  currentPayment = payment;
  rerender();
});
const sharedIncome = connectSharedIncomeDisplay((income) => {
  currentIncome = income;
  rerender();
});

try {
  currentPayment = sharedPayment.payment;
  currentIncome = sharedIncome.income;
  render(currentPayment, currentIncome);
} catch (error) {
  root.innerHTML = `<p class="error">The simulation could not start: ${error.message}</p>`;
  throw error;
}
