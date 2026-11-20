import { test, expect } from "@playwright/test";
for (const width of [375, 768, 1024, 1440])
  test(`all routes fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const path of [
      "/",
      "/itinerary",
      "/attractions",
      "/checklist",
      "/budget",
      "/about",
      "/attractions/rock",
    ]) {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.forEach((img) => img.setAttribute("loading", "eager")),
        );
      await expect
        .poll(() =>
          page
            .locator("img")
            .evaluateAll((imgs) =>
              imgs.every(
                (img) =>
                  (img as HTMLImageElement).complete &&
                  (img as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        )
        .toBe(true);
    }
    expect(errors).toEqual([]);
    await page.goto("/");
    await page.screenshot({
      path: `../../work/home-${width}.png`,
      fullPage: true,
    });
  });
test("checklist persists across reload and supports custom delete/reset", async ({
  page,
}) => {
  await page.goto("/checklist");
  await page.getByLabel("護照", { exact: true }).check();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "3",
  );
  await page.reload();
  await expect(page.getByLabel("護照", { exact: true })).toBeChecked();
  await page.getByLabel("自訂準備項目").fill("測試水鞋");
  await page.getByRole("button", { name: "新增項目" }).click();
  await expect(page.getByLabel("測試水鞋", { exact: true })).toBeVisible();
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "刪除測試水鞋" }).click();
  await expect(page.getByLabel("測試水鞋", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "重設清單" }).click();
  await expect(page.getByLabel("護照", { exact: true })).not.toBeChecked();
});
test("ledger CRUD conversion persistence search and export", async ({
  page,
}) => {
  await page.goto("/budget");
  await page.getByRole("button", { name: "預算與匯率設定" }).click();
  await page.getByLabel("旅遊總預算（TWD）").fill("1000");
  await page.getByLabel("1 USD 換算 TWD（手動設定）").fill("32");
  await page.getByRole("button", { name: "儲存設定" }).click();
  await page.getByRole("button", { name: "新增收支" }).click();
  await page.getByLabel("項目名稱").fill("測試午餐");
  await page.getByLabel("金額", { exact: true }).fill("10.01");
  await page.getByLabel("幣別", { exact: true }).selectOption("USD");
  await page.getByRole("button", { name: "儲存交易" }).click();
  await expect(page.locator(".stat-card").nth(2)).toContainText("320.32");
  await expect(page.locator(".stat-card").nth(3)).toContainText("679.68");
  await page.reload();
  await expect(page.getByRole("heading", { name: "測試午餐" })).toBeVisible();
  await page.getByRole("button", { name: "修改測試午餐" }).click();
  await page.getByLabel("金額", { exact: true }).fill("20");
  await page.getByRole("button", { name: "儲存交易" }).click();
  await expect(page.locator(".stat-card").nth(2)).toContainText("640.00");
  await page.getByRole("button", { name: "新增收支" }).click();
  await page.getByLabel("收支類型").selectOption("income");
  await page.getByLabel("項目名稱").fill("測試收入");
  await page.getByLabel("金額", { exact: true }).fill("100");
  await page.getByRole("button", { name: "儲存交易" }).click();
  await expect(page.locator(".stat-card").nth(3)).toContainText("460.00");
  await page.getByLabel("搜尋交易").fill("無結果");
  await expect(page.getByText("沒有符合條件的紀錄。")).toBeVisible();
  await page.getByLabel("搜尋交易").fill("");
  const dl = page.waitForEvent("download");
  await page.getByRole("button", { name: "匯出 CSV" }).click();
  expect((await dl).suggestedFilename()).toBe("palau-transactions.csv");
  page.on("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "刪除測試午餐" }).click();
  await expect(page.getByRole("heading", { name: "測試午餐" })).toHaveCount(0);
});
test("itinerary days edit add delete restore and persistent route state", async ({
  page,
}) => {
  await page.goto("/itinerary");
  await expect(page.locator(".day-nav button")).toHaveCount(15);
  await page.getByRole("button", { name: "DAY 10 08/07" }).click();
  await expect(page.locator(".day-heading")).toContainText(
    "帛琉海域周邊人文生態體察 II",
  );
  await page.getByRole("button", { name: "新增活動" }).click();
  await page.getByLabel("活動名稱").fill("測試活動");
  await page.getByRole("button", { name: "儲存活動" }).click();
  await page.reload();
  await expect(page.getByRole("heading", { name: "測試活動" })).toBeVisible();
  await page.getByRole("button", { name: "編輯測試活動" }).click();
  await page.getByLabel("活動名稱").fill("已修改活動");
  await page.getByRole("button", { name: "儲存活動" }).click();
  await expect(page.getByRole("heading", { name: "已修改活動" })).toBeVisible();
  page.on("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "刪除已修改活動" }).click();
  await expect(page.getByRole("heading", { name: "已修改活動" })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "還原原始行程" }).click();
  await expect(page.locator(".activity-card")).toHaveCount(6);
});
test("attraction filters maps and mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "開啟選單" }).click();
  await page.getByRole("link", { name: "景點介紹", exact: true }).click();
  await page.getByRole("button", { name: "海洋生態", exact: true }).click();
  await expect(page.locator(".place-card")).toHaveCount(2);
  const map = page.getByRole("link", { name: /Google Maps/ }).first();
  await expect(map).toHaveAttribute("target", "_blank");
  await expect(map).toHaveAttribute(
    "href",
    /https:\/\/www.google.com\/maps\/search\/\?api=1&query=/,
  );
  await page.getByRole("link", { name: "洛克群島", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("洛克群島");
});
test("corrupted storage recovers visibly and blocked storage reports failure", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.setItem("palau:v1:days", "invalid"));
  await page.reload();
  await expect(page.getByRole("alert")).toContainText("資料無法讀取");
  await page.goto("/itinerary");
  await expect(page.locator(".activity-card")).toHaveCount(5);
  await page.goto("/checklist");
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("quota", "QuotaExceededError");
    };
  });
  await page
    .getByLabel("護照", { exact: true })
    .check()
    .catch(() => {});
  await expect(page.getByRole("status")).toContainText("儲存失敗");
  await expect(page.getByLabel("護照", { exact: true })).not.toBeChecked();
});
