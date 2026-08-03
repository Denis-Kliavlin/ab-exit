import {
  findAssumptionFalsification,
  findNearestLoss,
  simulateUncertainty,
} from "./model.mjs";
import {
  connectSharedPaymentDisplay,
  SHARED_PAYMENT_POLICY,
} from "../shared/payment-policy.mjs";

const root = document.getElementById("underdogLab");
const elements = Object.fromEntries([
  "paymentValue",
  "resultKicker",
  "resultTitle",
  "resultCopy",
  "walkerVotes",
  "voteWeight",
  "exitCount",
  "reactivated",
  "capableCore",
  "walkerChange",
  "candidateList",
  "uncertaintyNote",
  "sourceTrack",
  "sourceLegend",
  "boundaryTitle",
  "boundaryCopy",
  "falsificationCopy",
].map((id) => [id, document.getElementById(id)]));

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
const profile = await fetch("./alaska-2022.json").then((response) => {
  if (!response.ok) throw new Error(`Could not load profile: ${response.status}`);
  return response.json();
});
const candidateById = Object.fromEntries(
  profile.candidates.map((candidate) => [candidate.id, candidate]),
);

function winnerName(candidateId) {
  return candidateById[candidateId]?.name ?? candidateId;
}

function setWidth(element, value) {
  element.style.width = `${Math.max(0, Math.min(100, value))}%`;
}

function renderCandidates(result) {
  const maximumVotes = Math.max(
    ...profile.candidates.flatMap((candidate) => [
      candidate.observedVotes,
      result.candidateVotes[candidate.id],
    ]),
  );
  elements.candidateList.replaceChildren();

  for (const candidate of profile.candidates) {
    const projected = result.candidateVotes[candidate.id];
    const row = document.createElement("div");
    row.className = `candidate-row${candidate.id === "walker" ? " candidate-row--walker" : ""}`;
    row.innerHTML = `
      <div class="candidate-name">
        <strong>${candidate.name}</strong>
        <span>${candidate.party}</span>
      </div>
      <div class="bars" aria-label="${candidate.name}: ${integer.format(candidate.observedVotes)} observed, ${integer.format(projected)} projected">
        <div class="bar-line">
          <div class="track" data-tooltip="Official 2022 first-choice votes for ${candidate.name}: ${integer.format(candidate.observedVotes)}."><div class="fill" data-observed></div></div>
          <span class="bar-value">${integer.format(candidate.observedVotes)}</span>
        </div>
        <div class="bar-line">
          <div class="track" data-tooltip="Projected first-choice votes for ${candidate.name} after introducing AB-EXIT: ${integer.format(projected)} under the central scenario."><div class="fill fill--projection" data-projected></div></div>
          <span class="bar-value">${integer.format(projected)}</span>
        </div>
      </div>`;
    setWidth(row.querySelector("[data-observed]"), candidate.observedVotes / maximumVotes * 100);
    setWidth(row.querySelector("[data-projected]"), projected / maximumVotes * 100);
    elements.candidateList.append(row);
  }
}

function walkerSourceGroups(result) {
  const sourceById = Object.fromEntries(result.walkerSources.map((entry) => [entry.id, entry.votes]));
  const existing = sourceById["walker-observed"] ?? 0;
  const reactivated = result.walkerSources
    .filter((entry) => profile.segments.find(({ id }) => id === entry.id)?.latent)
    .reduce((total, entry) => total + entry.votes, 0);
  const switchers = result.candidateVotes.walker - existing - reactivated;
  return [
    { label: "Existing Walker voters who stay", value: existing, className: "source-existing" },
    { label: "Pragmatic switchers and uncommitted", value: switchers, className: "source-switchers" },
    { label: "Historically absent voters", value: reactivated, className: "source-reactivated" },
  ];
}

function renderWalkerSources(result) {
  const groups = walkerSourceGroups(result);
  elements.sourceTrack.replaceChildren();
  elements.sourceLegend.replaceChildren();
  for (const group of groups) {
    const piece = document.createElement("span");
    piece.className = group.className;
    piece.style.width = `${group.value / result.candidateVotes.walker * 100}%`;
    piece.dataset.tooltip = `${group.label}: ${integer.format(group.value)} votes (${percent.format(group.value / result.candidateVotes.walker)} of Walker's projected total).`;
    elements.sourceTrack.append(piece);

    const item = document.createElement("div");
    item.className = "source-item";
    item.innerHTML = `<span>${group.label}</span><strong>${integer.format(group.value)}</strong>`;
    elements.sourceLegend.append(item);
  }
  elements.sourceTrack.setAttribute(
    "aria-label",
    groups.map((group) => `${group.label}: ${integer.format(group.value)}`).join("; "),
  );
}

function render(payment) {
  const uncertainty = simulateUncertainty({ payment, profile });
  const result = uncertainty.results.central;
  const walkerVotes = result.candidateVotes.walker;
  const walkerObserved = candidateById.walker.observedVotes;
  const finalRound = result.rcv.rounds.at(-1);
  const roundDescription = result.rcv.rounds.length === 1
    ? "wins the first count with a majority"
    : `wins after ${result.rcv.rounds.length} ranked-choice rounds`;

  elements.paymentValue.value = currency.format(payment);
  elements.paymentValue.textContent = currency.format(payment);
  elements.resultKicker.textContent = result.rcv.rounds.length === 1
    ? "Central-model first-round result"
    : "Central-model ranked-choice result";
  elements.resultTitle.textContent = `${winnerName(result.winner)} wins in this scenario`;
  elements.resultCopy.textContent = `Under the displayed assumptions, Walker ${roundDescription}; ${integer.format(finalRound.activeVotes)} ballots remain active in the deciding round.`;
  elements.walkerVotes.textContent = integer.format(walkerVotes);
  elements.voteWeight.textContent = `${result.voteWeight.toFixed(2)}×`;
  elements.exitCount.textContent = `${integer.format(result.exiters)} choose B · ${integer.format(result.undecided)} remain Ø`;
  elements.reactivated.textContent = integer.format(result.reactivatedNonvoters);
  elements.capableCore.textContent = `${integer.format(result.capableCore)} capable-core voters`;
  elements.walkerChange.textContent = `${(walkerVotes / walkerObserved).toFixed(2)}×`;

  renderCandidates(result);
  renderWalkerSources(result);

  elements.uncertaintyNote.textContent = uncertainty.walkerWinsAll
    ? `Walker wins in all three locked variants. Projected Walker range: ${integer.format(uncertainty.walkerRange[0])}–${integer.format(uncertainty.walkerRange[1])} votes.`
    : `The locked variants disagree. Projected Walker range: ${integer.format(uncertainty.walkerRange[0])}–${integer.format(uncertainty.walkerRange[1])} votes.`;

  const paymentLoss = findNearestLoss({ payment, profile });
  if (paymentLoss) {
    elements.boundaryTitle.textContent = "Payment boundary found";
    elements.boundaryCopy.textContent = `The nearest tested loss is at ${currency.format(paymentLoss.payment)}, where ${winnerName(paymentLoss.winner)} wins. This is a conditional result, not inevitability.`;
  } else {
    elements.boundaryTitle.textContent = "Walker wins throughout the tested payment range";
    elements.boundaryCopy.textContent = `In the central scenario Walker wins at every tested shared payment from ${currency.format(SHARED_PAYMENT_POLICY.minimum)} to ${currency.format(SHARED_PAYMENT_POLICY.maximum)}—sometimes in the first count, sometimes after ranked-choice transfers. This is model robustness, not a real-world prediction.`;
  }

  const falsification = findAssumptionFalsification({ payment, profile });
  if (falsification) {
    const oddsReduction = 1 - Math.exp(-falsification.stress);
    elements.falsificationCopy.textContent = `Walker loses only after the model jointly reduces latent participation and latent Walker-affinity odds by about ${percent.format(oddsReduction)} (logit stress ${falsification.stress.toFixed(2)}). At that boundary ${winnerName(falsification.winner)} wins and Walker has ${integer.format(falsification.walkerVotes)} votes.`;
  } else {
    elements.falsificationCopy.textContent = "No loss was found inside the configured assumption-stress range. The range must be expanded before making a robustness claim.";
  }
}

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
