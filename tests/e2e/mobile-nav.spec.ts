import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

const menuHeight = (page: import('@playwright/test').Page) =>
  page.locator('#main-nav').evaluate((el) => el.getBoundingClientRect().height);

test.describe('Mobile navigation', () => {
  test('menu starts collapsed', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.navbar-toggle')).toHaveAttribute('aria-expanded', 'false');
    expect(await menuHeight(page)).toBe(0);
  });

  test('toggle opens the menu to fit every link, then closes it', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const toggle = page.locator('.navbar-toggle');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect
      .poll(() => page.locator('#main-nav').evaluate((el) => el.getBoundingClientRect().height >= el.scrollHeight - 1))
      .toBe(true);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(() => menuHeight(page)).toBe(0);
  });

  test('opened menu links navigate', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.locator('.navbar-toggle').click();
    await page.locator('#main-nav').getByRole('link', { name: 'Serials', exact: true }).click();
    await expect(page).toHaveURL(/\/serials/);
  });
});
