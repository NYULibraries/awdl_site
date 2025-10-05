import { expect, type Page } from '@playwright/test';

/**
 * Helper for whether pagination menu should be visilbe(when there are more than 12 results) or should be hidden(when there are less than 12 results)
 * @param shouldBeVisible - Bool for whether pagination should be visible
 */
export const checkPaginationVisibility = async (page: Page, shouldBeVisible: boolean): Promise<void> => {
	const pagination = page.locator('[data-testid="search-pagination"]');
	if (shouldBeVisible) {
		await expect(pagination).toBeVisible();
	} else {
		await expect(pagination).not.toBeVisible();
	}
};

/**
 * Helper for checking the active pagination number
 * @param activeNumber - Which pagination number should be active
 */
export const checkPaginationActiveNumber = async (page: Page, activeNumber: number): Promise<void> => {
	const pagination = page.locator('[data-testid="search-pagination"]');
	await expect(pagination).toBeVisible();
	await expect(pagination.locator('li.ant-pagination-item-active')).toHaveText(activeNumber.toString());
};