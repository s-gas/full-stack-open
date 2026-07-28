// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Blog app", () => {

  test.beforeEach(async ({ page, request }) => {
    await request.delete('http://localhost:3003/api/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "s-gas",
        password: "00000000",
        name: "Simone Gasparini",
    } })
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

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("s-gas");
      await page.getByLabel("password").fill("wrong-password");
      await page.getByText("login").click();

      const errorMessage = page.getByText("wrong username or password");
      await expect(errorMessage).toBeVisible();
    })
  });
});
