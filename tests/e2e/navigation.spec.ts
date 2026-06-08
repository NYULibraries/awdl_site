import { test, expect } from '@playwright/test';

const navLinks = [
  { label: 'Home', url: '/' },
  { label: 'Collections Overview', url: '/collectionsoverview' },
  { label: 'Series', url: '/series' },
  { label: 'About', url: '/about' },
  { label: 'Partners', url: '/partners' },
  { label: 'Browse', url: '/browse' },
];

// tests navigation links navigate to the correct page
test.describe('Navigation', () => {
  test('navbar is visible on homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav.navbar')).toBeVisible();
  });

  for (const link of navLinks) {
    test(`search form is present on ${link.url}`, async ({ page }) => {
      await page.goto(link.url, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('form[role="search"]')).toBeVisible();
    });
  }

  for (const link of navLinks) {
    test(`clicking "${link.label}" navigates to ${link.url}`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.locator('nav.navbar').getByRole('link', { name: link.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(link.url.replace('/', '\\/') + '.*'));
    });
  }
});
