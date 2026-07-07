import { test, expect } from '@playwright/test';

test.describe('404 page', () => {
  test('visiting a non-existent URL renders the 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('body')).toBeVisible();
    // should not be a server crash — page should still render
    await expect(page.locator('nav.navbar')).toBeVisible();
  });

  test('navbar search is still functional on 404 page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('form[role="search"]')).toBeVisible();
  });
});
