import { test, expect, type Page } from '@playwright/test';

test.describe('Searchbar Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await page.goto('http://localhost:4321/ancientworld/');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	});
	test('search bar is cleared when returning to home page', async ({ page }: { page: Page }) => {
		// Search item
		const searchInput = page.locator('input[name="q"]');
		await searchInput.fill('a cow of sin');
		await page.locator('form.dl-search').press('Enter');

		// Wait for search results page
		await page.waitForURL('**/search/**');

		// Navigate back to home page by clicking the Home link
		await page.click('nav a:has-text("Home")');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');

		// Check searchbar is cleared
		const homeSearchInput = page.locator('input[name="q"]');
		await expect(homeSearchInput).toBeVisible();
		const searchValue = await homeSearchInput.inputValue();
		expect(searchValue).toBe('');
	});

	test('Search for a single item with no pagination, using "a cow of sin"', async ({ page }: { page: Page }) => {
		const searchInput = page.locator('input[name="q"]');
		await expect(searchInput).toBeVisible();

		// Search for single item
		await searchInput.fill('a cow of sin');
		await page.locator('form.dl-search').press('Enter');

		// Wait for search results and check contents load
		await page.waitForURL('**/search/**');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');

		// Search result header
		await expect(page.locator('h1.page-title')).toHaveText('Search Results for: a cow of sin');
		await expect(page.locator('div.resultsnum')).toHaveText('Showing items 1 - 1 of 1');

		// Check for card
		await page.waitForSelector('div.card', { timeout: 10000 });
		const cards = page.locator('div.card');
		const cardCount = await cards.count();

		// one result for cow of sin
		expect(cardCount).toBe(1);

        //TODO: check for pagination
	});

	test('search for item that does not exist, using "a cow of sinsss"', async ({ page }: { page: Page }) => {
		const searchInput = page.locator('input[name="q"]');
		await expect(searchInput).toBeVisible();
		await searchInput.fill('a cow of sinsss');
		await page.locator('form.dl-search').press('Enter');

		// Wait for search results and check contents load
		await page.waitForURL('**/search/**');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');

		// Search result header
		await expect(page.locator('h1.page-title')).toHaveText('Search Results for: a cow of sinsss');
		await expect(page.locator('div.resultsnum')).not.toBeVisible();

		// Check no results messages
		const noResultsDiv = page.locator('div.col');
		await expect(noResultsDiv).toBeVisible();
		await expect(noResultsDiv.locator('p').first()).toHaveText('Sorry, no results found.');
		await expect(noResultsDiv.locator('p').nth(1)).toHaveText('Try a different term.');

		const cards = page.locator('div.card');
		const cardCount = await cards.count();
		expect(cardCount).toBe(0);

		//TODO: check for pagination
	});

	test('try search with common terms with many results', async ({ page }: { page: Page }) => {
		const searchTerms = ['ancient', 'egypt', 'greek'];
		for (const term of searchTerms) {
			await page.goto('http://localhost:4321/ancientworld/');
			await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
			const searchInput = page.locator('input[name="q"]');
			// Search
			await searchInput.fill(term);
			await page.locator('form.dl-search').press('Enter');
			// Wait for search results and check contents load
			await page.waitForURL('**/search/**');
			await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${term}`);
			// Check results are > 0
			const hasResults = (await page.locator('.item').count()) > 0;
			expect(hasResults).toBe(true);
			//TODO: check for pagination
		}
	});
	test('search form accessibility and keyboard navigation', async ({ page }: { page: Page }) => {
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
	test.skip('search results pagination works', async ({ page }: { page: Page }) => {
		const searchInput = page.locator('input[name="q"]');
		await searchInput.fill('ancient');
		await page.locator('form.dl-search').press('Enter');

		// Wait for search results
		await page.waitForURL('**/search/**');

		// Check if pagination is present (only if there are enough results)
		const pagination = page.locator('.ant-pagination');
		const hasPagination = await pagination.isVisible();

		if (hasPagination) {
			// Check that pagination controls are present
			await expect(pagination).toBeVisible();
			// Try clicking on page 2 if it exists
			const page2Button = page.locator('.ant-pagination-item-2');
			if (await page2Button.isVisible()) {
				await page2Button.click();
				await page.waitForURL('**/search/**page=2**');
			}
		}
	});
	test('search maintains state when navigating using window stack', async ({ page }: { page: Page }) => {
		const searchInput = page.locator('input[name="q"]');
		await searchInput.fill('a cow of sin');
		await page.locator('form.dl-search').press('Enter');

		// Wait for search results and check contents load
		await page.waitForURL('**/search/**');
		await expect(page.locator('h1.page-title')).toHaveText('Search Results for: a cow of sin');

		// Change pages
		await page.goto('http://localhost:4321/ancientworld/browse');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');

		// Use browser back button
		await page.goBack();
		await page.waitForURL('**/search/**');

		await expect(page.locator('h1.page-title')).toHaveText('Search Results for: a cow of sin');
	});
	test('check URL parameters are formatted correctly after search', async ({ page }: { page: Page }) => {
		const searchInput = page.locator('input[name="q"]');
		await searchInput.fill('test query with spaces');
		await page.locator('form.dl-search').press('Enter');

		await page.waitForURL('**/search/**');

		// Check that URL contains properly encoded search parameters
		const currentUrl = page.url();
		expect(currentUrl).toContain('/search/');
		expect(currentUrl).toContain('q=');
		expect(currentUrl).toContain('page=1');

		// Check spaces are properly encoded
		expect(currentUrl).toContain('test%20query%20with%20spaces');
	});
});
