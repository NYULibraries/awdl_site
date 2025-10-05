import { expect, type Page } from '@playwright/test';

/**
 * Checks if card field is in alphabetical order
 * @param field - Takes title or author
 * @param numberOfCards - Checking the first N cards
 */
export const checkCardFieldOrder = async (page: Page, field: string, numberOfCards: number = 3): Promise<void> => {
	const cards = page.locator('div.card');
	const cardCount = await cards.count();

	expect(cardCount).toBeGreaterThanOrEqual(numberOfCards);

	const fieldValues: string[] = [];
	for (let i = 0; i < numberOfCards; i++) {
		let fieldElement;
		let fieldText: string | null;

		switch (field) {
			case 'ss_longlabel':
				fieldElement = cards.nth(i).locator('h1.md_title a');
				fieldText = await fieldElement.textContent();
				break;
			case 'ss_sauthor':
				fieldElement = cards.nth(i).locator('.md_authors');
				fieldText = await fieldElement.textContent();
				break;
			default:
				throw new Error(`Unsupported field: ${field}.`);
		}

		expect(fieldText).toBeTruthy();
		fieldValues.push(fieldText!.trim());
	}

	for (let i = 0; i < fieldValues.length - 1; i++) {
		const currentValue = fieldValues[i].toLowerCase();
		const nextValue = fieldValues[i + 1].toLowerCase();
		expect(currentValue <= nextValue).toBeTruthy();
	}
};
