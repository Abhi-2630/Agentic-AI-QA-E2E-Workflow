import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation, enterCheckoutInformation } from './support';

test.describe('Checkout Information Validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Zip/Postal Code is required', async ({ page }) => {
    await openCheckoutInformation(page);
    await enterCheckoutInformation(page, 'QA', 'Tester', '');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
  });
});
