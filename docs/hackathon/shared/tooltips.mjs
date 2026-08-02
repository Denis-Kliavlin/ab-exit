const tooltip = document.createElement("div");
tooltip.className = "chart-tooltip";
tooltip.setAttribute("role", "tooltip");
tooltip.setAttribute("aria-hidden", "true");
document.body.append(tooltip);

let active;

function copyFor(element) {
  if (element.dataset.tooltip) return element.dataset.tooltip;
  if (element.matches('input[type="range"]')) {
    const label = document.querySelector(`label[for="${element.id}"]`)?.textContent?.trim() || "Scenario control";
    const output = document.querySelector(`output[for~="${element.id}"]`)?.textContent?.trim() || element.value;
    return `${label}: ${output}. Drag to change the scenario.`;
  }
  return element.getAttribute("aria-label") || "";
}

function position(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event?.clientX || rect.left + rect.width / 2;
  const y = event?.clientY || rect.top;
  const width = tooltip.offsetWidth;
  const height = tooltip.offsetHeight;
  tooltip.style.left = `${Math.max(12, Math.min(x - width / 2, innerWidth - width - 12))}px`;
  tooltip.style.top = `${Math.max(12, y - height - 12)}px`;
}

function show(element, event) {
  const copy = copyFor(element);
  if (!copy) return;
  active = element;
  tooltip.textContent = copy;
  tooltip.dataset.open = "true";
  tooltip.setAttribute("aria-hidden", "false");
  position(event, element);
}

function hide(element) {
  if (element && active !== element) return;
  active = undefined;
  tooltip.dataset.open = "false";
  tooltip.setAttribute("aria-hidden", "true");
}

document.addEventListener("pointerover", (event) => {
  const target = event.target.closest("[data-tooltip], input[type='range'], [role='img'][aria-label]");
  if (target) show(target, event);
});
document.addEventListener("pointermove", (event) => {
  if (active && event.pointerType === "mouse") position(event, active);
});
document.addEventListener("pointerout", (event) => {
  const target = event.target.closest("[data-tooltip], input[type='range'], [role='img'][aria-label]");
  if (target && !target.contains(event.relatedTarget)) hide(target);
});
document.addEventListener("focusin", (event) => {
  const target = event.target.closest("[data-tooltip], input[type='range'], [role='img'][aria-label]");
  if (target) show(target);
});
document.addEventListener("focusout", () => hide());
document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest("[data-tooltip], input[type='range'], [role='img'][aria-label]");
  if (target) show(target, event);
});

function markTargets() {
  document.querySelectorAll("[data-tooltip], input[type='range'], [role='img'][aria-label]").forEach((element) => {
    element.classList.add("has-tooltip");
    if (!element.matches("input, button, a") && !element.hasAttribute("tabindex")) element.tabIndex = 0;
  });
}

markTargets();
new MutationObserver(markTargets).observe(document.body, { childList: true, subtree: true });
