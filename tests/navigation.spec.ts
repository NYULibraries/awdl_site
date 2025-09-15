import { test, expect, type Page } from '@playwright/test';
import { resetToHome } from './helpers/nav';

interface NavigationItem {
	path: string;
	label: string;
	hElement: string;
	hText: string;
	metaTitleText: string;
}

const navigationItems: NavigationItem[] = [
	{
		path: '/',
		label: 'Home',
		hElement: 'h3',
		hText: 'Recently Added Titles',
		metaTitleText: 'Ancient World Digital Library Collection - NYU Libraries'
	},
	{
		path: '/collectionsoverview',
		label: 'Collections Overview',
		hElement: 'h2',
		hText: 'Collections Overview',
		metaTitleText: 'Collections Overview - Ancient World Digital Library Collection - NYU Libraries'
	},
	{
		path: '/series',
		label: 'Series',
		hElement: 'h1',
		hText: 'Series',
		metaTitleText: 'Series - Ancient World Digital Library Collection - NYU Libraries'
	},
	{
		path: '/about',
		label: 'About',
		hElement: 'h2',
		hText: 'About',
		metaTitleText: 'About - Ancient World Digital Library Collection - NYU Libraries'
	},
	{
		path: '/partners',
		label: 'Partners',
		hElement: 'h2',
		hText: 'Partners',
		metaTitleText: 'Partners - Ancient World Digital Library Collection - NYU Libraries'
	},
	{
		path: '/browse',
		label: 'Browse',
		hElement: 'h1',
		hText: 'Browse titles',
		metaTitleText: 'Browse - Ancient World Digital Library Collection - NYU Libraries'
	}
];

test.describe('Navbar Menu Tests', () => {
	test.beforeEach(async ({ page }: { page: Page }) => {
		await resetToHome(page);
		const nav = page.locator('nav.navbar');
		await expect(nav).toBeVisible();
		for (const item of navigationItems) {
			const link = page.locator(`nav a:has-text("${item.label}")`);
			await expect(link).toBeVisible();
		}
	});

	// Navigation through each page
	test('can navigate to all main sections', async ({ page }: { page: Page }) => {
		for (const item of navigationItems) {
			await page.click(`nav a:has-text("${item.label}")`);
			await page.waitForURL(`**${item.path}`);
			await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
			await expect(page.locator(`${item.hElement}:has-text("${item.hText}")`)).toBeVisible();
			await expect(page).toHaveTitle(item.metaTitleText);
			expect(page.url()).toContain(item.path);

			// Check if main content is visible
			await expect(page.locator('main')).toBeVisible();
		}
	});

	// Test mobile navigation menu
	test('check mobile navigation menu', async ({ page }: { page: Page }) => {
		await page.setViewportSize({ width: 375, height: 667 } as { width: number; height: number });
		
		// Check if mobile menu icon is visible
		const mobileMenuButton = page.locator('.navbar-toggle');
		await expect(mobileMenuButton).toBeVisible();

		// Open the mobile menu
		await mobileMenuButton.click();

		// Check dropdown menu items exist
		for (const item of navigationItems) {
			const link = page.locator(`nav a:has-text("${item.label}")`);
			await expect(link).toBeVisible();
		}
	});
	// Test navigation accessibility (can you tab through items)
	test('navigation meets accessibility requirements', async ({ page }: { page: Page }) => {
		// Check if nav element has correct role
		const nav = page.locator('nav[role="navigation"]');
		await expect(nav).toBeVisible();

		// Check if links are keyboard accessible
		await page.keyboard.press('Tab');
		const focusedElement = await page.evaluate(() => document.activeElement?.tagName || '');
		expect(focusedElement.toLowerCase()).toBe('a');
	});

	// Test routes that don't exist
	test('handles invalid routes appropriately', async ({ page }: { page: Page }) => {
		await page.goto('/ancientworld/random-page');

		// Check for the 404 page
		await expect(page.locator('h1:has-text("Page Not Found")')).toBeVisible();
		await expect(page.locator('p:has-text("The page you\'re looking for doesn\'t exist.")')).toBeVisible();

		// Check if we're redirected to the homepage
		await page.waitForURL('**/ancientworld/**', { timeout: 5000 });
		await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
		await expect(page.locator(`${navigationItems[0].hElement}:has-text("${navigationItems[0].hText}")`)).toBeVisible();
	});
});
