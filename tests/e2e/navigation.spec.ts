import { test, expect } from '@playwright/test';

const navLinks = [
  { label: 'Home', url: '/' },
  { label: 'Collections Overview', url: '/collectionsoverview' },
  { label: 'Series', url: '/series' },
  { label: 'Serials', url: '/serials' },
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

  test.describe('Collections Overview links', () => {
    test('multi-word collection goes to /search and returns results', async ({ page }) => {
      await page.goto('/collectionsoverview', { waitUntil: 'domcontentloaded' });
      await page.getByRole('link', { name: 'Ancient Judaism', exact: true }).click();
      await expect(page).toHaveURL(/\/search\?/);
      const params = new URL(page.url()).searchParams;
      expect(params.get('q')).toBe('Ancient Judaism');
      expect(params.get('page')).toBe('1');
      await expect(page.locator('.numfound')).not.toHaveText('0');
    });
  });

  test.describe('Sort field', () => {
    test('invalid sortfield falls back to title', async ({ page }) => {
      await page.goto('/browse?sortfield=ss_auth', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#browse-select')).toHaveValue('ss_longlabel');
    });

    test('author sort is reflected in the dropdown on browse', async ({ page }) => {
      await page.goto('/browse?sortfield=ss_sauthor', { waitUntil: 'domcontentloaded' });
      await expect(page.locator('#browse-select')).toHaveValue('ss_sauthor');
    });
  });

  test.describe('404 status codes', () => {
    for (const url of ['/this-page-does-not-exist', '/books/not-a-book', '/series/not-a-series', '/serials/not-a-serial']) {
      test(`${url} returns 404 and renders the 404 page`, async ({ page }) => {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        expect(response?.status()).toBe(404);
        await expect(page.locator('nav.navbar')).toBeVisible();
      });
    }
  });
});
