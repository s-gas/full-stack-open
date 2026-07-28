// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Blog app", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('shows the login page', async ({ page }) => {
    const title = page.getByText("Log in to application")
    await expect(title).toBeVisible();
  });
});
