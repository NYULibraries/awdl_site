import { test, expect, type Page } from '@playwright/test';

export const checkHome = async (page: Page): Promise<void> => {
	await page.goto('http://localhost:4321/ancientworld/');
	await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	await expect(page.locator(`h3:has-text("Recently Added Titles")`)).toBeVisible();
};
