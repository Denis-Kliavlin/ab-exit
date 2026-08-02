export const SHARED_INCOME_POLICY = Object.freeze({
  version: "1.0.0",
  storageKey: "ab-exit.shared-income.v1",
  queryParameter: "income",
  minimum: 30000,
  maximum: 180000,
  step: 5000,
  defaultValue: 90000,
});

export function normalizeSharedIncome(value, policy = SHARED_INCOME_POLICY) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return policy.defaultValue;
  const bounded = Math.min(policy.maximum, Math.max(policy.minimum, numeric));
  const steps = Math.round((bounded - policy.minimum) / policy.step);
  return policy.minimum + steps * policy.step;
}

function defaultStorage() {
  try { return globalThis.localStorage; } catch { return null; }
}

function defaultSearch() {
  try { return globalThis.location?.search ?? ""; } catch { return ""; }
}

function safelyRead(storage, key) {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}

function safelyWrite(storage, key, value) {
  try { storage?.setItem(key, String(value)); } catch { /* Storage is optional. */ }
}

export function readSharedIncome({
  policy = SHARED_INCOME_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
} = {}) {
  const queryValue = new URLSearchParams(search).get(policy.queryParameter);
  if (queryValue !== null) return normalizeSharedIncome(queryValue, policy);
  const storedValue = safelyRead(storage, policy.storageKey);
  return storedValue === null ? policy.defaultValue : normalizeSharedIncome(storedValue, policy);
}

export function connectSharedIncomeControl(input, onChange, {
  policy = SHARED_INCOME_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
  eventTarget = globalThis,
} = {}) {
  input.min = String(policy.minimum);
  input.max = String(policy.maximum);
  input.step = String(policy.step);
  input.value = String(readSharedIncome({ policy, search, storage }));
  safelyWrite(storage, policy.storageKey, input.value);

  const emit = () => {
    const income = normalizeSharedIncome(input.value, policy);
    input.value = String(income);
    safelyWrite(storage, policy.storageKey, income);
    onChange(income);
  };
  input.addEventListener("input", emit);

  const storageListener = (event) => {
    if (event.key !== policy.storageKey || event.newValue === null) return;
    const income = normalizeSharedIncome(event.newValue, policy);
    if (Number(input.value) === income) return;
    input.value = String(income);
    onChange(income);
  };
  eventTarget?.addEventListener?.("storage", storageListener);

  return {
    income: Number(input.value),
    disconnect() {
      input.removeEventListener("input", emit);
      eventTarget?.removeEventListener?.("storage", storageListener);
    },
  };
}

export function connectSharedIncomeDisplay(onChange, {
  policy = SHARED_INCOME_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
  eventTarget = globalThis,
} = {}) {
  const income = readSharedIncome({ policy, search, storage });
  const storageListener = (event) => {
    if (event.key !== policy.storageKey || event.newValue === null) return;
    onChange(normalizeSharedIncome(event.newValue, policy));
  };
  eventTarget?.addEventListener?.("storage", storageListener);
  return {
    income,
    disconnect() { eventTarget?.removeEventListener?.("storage", storageListener); },
  };
}
