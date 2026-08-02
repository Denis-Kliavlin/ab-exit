import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  findBudgetSafePaymentMaximum,
  simulateReferendumLab,
} from "../referendum-lab/model.mjs";
import {
  connectSharedPaymentControl,
  connectSharedPaymentDisplay,
  normalizeSharedPayment,
  readSharedPayment,
  SHARED_PAYMENT_POLICY,
  writeSharedPayment,
} from "./payment-policy.mjs";

const referendumProfile = JSON.parse(
  await readFile(new URL("../referendum-lab/defaults.json", import.meta.url), "utf8"),
);

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  };
}

test("shared payment is positive, stepped, and bounded", () => {
  assert.equal(normalizeSharedPayment(0), SHARED_PAYMENT_POLICY.minimum);
  assert.equal(normalizeSharedPayment(2049), 2000);
  assert.equal(normalizeSharedPayment(99999), SHARED_PAYMENT_POLICY.maximum);
});

test("downstream displays inherit payment without becoming writers", () => {
  const storage = memoryStorage({ [SHARED_PAYMENT_POLICY.storageKey]: "2300" });
  const store = storage.setItem;
  let writes = 0;
  storage.setItem = (...args) => {
    writes += 1;
    store(...args);
  };
  const eventTarget = new EventTarget();
  const changes = [];
  const connection = connectSharedPaymentDisplay((payment) => {
    changes.push(payment);
  }, { storage, eventTarget, search: "" });

  assert.equal(connection.payment, 2300);
  assert.equal(writes, 0);

  const storageEvent = new Event("storage");
  Object.defineProperties(storageEvent, {
    key: { value: SHARED_PAYMENT_POLICY.storageKey },
    newValue: { value: "3100" },
  });
  eventTarget.dispatchEvent(storageEvent);
  assert.deepEqual(changes, [3100]);
  assert.equal(writes, 0);
  connection.disconnect();
});

test("query value overrides the stored cross-game value", () => {
  const storage = memoryStorage({ [SHARED_PAYMENT_POLICY.storageKey]: "1700" });
  assert.equal(readSharedPayment({ search: "?payment=2300", storage }), 2300);
  assert.equal(readSharedPayment({ search: "", storage }), 1700);
  assert.equal(writeSharedPayment(2600, { storage }), 2600);
  assert.equal(readSharedPayment({ search: "", storage }), 2600);
});

test("connected controls persist changes and receive cross-game storage updates", () => {
  const storage = memoryStorage();
  const eventTarget = new EventTarget();
  const input = new EventTarget();
  input.value = "";
  const changes = [];
  const connection = connectSharedPaymentControl(input, (payment) => {
    changes.push(payment);
  }, { storage, eventTarget, search: "" });

  assert.equal(connection.payment, SHARED_PAYMENT_POLICY.defaultValue);
  input.value = "2700";
  input.dispatchEvent(new Event("input"));
  assert.equal(readSharedPayment({ storage, search: "" }), 2700);
  assert.deepEqual(changes, [2700]);

  const storageEvent = new Event("storage");
  Object.defineProperties(storageEvent, {
    key: { value: SHARED_PAYMENT_POLICY.storageKey },
    newValue: { value: "3100" },
  });
  eventTarget.dispatchEvent(storageEvent);
  assert.equal(input.value, "3100");
  assert.deepEqual(changes, [2700, 3100]);
  connection.disconnect();
});

test("dynamic maximum enforces the five-percent cap across every displayed income", () => {
  for (let income = 30000; income <= 180000; income += 5000) {
    const maximum = findBudgetSafePaymentMaximum({
      medianHouseholdIncome: income,
      profile: referendumProfile,
      minimum: SHARED_PAYMENT_POLICY.minimum,
      maximum: SHARED_PAYMENT_POLICY.maximum,
      step: SHARED_PAYMENT_POLICY.step,
      fiscalCapShare: SHARED_PAYMENT_POLICY.fiscalCapShare,
    });
    const safe = simulateReferendumLab({
      payment: maximum,
      medianHouseholdIncome: income,
      profile: referendumProfile,
    });
    assert.ok(safe.abExit.fiscalExposure <= SHARED_PAYMENT_POLICY.fiscalCapShare);

    if (maximum < SHARED_PAYMENT_POLICY.maximum) {
      const excluded = simulateReferendumLab({
        payment: maximum + SHARED_PAYMENT_POLICY.step,
        medianHouseholdIncome: income,
        profile: referendumProfile,
      });
      assert.ok(excluded.abExit.fiscalExposure > SHARED_PAYMENT_POLICY.fiscalCapShare);
    }
  }
  assert.equal(findBudgetSafePaymentMaximum({
    medianHouseholdIncome: 30000,
    profile: referendumProfile,
    minimum: SHARED_PAYMENT_POLICY.minimum,
    maximum: SHARED_PAYMENT_POLICY.maximum,
    step: SHARED_PAYMENT_POLICY.step,
    fiscalCapShare: SHARED_PAYMENT_POLICY.fiscalCapShare,
  }), 2700);
});
