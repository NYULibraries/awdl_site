import { test, expect, type Page } from '@playwright/test';

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
};

export const checkSearchResultsHeader = async (
	page: Page,
	searchValue: string,
	isFound: boolean,
	isPaginated: boolean,
	totalResults: number
): Promise<void> => {
	if (isFound) {
		await expect(page.locator('h1.page-title')).toHaveText(`Search Results for: ${searchValue}`);
		if (isPaginated) {
			await expect(page.locator('div.resultsnum')).toHaveText(`Showing items 1 - 12 of ${totalResults}`);
		} else {
			await expect(page.locator('div.resultsnum')).toHaveText(`Showing items 1 - 1 of ${totalResults}`);
		}
	} else {
		await expect(page.locator('div.resultsnum')).not.toBeVisible();
		await expect(page.locator('h1.page-title')).toHaveText(`Search Results`);
		// Check no results messages
		const noResultsDiv = page.locator('div.col');
		await expect(noResultsDiv).toBeVisible();
		await expect(noResultsDiv.locator('p').first()).toHaveText('Sorry, no results found.');
		await expect(noResultsDiv.locator('p').nth(1)).toHaveText('Try a different term.');
	}
};
