import { test, expect } from '@playwright/test';
import { login } from './support';

test.describe('Cart Review and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Empty cart cannot proceed to checkout', async ({ page }) => {
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.getByText('Your Cart', { exact: true })).toBeVisible();
    const checkout = page.locator('[data-test="checkout"]');
    await expect(checkout).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });
});
