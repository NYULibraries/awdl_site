import { test, expect } from '@playwright/test';

test.describe('Serials', () => {
  test('index lists Bulletin on Sumerian Agriculture once', async ({ page }) => {
    await page.goto('/serials', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1.page-title')).toHaveText('Serials');
    await expect(page.getByRole('link', { name: 'Bulletin on Sumerian Agriculture', exact: true })).toHaveCount(1);
  });

  test('clicking a serial opens its volumes as book cards', async ({ page }) => {
    await page.goto('/serials', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Bulletin on Sumerian Agriculture', exact: true }).click();
    await expect(page).toHaveURL(/\/serials\/bsa/);
    await expect(page.locator('h1.page-title')).toHaveText('Bulletin on Sumerian Agriculture');
    await expect(page.locator('.md_title').first()).toContainText('Bulletin on Sumerian agriculture, vol.');
  });

  test('volume card links to the book viewer', async ({ page }) => {
    await page.goto('/serials/bsa', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.md_title a').first()).toHaveAttribute('href', /\/books\/isaw_bsa\d{6}\/1$/);
  });

  test('sorting by author updates the URL and the dropdown', async ({ page }) => {
    await page.goto('/serials/bsa', { waitUntil: 'domcontentloaded' });
    await page.locator('#browse-select').selectOption('ss_sauthor');
    await expect(page).toHaveURL(/sortfield=ss_sauthor/);
    await expect(page.locator('#browse-select')).toHaveValue('ss_sauthor');
  });

  test('unknown serial returns 404', async ({ page }) => {
    const response = await page.goto('/serials/not-a-serial', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.locator('nav.navbar')).toBeVisible();
  });
});
