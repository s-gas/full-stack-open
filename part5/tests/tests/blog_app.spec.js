// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Blog app", () => {

  test.beforeEach(async ({ page, request }) => {
    await request.delete('http://localhost:3003/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: "s-gas",
        password: "00000000",
        name: "Simone Gasparini",
      }
    })
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "test",
        password: "test",
        name: "test",
      }
    })
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

  test.describe("After login", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("s-gas");
      await page.getByLabel("password").fill("00000000");
      await page.getByText("login").click();
    })

    test("user can create a new blog", async ({ page }) => {
      const createButton = page.getByText("create new blog");
      await expect(createButton).toBeVisible();
      await createButton.click();

      const title = page.getByText("create new");
      await expect(title).toBeVisible();

      await page.getByLabel("title").fill("title");
      await page.getByLabel("author").fill("author");
      await page.getByLabel("url").fill("url");

      await page.getByRole("button", { name: "create" }).click();

      const message = page.getByText("a new blog");
      await expect(message).toBeVisible();
    })

    test.describe("After blog creation", () => {
      test.beforeEach(async ({page}) => {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("title");
        await page.getByLabel("author").fill("author");
        await page.getByLabel("url").fill("url");
        await page.getByRole("button", { name: "create" }).click();
      })

      test("user can like the blog", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await page.getByRole("button", { name: "like" }).click();

        const likes = page.getByText("likes 1");
        await expect(likes).toBeVisible();
      })

      test("user can delete a blog", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        page.on('dialog', dialog => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();

        const message = page.getByText("removed");
        await expect(message).toBeVisible();
      })

      test("other user can't delete", async ({ page }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await page.getByLabel("username").fill("test");
        await page.getByLabel("password").fill("test");
        await page.getByRole("button", { name: "login" }).click();
        await page.getByRole("button", { name: "view" }).click();

        const removeButton = page.getByRole("button", { name: "remove" });
        await expect(removeButton).not.toBeVisible();
      })
    })
  })
});
