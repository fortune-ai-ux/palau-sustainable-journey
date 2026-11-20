import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { TripDay, CheckItem } from "../src/types";
const defaultDays: TripDay[] = JSON.parse(readFileSync(new URL('../src/data/itinerary.json', import.meta.url), 'utf8'));
const defaultChecklist: CheckItem[] = JSON.parse(readFileSync(new URL('../src/data/checklist.json', import.meta.url), 'utf8'));
import { swapWeatherDays } from "../src/lib/contentUpdates";

test("weather schedule, maps, place dates and rain checklist are published", async ({
  page,
}) => {
  await page.goto("/itinerary?day=9");
  await expect(
    page.getByText("因海況不佳，行程已調整", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".day-heading")).toContainText("永續生態田野調查");
  await expect(page.locator(".activity-card")).toHaveCount(1);
  await expect(page.locator(".activity-card")).toContainText(
    "帛琉當地特有種鳥類與生態解析",
  );
  await expect(page.getByRole("link", { name: /Google Maps/ })).toHaveCount(0);
  await page.getByRole("button", { name: "DAY 13 08/10" }).click();
  await expect(page.locator(".activity-card")).toHaveCount(2);
  await expect(page.locator(".day-content")).toContainText("BUL 垂釣文化體驗");
  await expect(page.getByRole("link", { name: /Google Maps/ })).toHaveAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=Rock%20Islands%20Southern%20Lagoon%20Palau",
  );
  await expect(
    page.getByText("因海況不佳，行程已調整", { exact: true }),
  ).toHaveCount(0);
  await page.goto("/attractions/rock");
  await expect(
    page.getByRole("link", { name: "Day 13 · 08/10" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Day 9 · 08/06" })).toHaveCount(
    0,
  );
  await page.goto("/checklist");
  await page.getByLabel("雨衣／防水袋", { exact: true }).check();
  await page.reload();
  await expect(page.getByLabel("雨衣／防水袋", { exact: true })).toBeChecked();
});

test("existing local data migrates once without losing personal records", async ({
  page,
}) => {
  const legacyDays = swapWeatherDays(structuredClone(defaultDays));
  legacyDays[8].activities[0].description = "保留我的海域筆記";
  legacyDays[8].activities.push({
    ...legacyDays[8].activities[0],
    id: "personal",
    title: "自訂記錄",
    isCustom: true,
  });
  const checks = structuredClone(defaultChecklist).filter(
    (x) => x.id !== "check-rain-2027",
  );
  checks[0].checked = true;
  await page.goto("/");
  await page.evaluate(
    ({ legacyDays, checks }) => {
      localStorage.setItem(
        "palau:v1:days",
        JSON.stringify({ version: 1, data: legacyDays }),
      );
      localStorage.setItem(
        "palau:v1:checklist",
        JSON.stringify({ version: 1, data: checks }),
      );
      localStorage.setItem(
        "palau:v1:settings",
        JSON.stringify({ version: 1, data: { budget: "12345", rate: "31" } }),
      );
      localStorage.setItem(
        "palau:v1:transactions",
        JSON.stringify({
          version: 1,
          data: [
            {
              id: "kept",
              type: "expense",
              title: "保留餐費",
              amount: "10",
              currency: "TWD",
              category: "餐飲",
              date: "2027-08-06",
              note: "",
            },
          ],
        }),
      );
    },
    { legacyDays, checks },
  );
  await page.goto("/itinerary?day=13");
  await expect(page.locator(".day-content")).toContainText("保留我的海域筆記");
  await expect(
    page.getByRole("heading", { name: "自訂記錄", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator(".day-content")).toContainText("保留我的海域筆記");
  await page.goto("/checklist");
  await expect(page.getByLabel("護照", { exact: true })).toBeChecked();
  await expect(page.getByLabel("雨衣／防水袋", { exact: true })).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel("雨衣／防水袋", { exact: true })).toHaveCount(1);
  await page.goto("/budget");
  await expect(page.getByRole("heading", { name: "保留餐費" })).toBeVisible();
  await expect(page.locator(".stat-card").first()).toContainText("12,345.00");
});
