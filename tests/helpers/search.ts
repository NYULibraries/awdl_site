import { expect, type Page } from '@playwright/test';
import { checkPaginationVisibility } from './pagination';

export const checkSearchInputIsCleared = async (page: Page): Promise<void> => {
	const searchInput = page.locator('input[name="q"]');
	await expect(searchInput).toBeVisible();
	const searchValue = await searchInput.inputValue();
	expect(searchValue).toBe('');
};

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

	// Pagination menu shouldn't show
	await checkPaginationVisibility(page, false);
};

// Expect no search results and pagination is not visible
export const checkNoSearchResults = async (page: Page): Promise<void> => {
	await expect(page.locator('h1.page-title')).toHaveText(`Search Results`);
	await expect(page.locator('div.resultsnum')).not.toBeVisible();

	// Check for the no results messages
	const noResultsDiv = page.locator('div.col');
	await expect(noResultsDiv).toBeVisible();
	await expect(noResultsDiv.locator('p').first()).toHaveText('Sorry, no results found.');
	await expect(noResultsDiv.locator('p').nth(1)).toHaveText('Try a different term.');

	// Check no cards exist
	const cards = page.locator('div.card');
	await expect(cards).not.toBeVisible();

	// Pagination menu shouldn't show
	await checkPaginationVisibility(page, false);
};

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

	await checkPaginationVisibility(page, true);
};

// export const checkMultipleSearchResults = async (page: Page, searchTerm: string, totalResults: number): Promise<void> => {
// 	await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${searchTerm}`);
// 	await expect(page.locator('div.resultsnum')).toHaveText(`Showing items 1 - ${totalResults} of ${totalResults}`);

// 	const cards = page.locator('div.card');
// 	const cardCount = await cards.count();
// 	expect(cardCount).toBe(12);

// 	await checkPaginationVisibility(page, true);
// };