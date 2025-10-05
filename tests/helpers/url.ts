import { expect, type Page } from '@playwright/test';

/**
 * Checks if the URL contains the search query after it was encoded
 * @param query - search query
 */
export const checkUrlQuery = async (page: Page, query: string): Promise<void> => {
	const url = page.url();
	const encodedQuery = encodeURIComponent(query);
	expect(url).toContain(`q=${encodedQuery}`);
};

/**
 * Checks if the URL contains the correct page number
 * @param pageNumber - The active page number
 */
export const checkUrlPageNumber = async (page: Page, pageNumber: number): Promise<void> => {
	const url = page.url();
	expect(url).toContain(`page=${pageNumber}`);
};
