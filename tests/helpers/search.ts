import { expect, type Page } from '@playwright/test';

export const checkSearchInputIsCleared = async (page: Page): Promise<void> => {
	const searchInput = page.locator('input[name="q"]');
	await expect(searchInput).toBeVisible();
	const searchValue = await searchInput.inputValue();
	expect(searchValue).toBe('');
};

/**
 * After a query is made, checks that the search input is filled with the query
 * @param searchValue - query
 */
export const checkSearchInputIsFilled = async (page: Page, searchValue: string): Promise<void> => {
	const searchInput = page.locator('input[name="q"]');
	await expect(searchInput).toBeVisible();
	const inputValue = await searchInput.inputValue();
	expect(inputValue).toBe(searchValue);
};

export const submitSearch = async (page: Page, searchValue: string): Promise<void> => {
	const searchInput = page.locator('input[name="q"]');
	await expect(searchInput).toBeVisible();
	await searchInput.fill(searchValue);
	await page.locator('form.dl-search').press('Enter');
	await page.waitForURL('**/search/**');
};

// Expect a single search result and pagination is not visible
export const checkSingleSearchResult = async (page: Page, searchTerm: string): Promise<void> => {
	await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${searchTerm}`);
	await expect(page.locator('div.resultsnum')).toHaveText('Showing items 1 - 1 of 1');

	const cards = page.locator('div.card');
	const cardCount = await cards.count();
	expect(cardCount).toBe(1);
};

// Expect no search results and pagination is not visible
export const checkNoSearchResults = async (page: Page): Promise<void> => {
	await expect(page.locator('h1.page-title')).toHaveText(`Search Results for:`);
	await expect(page.locator('div.resultsnum')).not.toBeVisible();

	// Check for the no results messages
	const noResultsDiv = page.locator('div.col');
	await expect(noResultsDiv).toBeVisible();
	await expect(noResultsDiv.locator('p').first()).toHaveText('Sorry, no results found.');
	await expect(noResultsDiv.locator('p').nth(1)).toHaveText('Try a different term.');

	// Check no cards exist
	const cards = page.locator('div.card');
	await expect(cards).not.toBeVisible();
};

/**
 * After a query is made, checks that the number of items returned is correct by checking resultsnum
 * @param searchTerm - query
 * @param totalResults - total results expected
 */
// Expect max page of 12 search results and pagination menu is visible
export const checkMultipleSearchResults = async (
	page: Page,
	searchTerm: string,
	totalResults: number
): Promise<void> => {
	await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${searchTerm}`);
	await expect(page.locator('div.resultsnum')).toHaveText(`Showing items 1 - 12 of ${totalResults}`);

	const cards = page.locator('div.card');
	const cardCount = await cards.count();
	expect(cardCount).toBe(12);
};

export const checkPaginatedMultipleSearchResults = async (
	page: Page,
	searchTerm: string,
	pageNumber: number,
	totalResults: number
): Promise<void> => {
	const startItems = (pageNumber - 1) * 12 + 1;
	const endItems = Math.min(pageNumber * 12, totalResults);
	const expectedCount = endItems - startItems + 1;

	await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${searchTerm}`);
	await expect(page.locator('div.resultsnum')).toHaveText(
		`Showing items ${startItems} - ${endItems} of ${totalResults}`
	);

	const cards = page.locator('div.card');
	const cardCount = await cards.count();
	expect(cardCount).toBe(expectedCount);
};
