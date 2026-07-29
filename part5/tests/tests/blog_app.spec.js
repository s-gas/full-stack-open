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
    await page.goto('http://localhost:5173');
  });

  test("login succeeds with correct credentials", async ({ page }) => {
    const loginLink = page.getByRole("link", { name: "login" })
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    const header = page.getByRole("heading", { name: "log in to application" })
    await expect(header).toBeVisible();

    await page.getByLabel("username").fill("s-gas")
    await page.getByLabel("password").fill("00000000")
    await page.getByRole("button", { name: "login" }).click();

    await expect(page).toHaveURL("http://localhost:5173/")
  })

  test("login fails with wrong credentials", async ({ page }) => {

    const loginLink = page.getByRole("link", { name: "login" })
    await expect(loginLink).toBeVisible();
    await loginLink.click();

    const header = page.getByRole("heading", { name: "log in to application" })
    await expect(header).toBeVisible();

    await page.getByLabel("username").fill("00000000")
    await page.getByLabel("password").fill("00000000")
    await page.getByRole("button", { name: "login" }).click();

    const message = page.getByText("wrong username or password")
    await expect(message).toBeVisible();
  })

  test.describe("after login", () => {
    test.beforeEach(async ({ page }) => {
      const loginLink = page.getByRole("link", { name: "login" })
      await expect(loginLink).toBeVisible();
      await loginLink.click();

      const header = page.getByRole("heading", { name: "log in to application" })
      await expect(header).toBeVisible();

      await page.getByLabel("username").fill("s-gas")
      await page.getByLabel("password").fill("00000000")
      await page.getByRole("button", { name: "login" }).click();
    })

    test("user can create a blog", async ({ page }) => {
      const createBlogLink = page.getByRole("link", { name: "new blog" })
      await expect(createBlogLink).toBeVisible();
      await createBlogLink.click();

      const header = page.getByRole("heading", { name: "create new" })
      await expect(header).toBeVisible();

      await page.getByLabel("title:").fill("A fake blog")
      await page.getByLabel("author:").fill("Unknown")
      await page.getByLabel("url:").fill("https://www.example.com")
      await page.getByRole("button", { name: "create" }).click();

      await expect(page).toHaveURL("http://localhost:5173/")
    })

    test.describe("after blog creation", () => {
      test.beforeEach(async ({ page }) => {
        const createBlogLink = page.getByRole("link", { name: "new blog" })
        await expect(createBlogLink).toBeVisible();
        await createBlogLink.click();

        const header = page.getByRole("heading", { name: "create new" })
        await expect(header).toBeVisible();

        await page.getByLabel("title:").fill("A fake blog")
        await page.getByLabel("author:").fill("Unknown")
        await page.getByLabel("url:").fill("https://www.example.com")
        await page.getByRole("button", { name: "create" }).click();

        await expect(page).toHaveURL("http://localhost:5173/")
      })

      test("user can like a blog", async ({ page }) => {
        const blog = page.getByRole("link", { name: "A fake blog" });
        await expect(blog).toBeVisible();

        await blog.click();

        const header = page.getByRole("heading", { name: "Unknown: A fake blog" });
        await expect(header).toBeVisible();

        const likeButton = page.getByRole("button", { name: "like" });
        await expect(likeButton).toBeVisible();

        await likeButton.click();
        const numLikes = page.getByText("likes 1");
        await expect(numLikes).toBeVisible();
      })

      test("user can delete a blog", async ({ page }) => {
        const blog = page.getByRole("link", { name: "A fake blog" });
        await expect(blog).toBeVisible();

        await blog.click();

        const header = page.getByRole("heading", { name: "Unknown: A fake blog" });
        await expect(header).toBeVisible();

        const removeButton = page.getByRole("button", { name: "remove" });
        await expect(removeButton).toBeVisible();
        page.on('dialog', dialog => dialog.accept());
        await removeButton.click();

        await expect(page).toHaveURL("http://localhost:5173/");
      })
    })
  })
})
