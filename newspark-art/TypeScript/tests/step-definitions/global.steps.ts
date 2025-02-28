import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Then('I should see an error message {string}', async function(this: CustomWorld, message: string) {
  const errorMessage = this.page.locator('[data-testid="error-message"]');
  await errorMessage.waitFor({ state: 'visible', timeout: 3000 });
  const actualText = await errorMessage.textContent();
  expect(actualText).toBe(message);
});
