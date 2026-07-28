// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Blog app", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test("shows the login page", async ({ page }) => {
    const title = page.getByText("Log in to application")
    await expect(title).toBeVisible();
  });

  test.describe("Login", () => {
    test("succeeds with right credentials", async ({ page }) => {
      await page.getByLabel("username").fill("s-gas");
      await page.getByLabel("password").fill("00000000");
      await page.getByText("login").click();

      const title = page.getByText("blogs");
      await expect(title).toBeVisible();
    })
  });
});
