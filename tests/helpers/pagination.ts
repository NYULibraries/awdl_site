import { expect, type Page } from '@playwright/test';

// TODO: add helper to check active pagination number
export const checkPaginationVisibility = async (page: Page, shouldBeVisible: boolean): Promise<void> => {
	const pagination = page.locator('[data-testid="search-pagination"]');
	if (shouldBeVisible) {
		await expect(pagination).toBeVisible();
	} else {
		await expect(pagination).not.toBeVisible();
	}
};
