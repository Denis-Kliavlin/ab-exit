import assert from "node:assert/strict";
import test from "node:test";
import {
  connectSharedIncomeControl,
  connectSharedIncomeDisplay,
  normalizeSharedIncome,
  readSharedIncome,
  SHARED_INCOME_POLICY,
} from "./income-policy.mjs";

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  };
}

test("income is stepped and bounded", () => {
  assert.equal(normalizeSharedIncome(0), 30000);
  assert.equal(normalizeSharedIncome(92500), 95000);
  assert.equal(normalizeSharedIncome(999999), 180000);
});

test("first-module control writes the shared income", () => {
  const storage = memoryStorage();
  const input = new EventTarget();
  input.value = "";
  const changes = [];
  const connection = connectSharedIncomeControl(input, (income) => changes.push(income), {
    storage,
    eventTarget: new EventTarget(),
    search: "",
  });
  assert.equal(connection.income, SHARED_INCOME_POLICY.defaultValue);
  input.value = "120000";
  input.dispatchEvent(new Event("input"));
  assert.equal(readSharedIncome({ storage, search: "" }), 120000);
  assert.deepEqual(changes, [120000]);
});

test("downstream display reads income without writing it", () => {
  const storage = memoryStorage({ [SHARED_INCOME_POLICY.storageKey]: "75000" });
  const store = storage.setItem;
  let writes = 0;
  storage.setItem = (...args) => { writes += 1; store(...args); };
  const connection = connectSharedIncomeDisplay(() => {}, {
    storage,
    eventTarget: new EventTarget(),
    search: "",
  });
  assert.equal(connection.income, 75000);
  assert.equal(writes, 0);
});
