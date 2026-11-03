import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation, enterCheckoutInformation } from './support';

test.describe('Order Overview and Completion', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Successful order confirmation clears cart', async ({ page }) => {
    await openCheckoutInformation(page);
    await enterCheckoutInformation(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html$/);

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});
