import Decimal from "decimal.js";
import type { Transaction } from "../types";
export const validMoney = (value: string, allowZero = false) =>
  /^\d{1,9}(\.\d{1,2})?$/.test(value) &&
  (allowZero ? new Decimal(value).gte(0) : new Decimal(value).gt(0));
export const validRate = (value: string) =>
  /^\d{1,4}(\.\d{1,6})?$/.test(value) && new Decimal(value).gt(0);
export const cents = (amount: string, currency: string, rate: string) =>
  new Decimal(amount)
    .times(currency === "USD" ? rate : 1)
    .times(100)
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP)
    .toNumber();
export function totals(
  transactions: Transaction[],
  budget: string,
  rate: string,
) {
  let income = 0,
    expense = 0;
  const categories: Record<string, number> = {};
  for (const t of transactions) {
    const n = cents(t.amount, t.currency, rate);
    if (t.type === "income") income += n;
    else {
      expense += n;
      categories[t.category] = (categories[t.category] ?? 0) + n;
    }
  }
  return {
    income,
    expense,
    remaining: cents(budget, "TWD", rate) + income - expense,
    categories,
  };
}
export const money = (n: number) =>
  new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 2,
  }).format(n / 100);
export function csv(transactions: Transaction[], rate: string) {
  const cell = (x: string) =>
    '"' + (/^[=+\-@\t\r]/.test(x) ? "'" + x : x).replaceAll('"', '""') + '"';
  return (
    "\ufeff" +
    [
      [
        "日期",
        "類型",
        "項目",
        "原始金額",
        "幣別",
        "分類",
        "備註",
        "手動 USD/TWD 匯率",
        "換算 TWD",
      ],
      ...transactions.map((t) => [
        t.date,
        t.type === "income" ? "收入" : "支出",
        t.title,
        t.amount,
        t.currency,
        t.category,
        t.note,
        rate,
        (cents(t.amount, t.currency, rate) / 100).toFixed(2),
      ]),
    ]
      .map((row) => row.map(cell).join(","))
      .join("\r\n")
  );
}
export function download(
  filename: string,
  content: string,
  type = "application/json",
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
