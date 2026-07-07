import { test, expect } from '@playwright/test';
import { EXTENDED_TIMEOUT } from '../../playwright.config';

test.describe('Search', () => {
  test.describe('Empty search', () => {
    test('submitting empty search returns all results', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.locator('input[aria-label="Search"]').fill('');
      await page.locator('button[aria-label="submit"]').click();
      await expect(page).toHaveURL(/\/search/);
      await expect(page.locator('.resultsnum')).toBeVisible();
      await expect(page.locator('.numfound')).not.toHaveText('0');
    });
  });

  test.describe('Special characters', () => {
    const specialChars = ['\\', '/', '?', '+', '-', '!', '(', ')', '[', ']'];

    for (const char of specialChars) {
      test(`searching for "${char}" does not break the page`, async ({ page }) => {
        test.setTimeout(EXTENDED_TIMEOUT);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await page.locator('input[aria-label="Search"]').fill(char);
        await page.locator('button[aria-label="submit"]').click();
        await expect(page).toHaveURL(/\/search/);
        await expect(page.locator('main#mainContent')).toBeVisible();
        // page should show either results or a no-results message, not an error
        const hasResults = await page.locator('.resultsnum').isVisible();
        const hasNoResults = await page.getByText('Sorry, no results found.').isVisible();
        expect(hasResults || hasNoResults).toBe(true);
      });
    }
  });

  // search result that doesnt exist shows no results message
  test.describe('Search term: "africa"', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/search?q=africa', { waitUntil: 'domcontentloaded' });
    });

    test('shows no results message', async ({ page }) => {
      await expect(page.getByText('Sorry, no results found.')).toBeVisible();
    });

    test('shows search results heading with query', async ({ page }) => {
      await expect(page.locator('h1.page-title')).toContainText('africa');
    });

    test('pagination is not shown when no results', async ({ page }) => {
      await expect(page.locator('[data-testid="search-pagination"]')).not.toBeVisible();
    });
  });

  // search result that exists shows results
  test.describe('Search term: "india"', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/search?q=india', { waitUntil: 'domcontentloaded' });
    });

    test('shows results', async ({ page }) => {
      await expect(page.locator('.resultsnum')).toBeVisible();
    });

    test('result count is greater than zero', async ({ page }) => {
      const numFound = await page.locator('.numfound').textContent();
      expect(parseInt(numFound || '0')).toBeGreaterThan(0);
    });

    test('shows search results heading with query', async ({ page }) => {
      await expect(page.locator('h1.page-title')).toContainText('india');
    });

    test('shows "Showing X - Y of Z results"', async ({ page }) => {
      await expect(page.locator('.resultsnum')).toContainText('Showing');
      await expect(page.locator('.start')).toBeVisible();
      await expect(page.locator('.docslength')).toBeVisible();
      await expect(page.locator('.numfound')).toBeVisible();
    });

    test('search term is preserved in the search input after submitting', async ({ page }) => {
      await expect(page.locator('input[aria-label="Search"]')).toHaveValue('india');
    });

    test('result items are rendered', async ({ page }) => {
      const items = page.locator('#items li, #items article, #items .item');
      await expect(items.first()).toBeVisible();
    });
  });

  // pagination is shown when results exceed one page
  test.describe('Pagination', () => {
    test('pagination is shown when results exceed one page', async ({ page }) => {
      await page.goto('/search', { waitUntil: 'domcontentloaded' });
      const numFoundText = await page.locator('.numfound').textContent();
      const numFound = parseInt(numFoundText || '0');

      if (numFound > 12) {
        await expect(page.locator('[data-testid="search-pagination"]')).toBeVisible();
      } else {
        test.skip();
      }
    });

    test('navigating to page 2 updates the results', async ({ page }) => {
      await page.goto('/search', { waitUntil: 'domcontentloaded' });
      const numFoundText = await page.locator('.numfound').textContent();
      const numFound = parseInt(numFoundText || '0');

      if (numFound <= 12) {
        test.skip();
        return;
      }

      const firstPageFirstItem = await page.locator('#items li, #items article, #items .item').first().textContent();

      // click page 2 in the antd pagination
      await page.locator('[data-testid="search-pagination"] li').filter({ hasText: '2' }).click();
      await page.waitForURL(/page=2/, { waitUntil: 'domcontentloaded' });

      const secondPageFirstItem = await page.locator('#items li, #items article, #items .item').first().textContent();
      expect(firstPageFirstItem).not.toBe(secondPageFirstItem);
    });

    test('result count display is accurate', async ({ page }) => {
      await page.goto('/search', { waitUntil: 'domcontentloaded' });
      const startText = await page.locator('.start').textContent();
      const docsLengthText = await page.locator('.docslength').textContent();
      const numFoundText = await page.locator('.numfound').textContent();

      const start = parseInt(startText || '0');
      const docsLength = parseInt(docsLengthText || '0');
      const numFound = parseInt(numFoundText || '0');

      expect(start).toBeGreaterThanOrEqual(1);
      expect(docsLength).toBeGreaterThan(0);
      expect(docsLength).toBeLessThanOrEqual(numFound);
    });
  });
});
