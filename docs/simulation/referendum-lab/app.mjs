import { findBudgetSafePaymentMaximum, simulateReferendumLab } from "./model.mjs";
import {
  connectSharedPaymentControl,
  SHARED_PAYMENT_POLICY,
  writeSharedPayment,
} from "../shared/payment-policy.mjs";
import { connectSharedIncomeControl } from "../shared/income-policy.mjs";

const root = document.getElementById("referendumLab");
const ids = [
  "payment", "paymentValue", "paymentMaxLabel", "income", "incomeValue", "householdPayment",
  "incomeShare", "voteWeight", "exitCount", "abStatus", "abStack",
  "abYesSlice", "abNoSlice", "abMissingSlice", "abCoreYesSlice",
  "abCoreNoSlice", "abCoreMissingSlice", "abYes", "abNo", "abMissing",
  "abTurnout", "abFiscal", "abCore", "cashStatus", "cashStack",
  "cashYesSlice", "cashNoSlice", "cashMissingSlice", "cashCoreYesSlice",
  "cashCoreNoSlice", "cashCoreMissingSlice", "cashYes", "cashNo",
  "cashMissing", "cashTurnout", "cashFiscal", "cashCore",
  "referendumNextStep", "referendumNextTitle", "referendumNextCopy", "referendumNextLink",
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
const profile = await fetch("./defaults.json").then((response) => {
  if (!response.ok) throw new Error(`Could not load the profile: ${response.status}`);
  return response.json();
});

function setWidth(element, count) {
  element.style.width = `${count / profile.populationSize * 100}%`;
}

function setCoreWidth(element, coreCount, parentCount) {
  element.style.width = `${parentCount ? coreCount / parentCount * 100 : 0}%`;
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
  for (const [group, count, core] of [
    ["Yes", proposal.yes, proposal.core.yes],
    ["No", proposal.no, proposal.core.no],
    ["Missing", proposal.didNotVote, proposal.core.didNotVote],
  ]) {
    setWidth(elements[`${prefix}${group}Slice`], count);
    setCoreWidth(elements[`${prefix}Core${group}Slice`], core, count);
    const label = group === "Missing" ? "Did not vote" : group;
    elements[`${prefix}${group}Slice`].dataset.tooltip = `${label}: ${integer.format(count)} people (${percent.format(count / profile.populationSize)} of the electorate). Dark section: ${integer.format(core)} producing-core citizens.`;
    elements[`${prefix}Core${group}Slice`].dataset.tooltip = `Producing core within ${label.toLowerCase()}: ${integer.format(core)} citizens.`;
  }
  elements[`${prefix}Yes`].textContent = `${integer.format(proposal.yes)} · ${percent.format(proposal.yesShare)} of voters`;
  elements[`${prefix}No`].textContent = integer.format(proposal.no);
  elements[`${prefix}Missing`].textContent = integer.format(proposal.didNotVote);
  elements[`${prefix}Turnout`].textContent = percent.format(proposal.turnoutShare);
  elements[`${prefix}Fiscal`].textContent = percent.format(proposal.fiscalExposure);
  elements[`${prefix}Core`].textContent = `Producing core: ${integer.format(proposal.core.yes)} yes · ${integer.format(proposal.core.no)} no · ${integer.format(proposal.core.didNotVote)} did not vote`;
  elements[`${prefix}Stack`].setAttribute(
    "aria-label",
    `${proposal.yes} yes, ${proposal.no} no, ${proposal.didNotVote} did not vote`,
  );
}

let currentPayment;
let currentIncome;
let frame;

function budgetSafeMaximum(income) {
  return findBudgetSafePaymentMaximum({
    medianHouseholdIncome: income,
    profile,
    minimum: SHARED_PAYMENT_POLICY.minimum,
    maximum: SHARED_PAYMENT_POLICY.maximum,
    step: SHARED_PAYMENT_POLICY.step,
    fiscalCapShare: SHARED_PAYMENT_POLICY.fiscalCapShare,
  });
}

function enforceBudgetSafePayment() {
  if (currentIncome === undefined || currentPayment === undefined) return;
  const maximum = budgetSafeMaximum(currentIncome);
  elements.payment.max = String(maximum);
  elements.paymentMaxLabel.textContent = `${currency.format(maximum)} · 5% fiscal cap`;
  if (currentPayment > maximum) {
    currentPayment = writeSharedPayment(maximum);
    elements.payment.value = String(currentPayment);
  }
}

function render() {
  if (currentPayment === undefined || currentIncome === undefined) return;
  enforceBudgetSafePayment();
  const result = simulateReferendumLab({
    payment: currentPayment,
    medianHouseholdIncome: currentIncome,
    profile,
  });
  elements.paymentValue.value = currency.format(currentPayment);
  elements.paymentValue.textContent = currency.format(currentPayment);
  elements.incomeValue.value = currency.format(currentIncome);
  elements.incomeValue.textContent = currency.format(currentIncome);
  const householdPayment = currentPayment * 2;
  elements.householdPayment.textContent = currency.format(householdPayment);
  elements.incomeShare.textContent = percent.format(householdPayment / (currentIncome / 12));
  elements.voteWeight.textContent = `${result.expectedElection.voteWeight.toFixed(2)}×`;
  elements.exitCount.textContent = `${integer.format(result.expectedElection.exitCount)} choose B`;
  renderProposal("ab", result.abExit);
  renderProposal("cash", result.universalPayment);
  const adopted = result.abExit.passed;
  elements.referendumNextStep.dataset.adopted = String(adopted);
  elements.referendumNextTitle.textContent = adopted
    ? "AB-EXIT is adopted—the simulation can continue"
    : "AB-EXIT is not adopted—the simulation ends here";
  elements.referendumNextCopy.textContent = adopted
    ? "The remaining tests now have a purpose: they examine the consequences of introducing AB-EXIT while holding the comparison conditions constant."
    : "Without adoption, the electoral rules remain unchanged. Adjust the payment or income assumptions to test whether an adopted AB-EXIT scenario becomes possible.";
  elements.referendumNextLink.hidden = !adopted;
  window.dispatchEvent(new CustomEvent("ab-exit:referendum-result", {
    detail: { adopted },
  }));
}

function scheduleRender() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(render);
}

const sharedPayment = connectSharedPaymentControl(elements.payment, (payment) => {
  currentPayment = payment;
  enforceBudgetSafePayment();
  scheduleRender();
});
const sharedIncome = connectSharedIncomeControl(elements.income, (income) => {
  currentIncome = income;
  enforceBudgetSafePayment();
  scheduleRender();
});

try {
  currentPayment = sharedPayment.payment;
  currentIncome = sharedIncome.income;
  render();
} catch (error) {
  root.innerHTML = `<p class="error">The simulation could not start: ${error.message}</p>`;
  throw error;
}
