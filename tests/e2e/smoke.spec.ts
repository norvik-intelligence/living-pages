import { test, expect } from "@playwright/test";
test("marketing and demo workspace routes are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Build once/i }),
  ).toBeVisible();
  await page.goto("/pricing");
  await expect(
    page.getByRole("heading", { name: /Pay for leverage/i }),
  ).toBeVisible();
  await page.goto("/app");
  await expect(
    page.getByRole("heading", { name: /Good evening/i }),
  ).toBeVisible();
});
