import { test, expect, type Page } from '@playwright/test';
import { navigateToHome } from './helpers/nav';
import { checkMultipleSearchResults, submitSearch } from './helpers/search';
import { checkCardFieldOrder } from './helpers/card';

test.describe('Filter Tests - Ancient', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await navigateToHome(page);
		await submitSearch(page, 'ancient');
		await checkMultipleSearchResults(page, 'ancient', 88);
	});
	test('check filter dropdown - ancient title', async ({ page }: { page: Page }) => {
		// title
		await page.locator('select[id="browse-select"]').selectOption('ss_longlabel');
		await page.waitForURL('**/search/q=ancient&page=1');
		await checkMultipleSearchResults(page, 'ancient', 88);
		// await checkCardFieldOrder(page, 'ss_longlabel', 12);
	});
	test('check filter dropdown - ancient author', async ({ page }: { page: Page }) => {
		// author
		await page.locator('select[id="browse-select"]').selectOption('ss_sauthor');
		await page.waitForURL('**/search/q=ancient&page=1');
		await checkMultipleSearchResults(page, 'ancient', 88);
		// await checkCardFieldOrder(page, 'ss_sauthor', 12);
	});
});

// test.describe('Filter Tests - Egypt', () => {
// 	test.beforeEach(async ({ page }: { page: Page }) => {
// 		await navigateToHome(page);
// 		await submitSearch(page, 'egypt');
// 		await checkMultipleSearchResults(page, 'egypt', 292);
// 	});
// 	test('check filter dropdown', async ({ page }: { page: Page }) => {
// 		await page.goto('http://localhost:4321/ancientworld/');
// 		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
// 	});
// });
// test.describe('Filter Tests - Greek', () => {
// 	test.beforeEach(async ({ page }: { page: Page }) => {
// 		await navigateToHome(page);
// 		await submitSearch(page, 'greek');
// 		await checkMultipleSearchResults(page, 'greek', 79);
// 	});
// 	test('check filter dropdown', async ({ page }: { page: Page }) => {
// 		await page.goto('http://localhost:4321/ancientworld/');
// 		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
// 	});
// });
