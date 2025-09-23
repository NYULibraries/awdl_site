import { expect, type Page } from '@playwright/test';

const baseURL = 'http://localhost:4321/ancientworld/';

interface NavigationItem {
	path: string;
	label: string;
	hElement: string;
	hText: string;
	metaTitleText: string;
}

interface NavigationMap {
	[key: string]: NavigationItem;
}

export const navigationItems: NavigationMap = {
	home: {
		path: '/',
		label: 'Home',
		hElement: 'h3',
		hText: 'Recently Added Titles',
		metaTitleText: 'Ancient World Digital Library Collection - NYU Libraries'
	},
	collectionsOverview: {
		path: '/collectionsoverview',
		label: 'Collections Overview',
		hElement: 'h2',
		hText: 'Collections Overview',
		metaTitleText: 'Collections Overview - Ancient World Digital Library Collection - NYU Libraries'
	},
	series: {
		path: '/series',
		label: 'Series',
		hElement: 'h1',
		hText: 'Series',
		metaTitleText: 'Series - Ancient World Digital Library Collection - NYU Libraries'
	},
	about: {
		path: '/about',
		label: 'About',
		hElement: 'h2',
		hText: 'About',
		metaTitleText: 'About - Ancient World Digital Library Collection - NYU Libraries'
	},
	partners: {
		path: '/partners',
		label: 'Partners',
		hElement: 'h2',
		hText: 'Partners',
		metaTitleText: 'Partners - Ancient World Digital Library Collection - NYU Libraries'
	},
	browse: {
		path: '/browse',
		label: 'Browse',
		hElement: 'h1',
		hText: 'Browse titles',
		metaTitleText: 'Browse - Ancient World Digital Library Collection - NYU Libraries'
	}
};

export const navigateToHome = async (page: Page): Promise<void> => {
	await page.goto(baseURL);
	await page.waitForURL('**/ancientworld/');
	await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	await expect(page.locator(`${navigationItems.home.hElement}:has-text("${navigationItems.home.hText}")`)).toBeVisible();
};

export const navigateToCollectionOverview = async (page: Page): Promise<void> => {
	await page.goto(`${baseURL}collectionsoverview`);
	await page.waitForURL('**/collectionsoverview');
	await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	await expect(page.locator(`${navigationItems.collectionsOverview.hElement}:has-text("${navigationItems.collectionsOverview.hText}")`)).toBeVisible();
};

export const navigateToSeries = async (page: Page): Promise<void> => {
	await page.goto(`${baseURL}series`);
	await page.waitForURL('**/series');
	await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	await expect(page.locator(`${navigationItems.series.hElement}:has-text("${navigationItems.series.hText}")`)).toBeVisible();
};

export const navigateToBrowse = async (page: Page): Promise<void> => {
	await page.goto(`${baseURL}browse`);
	await page.waitForURL('**/browse');
	await expect(page.locator('h1.sitename')).toHaveText('Ancient World Digital Library');
	await expect(page.locator(`${navigationItems.browse.hElement}:has-text("${navigationItems.browse.hText}")`)).toBeVisible();
};