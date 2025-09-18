import { test, expect, type Page } from '@playwright/test';
import { navigateToBrowse } from './helpers/nav';

test.describe('Filter Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await navigateToBrowse(page);
	});
	test('check filter dropdown', async ({ page }: { page: Page }) => {
		await page.goto('http://localhost:4321/ancientworld/');
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	});
});
