import { describe, it, expect, vi } from "vitest";
import { cents, totals, csv, validMoney, validRate } from "./money";
import {
  readStored,
  validDays,
  validChecks,
  validTransactions,
  validSettings,
} from "./storage";
import { defaultDays, defaultChecklist } from "../data";
import { places, mapsUrl } from "../data/places";
import type { Transaction } from "../types";
const transaction: Transaction = {
  id: "a",
  type: "expense",
  title: "午餐",
  amount: "0.1",
  currency: "USD",
  category: "餐飲",
  date: "2027-07-29",
  note: "",
};
describe("money", () => {
  it("rounds decimal USD conversion to cents without float errors", () => {
    expect(cents("0.1", "USD", "32.15")).toBe(322);
    expect(cents("0.29", "TWD", "1")).toBe(29);
  });
  it("calculates income expenses remaining and categories", () => {
    expect(
      totals(
        [
          { ...transaction, amount: "10.01" },
          {
            ...transaction,
            id: "b",
            type: "income",
            currency: "TWD",
            amount: "100",
          },
        ],
        "1000",
        "32",
      ),
    ).toEqual({
      income: 10000,
      expense: 32032,
      remaining: 77968,
      categories: { 餐飲: 32032 },
    });
  });
  it("validates monetary bounds", () => {
    for (const s of [
      "-1",
      "0",
      "1.234",
      "NaN",
      "Infinity",
      "1e3",
      "1000000000",
    ])
      expect(validMoney(s)).toBe(false);
    expect(validMoney("0", true)).toBe(true);
    expect(validRate("0")).toBe(false);
    expect(validRate("32.123456")).toBe(true);
  });
  it("exports original currency and neutralizes CSV formulas", () => {
    const result = csv(
      [{ ...transaction, title: '=HYPERLINK("evil")', note: "a,b\nline" }],
      "32",
    );
    expect(result).toContain("'=HYPERLINK");
    expect(result).toContain("USD");
    expect(result).toContain('"a,b\nline"');
  });
});
describe("defaults and resilient storage", () => {
  it("preserves all dates and activities", () => {
    expect(defaultDays).toHaveLength(15);
    expect(defaultDays.flatMap((d) => d.activities)).toHaveLength(45);
    expect(defaultDays[14].date).toBe("2027-08-12");
    expect(
      defaultDays.flatMap((d) => d.activities).every((a) => a.time === null),
    ).toBe(true);
    expect(defaultChecklist).toHaveLength(33);
    expect(places).toHaveLength(16);
  });
  it("validates defaults and rejects corrupt shapes", () => {
    expect(validDays(defaultDays)).toBe(true);
    expect(validChecks(defaultChecklist)).toBe(true);
    expect(validDays([{ activities: null }])).toBe(false);
    expect(validTransactions([{ ...transaction, amount: "NaN" }])).toBe(false);
    expect(validSettings({ budget: "0", rate: "0" })).toBe(false);
  });
  it("handles invalid JSON without overwriting original storage", () => {
    const setItem = vi.fn();
    vi.stubGlobal("localStorage", { getItem: () => "{bad", setItem });
    const result = readStored("days", defaultDays, validDays);
    expect(result.error).toBeTruthy();
    expect(result.value).toEqual(defaultDays);
    expect(setItem).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
  it("rejects unknown storage versions", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => JSON.stringify({ version: 99, data: defaultDays }),
    });
    expect(readStored("days", defaultDays, validDays).error).toBeTruthy();
    vi.unstubAllGlobals();
  });
  it("uses encoded official maps search URLs", () =>
    expect(mapsUrl("帛琉 & 海洋")).toBe(
      "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("帛琉 & 海洋"),
    ));
});
