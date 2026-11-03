import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation, enterCheckoutInformation } from './support';

test.describe('Checkout Information Validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Invalid checkout data is rejected', async ({ page }) => {
    await openCheckoutInformation(page);
    await enterCheckoutInformation(page, '@@@', 'Tester', '12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
