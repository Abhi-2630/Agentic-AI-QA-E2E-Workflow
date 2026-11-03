import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation, enterCheckoutInformation } from './support';

test.describe('Checkout Information Validation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('First Name is required', async ({ page }) => {
    await openCheckoutInformation(page);
    await enterCheckoutInformation(page, '', 'Tester', '12345');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html$/);
    await expect(page.getByRole('alert')).toContainText('First Name is required');
  });
});
