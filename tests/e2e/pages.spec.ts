import { test, expect } from '@playwright/test';

// static pages render correct headings & content
test.describe('Static pages', () => {
  // about
  test.describe('About', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/about', { waitUntil: 'domcontentloaded' });
    });

    test('loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/about/);
    });

    test('has correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/About.*Ancient World Digital Library/);
    });

    test('shows About heading', async ({ page }) => {
      await expect(page.locator('main').getByRole('heading', { name: 'About', exact: true })).toBeVisible();
    });

    test('shows main content', async ({ page }) => {
      await expect(page.locator('main#mainContent')).toBeVisible();
      await expect(page.locator('.maintext')).toBeVisible();
    });

    test('shows ISAW library sidebar', async ({ page }) => {
      await expect(page.getByText('About the ISAW library')).toBeVisible();
    });
  });

  // partners
  test.describe('Partners', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/partners', { waitUntil: 'domcontentloaded' });
    });

    test('loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/partners/);
    });

    test('has correct page title', async ({ page }) => {
      await expect(page).toHaveTitle(/Ancient World Digital Library/);
    });

    test('has main content container', async ({ page }) => {
      await expect(page.locator('main#mainContent')).toBeVisible();
    });
  });

  // collections overview
  test.describe('Collections Overview', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/collectionsoverview', { waitUntil: 'domcontentloaded' });
    });

    test('loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/collectionsoverview/);
    });

    test('has main landmark', async ({ page }) => {
      await expect(page.locator('main#mainContent')).toBeVisible();
    });
  });

  // browse
  test.describe('Browse', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/browse', { waitUntil: 'domcontentloaded' });
    });

    test('loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/browse/);
    });

    test('has main landmark', async ({ page }) => {
      await expect(page.locator('main#mainContent')).toBeVisible();
    });
  });

  // series
  test.describe('Series', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/series', { waitUntil: 'domcontentloaded' });
    });

    test('loads successfully', async ({ page }) => {
      await expect(page).toHaveURL(/\/series/);
    });

    test('has main content container', async ({ page }) => {
      await expect(page.locator('main#mainContent')).toBeVisible();
    });
  });
});
