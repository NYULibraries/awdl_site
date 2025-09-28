import { expect, type Page } from '@playwright/test';

export const checkUrlQuery = async (page: Page, query: string): Promise<void> => {
	const url = page.url();
	expect(url).toContain(`q=${query}`);
};

export const checkUrlPageNumber = async (page: Page, pageNumber: number): Promise<void> => {
	const url = page.url();
	expect(url).toContain(`page=${pageNumber}`);
};