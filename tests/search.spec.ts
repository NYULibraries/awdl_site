import { test, expect, type Page } from '@playwright/test';
import { navigateToHome, navigateToCollectionOverview, navigateToSeries } from './helpers/nav';
import {
	checkSearchInputIsCleared,
	checkSearchInputIsFilled,
	submitSearch,
	checkSingleSearchResult,
	checkNoSearchResults,
	checkMultipleSearchResults,
	checkPaginatedMultipleSearchResults
} from './helpers/search';

// Testing for pagination alongside the search results rendering

test.describe('Collection Overview Search Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await navigateToCollectionOverview(page);
	});
	test('Check results after clicking on a collection in Collections Overview Page', async ({
		page
	}: {
		page: Page;
	}) => {
		await page.click('div.card a:has-text("Ancient Judaism")');
		await page.waitForURL('**/search/?q="ancient%20judaism"&page=1');
		await checkMultipleSearchResults(page, 'ancient judaism', 1);
	});
});

// TODO: series needs page number
test.describe('Series Search Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await navigateToSeries(page);
	});
	test('Check results after clicking on a series in Series Page', async ({ page }: { page: Page }) => {
		await page.click('div.card a:has-text("Through the eye" series)');
		await page.waitForURL('**/series/"through-the-eye-series"&page=1');
	});
});

test.describe('Searchbar Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		// reset to home page
		await navigateToHome(page);
	});
	test('search bar is cleared when returning to home page', async ({ page }: { page: Page }) => {
		// Search item
		await submitSearch(page, 'a cow of sin');

		// Navigate back to home page by clicking the Home link
		await page.click('nav a:has-text("Home")');
		await page.waitForURL('**/ancientworld/');
		await expect(page.locator(`h3:has-text("Recently Added Titles")`)).toBeVisible();

		// Check searchbar is cleared
		await checkSearchInputIsCleared(page);
	});

	test('Search for a single item with no pagination, using "a cow of sin"', async ({ page }: { page: Page }) => {
		// Submit search
		await submitSearch(page, 'a cow of sin');

		// Check single search result
		await checkSingleSearchResult(page, 'a cow of sin');
	});

	test('search for item that does not exist, using "a cow of sinsss"', async ({ page }: { page: Page }) => {
		// Submit search
		await submitSearch(page, 'a cow of sinsss');

		// Check no search results
		await checkNoSearchResults(page);
	});

	test('try search with common terms with many results', async ({ page }: { page: Page }) => {
		const searchTerms = [
			{ term: 'ancient', totalResults: 88 },
			{ term: 'egypt', totalResults: 292 },
			{ term: 'greek', totalResults: 79 }
		];
		for (const { term, totalResults } of searchTerms) {
			// reset to home page
			await navigateToHome(page);

			// Submit search
			await submitSearch(page, term);

			// Check that multiple search results are displayed
			await checkMultipleSearchResults(page, term, totalResults);
		}
	});
	test('search form accessibility labels and keyboard navigation (tabbable)', async ({ page }: { page: Page }) => {
		// Check that search form has role
		const searchForm = page.locator('form[role="search"]');
		await expect(searchForm).toBeVisible();

		// Check that search input has attributes
		const searchInput = page.locator('input[name="q"]');
		await expect(searchInput).toHaveAttribute('aria-label', 'Search');
		await expect(searchInput).toHaveAttribute('placeholder', 'Search titles, subjects, authors...');

		// Test keyboard navigation
		await searchInput.focus();
		await expect(searchInput).toBeFocused();
	});
	// TODO: Fix this test
	// TODO: the pagination number is not being selected after refresh
	test.skip('search results display after clicking on a pagination number', async ({ page }: { page: Page }) => {
		// Submit search
		await submitSearch(page, 'egypt');

		// Check that multiple search results are displayed
		await checkMultipleSearchResults(page, 'egypt', 292);

		// Click page 2
		const page2Button = page.locator('li[title="2"]');
		await expect(page2Button).toBeVisible();
		await page2Button.click();
		await page.waitForURL('**/search/q=egypt&page=2');
		await checkPaginatedMultipleSearchResults(page, 'egypt', 2, 292);

		// Click last page
		const lastPageButton = page.locator('li[title="25"]');
		await expect(lastPageButton).toBeVisible();
		await lastPageButton.click();
		await page.waitForURL('**/search/q=egypt&page=25');
		await checkPaginatedMultipleSearchResults(page, 'egypt', 25, 292);
	});
	test('search maintains state when navigating using window stack', async ({ page }: { page: Page }) => {
		await submitSearch(page, 'a cow of sin');

		// Check single search result
		await checkSingleSearchResult(page, 'a cow of sin');

		// Change pages
		await page.goto('http://localhost:4321/ancientworld/browse');
		await expect(page.locator('h1.page-title')).toHaveText('Browse titles');

		// Check search is empty
		await checkSearchInputIsCleared(page);

		// Use browser back button
		await page.goBack();
		await page.waitForURL('**/search/**');

		// Check search header again and check if search is repopulated
		await checkSearchInputIsFilled(page, 'a cow of sin');
		await checkSingleSearchResult(page, 'a cow of sin');
	});
	test('check URL parameters are formatted correctly after search with spaces', async ({ page }: { page: Page }) => {
		await submitSearch(page, 'test query with spaces');

		// Check that URL contains properly encoded search parameters
		const currentUrl = page.url();
		expect(currentUrl).toContain('/search/');
		expect(currentUrl).toContain('q=');
		expect(currentUrl).toContain('page=1');

		// Check spaces are properly encoded
		expect(currentUrl).toContain('test%20query%20with%20spaces');
		// TODO: check for other search terms
	});
	test('check URL parameters are formatted correctly after search with special characters', async ({
		page
	}: {
		page: Page;
	}) => {
		await submitSearch(page, '!!!');

		const currentUrl = page.url();
		expect(currentUrl).toContain('/search/');
		expect(currentUrl).toContain('q=!!!');
		expect(currentUrl).toContain('page=1');
	});
});
