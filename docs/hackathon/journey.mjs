import { readSharedPayment } from "./shared/payment-policy.mjs";
import { readSharedIncome } from "./shared/income-policy.mjs";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const payment = readSharedPayment();
const income = readSharedIncome();
document.getElementById("paymentValue").textContent = currency.format(payment);
document.getElementById("incomeValue").textContent = currency.format(income);

const order = ["referendum", "equal-budget", "awareness", "underdog"];
let visited = [];
try {
  visited = JSON.parse(localStorage.getItem("ab-exit.judge-journey.visited.v1") ?? "[]");
  if (!Array.isArray(visited)) visited = [];
  visited = visited.filter((id) => order.includes(id));
} catch {
  visited = [];
}

for (const step of document.querySelectorAll("[data-step]")) {
  step.dataset.visited = String(visited.includes(step.dataset.step));
}
document.getElementById("progressCopy").textContent = `${visited.length} of 4 tests opened`;
const firstUnvisited = order.find((id) => !visited.includes(id));
const startLink = document.getElementById("startLink");
if (firstUnvisited) {
  startLink.href = `./${firstUnvisited === "referendum" ? "referendum-lab" : firstUnvisited === "equal-budget" ? "equal-budget-lab" : firstUnvisited === "awareness" ? "awareness-lab" : "underdog-election-lab"}/index.html`;
  startLink.textContent = visited.length ? "Continue testing →" : "Test AB-EXIT →";
} else {
  startLink.href = "./referendum-lab/index.html";
  startLink.textContent = "Run it again →";
}

if (new URLSearchParams(location.search).has("complete")) {
  document.getElementById("completeMessage").hidden = false;
}
