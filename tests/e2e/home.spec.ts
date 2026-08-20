import { test, expect } from '@playwright/test';

// tests home page renders correct content
test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Ancient World Digital Library/);
  });

  test('shows AWDL intro text', async ({ page }) => {
    await expect(page.locator('.intro').getByText('The Ancient World Digital Library')).toBeVisible();
    await expect(page.locator('.intro').getByRole('link', { name: 'Institute for the Study of the Ancient World' })).toBeVisible();
  });

  test('shows "Recently Added Titles" section', async ({ page }) => {
    await expect(page.getByText('Recently Added Titles')).toBeVisible();
  });

  test('recently added titles contains book items', async ({ page }) => {
    const tabPanel = page.locator('#recently-added-titles');
    await expect(tabPanel).toBeVisible();
    await expect(tabPanel.locator('li, article, .item').first()).toBeVisible();
  });

  test('"READ MORE…" link navigates to /about', async ({ page }) => {
    await page.getByRole('link', { name: /READ MORE/i }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('ISAW Library Blog sidebar is visible', async ({ page }) => {
    await expect(page.getByText('ISAW Library Blog')).toBeVisible();
  });

  test('Content container is visible', async ({ page }) => {
    await expect(page.locator('main#mainContent')).toBeVisible();
  });
});
