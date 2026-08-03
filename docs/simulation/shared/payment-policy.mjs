export const SHARED_PAYMENT_POLICY = Object.freeze({
  version: "1.0.0",
  storageKey: "ab-exit.shared-payment.v1",
  queryParameter: "payment",
  minimum: 500,
  maximum: 3400,
  step: 100,
  defaultValue: 2000,
  fiscalCapShare: 0.05,
  basis: "synthetic-10k-v1 reference budget; Referendum Lab applies an income-specific 5% fiscal-exposure cap",
});

export function normalizeSharedPayment(value, policy = SHARED_PAYMENT_POLICY) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return policy.defaultValue;
  const bounded = Math.min(policy.maximum, Math.max(policy.minimum, numeric));
  const steps = Math.round((bounded - policy.minimum) / policy.step);
  return policy.minimum + steps * policy.step;
}

function safelyReadStorage(storage, key) {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safelyWriteStorage(storage, key, value) {
  try {
    storage?.setItem(key, String(value));
  } catch {
    // Storage is optional; the current module still uses the normalized value.
  }
}

function defaultStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function defaultSearch() {
  try {
    return globalThis.location?.search ?? "";
  } catch {
    return "";
  }
}

export function readSharedPayment({
  policy = SHARED_PAYMENT_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
} = {}) {
  const queryValue = new URLSearchParams(search).get(policy.queryParameter);
  if (queryValue !== null) return normalizeSharedPayment(queryValue, policy);
  const storedValue = safelyReadStorage(storage, policy.storageKey);
  return storedValue === null
    ? policy.defaultValue
    : normalizeSharedPayment(storedValue, policy);
}

export function writeSharedPayment(value, {
  policy = SHARED_PAYMENT_POLICY,
  storage = defaultStorage(),
} = {}) {
  const normalized = normalizeSharedPayment(value, policy);
  safelyWriteStorage(storage, policy.storageKey, normalized);
  return normalized;
}

export function connectSharedPaymentControl(input, onChange, {
  policy = SHARED_PAYMENT_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
  eventTarget = globalThis,
} = {}) {
  input.min = String(policy.minimum);
  input.max = String(policy.maximum);
  input.step = String(policy.step);
  input.value = String(readSharedPayment({ policy, search, storage }));
  safelyWriteStorage(storage, policy.storageKey, input.value);

  const emit = () => {
    const payment = writeSharedPayment(input.value, { policy, storage });
    input.value = String(payment);
    onChange(payment);
  };
  input.addEventListener("input", emit);

  const storageListener = (event) => {
    if (event.key !== policy.storageKey || event.newValue === null) return;
    const payment = normalizeSharedPayment(event.newValue, policy);
    if (Number(input.value) === payment) return;
    input.value = String(payment);
    onChange(payment);
  };
  eventTarget?.addEventListener?.("storage", storageListener);

  return {
    payment: Number(input.value),
    disconnect() {
      input.removeEventListener("input", emit);
      eventTarget?.removeEventListener?.("storage", storageListener);
    },
  };
}

export function connectSharedPaymentDisplay(onChange, {
  policy = SHARED_PAYMENT_POLICY,
  search = defaultSearch(),
  storage = defaultStorage(),
  eventTarget = globalThis,
} = {}) {
  const payment = readSharedPayment({ policy, search, storage });

  const storageListener = (event) => {
    if (event.key !== policy.storageKey || event.newValue === null) return;
    onChange(normalizeSharedPayment(event.newValue, policy));
  };
  eventTarget?.addEventListener?.("storage", storageListener);

  return {
    payment,
    disconnect() {
      eventTarget?.removeEventListener?.("storage", storageListener);
    },
  };
}
