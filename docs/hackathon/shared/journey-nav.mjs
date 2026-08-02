const steps = [
  { id: "referendum", label: "Referendum", href: "../referendum-lab/index.html" },
  { id: "equal-budget", label: "Equal budget", href: "../equal-budget-lab/index.html" },
  { id: "awareness", label: "Awareness", href: "../awareness-lab/index.html" },
  { id: "underdog", label: "Real election", href: "../underdog-election-lab/index.html" },
];
const currentId = document.body.dataset.journeyStep;
const currentIndex = steps.findIndex((step) => step.id === currentId);

if (currentIndex >= 0) {
  const visitedKey = "ab-exit.judge-journey.visited.v1";
  let visited = [];
  try {
    visited = JSON.parse(localStorage.getItem(visitedKey) ?? "[]");
    if (!Array.isArray(visited)) visited = [];
    if (!visited.includes(currentId)) visited.push(currentId);
    localStorage.setItem(visitedKey, JSON.stringify(visited));
  } catch {
    visited = [currentId];
  }

  const style = document.createElement("style");
  style.textContent = `
    .abj-nav { border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent); background: color-mix(in srgb, Canvas 94%, transparent); color: CanvasText; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    .abj-inner { width: min(1120px, calc(100% - 28px)); margin: 0 auto; padding: 11px 0; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 18px; align-items: center; }
    .abj-home { color: inherit; font-weight: 750; text-decoration: none; white-space: nowrap; }
    .abj-steps { display: flex; justify-content: center; gap: 5px; margin: 0; padding: 0; list-style: none; }
    .abj-step { display: inline-flex; align-items: center; gap: 5px; padding: 5px 8px; border-radius: 999px; color: color-mix(in srgb, currentColor 66%, transparent); text-decoration: none; font-size: .78rem; white-space: nowrap; }
    .abj-step::before { content: attr(data-number); display: grid; width: 19px; height: 19px; place-items: center; border: 1px solid color-mix(in srgb, currentColor 24%, transparent); border-radius: 50%; font-size: .68rem; }
    .abj-step[aria-current="step"] { background: color-mix(in srgb, currentColor 10%, transparent); color: inherit; font-weight: 700; }
    .abj-step[data-visited="true"]::before { background: currentColor; color: Canvas; }
    .abj-next { color: inherit; font-weight: 700; text-decoration: none; white-space: nowrap; }
    @media (max-width: 820px) {
      .abj-inner { grid-template-columns: 1fr auto; }
      .abj-steps { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; overflow-x: auto; padding-bottom: 2px; }
      .abj-step { padding-inline: 6px; }
    }
    @media (max-width: 480px) { .abj-step span { display: none; } }
  `;
  document.head.append(style);

  const nav = document.createElement("nav");
  nav.className = "abj-nav";
  nav.setAttribute("aria-label", "AB-EXIT judge journey");
  const next = steps[currentIndex + 1];
  nav.innerHTML = `
    <div class="abj-inner">
      <a class="abj-home" href="../index.html">AB-EXIT · Judge Journey</a>
      <ol class="abj-steps">
        ${steps.map((step, index) => `
          <li><a class="abj-step" href="${step.href}" data-number="${index + 1}" data-visited="${visited.includes(step.id)}" ${step.id === currentId ? 'aria-current="step"' : ""}><span>${step.label}</span></a></li>
        `).join("")}
      </ol>
      <a class="abj-next" href="${next?.href ?? "../complete/index.html"}">${next ? "Next →" : "Finish →"}</a>
    </div>`;
  document.body.prepend(nav);

  if (currentId === "referendum") {
    const nextLink = nav.querySelector(".abj-next");
    window.addEventListener("ab-exit:referendum-result", (event) => {
      const adopted = event.detail?.adopted === true;
      nextLink.hidden = !adopted;
      nextLink.textContent = adopted ? "Continue →" : "Not adopted";
      nextLink.setAttribute("aria-disabled", String(!adopted));
    });
  }
}
