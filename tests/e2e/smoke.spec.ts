import { test, expect } from "@playwright/test";
test("marketing and demo workspace routes are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /A website that gets/i }),
  ).toBeVisible();
  await page.goto("/pricing");
  await expect(
    page.getByRole("heading", { name: /Built to replace website chaos/i }),
  ).toBeVisible();
  await page.goto("/app");
  await expect(
    page.getByRole("heading", { name: /Your website, in one clear view/i }),
  ).toBeVisible();
});
