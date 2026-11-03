import { test, expect } from '@playwright/test';

test.describe('Cart Review and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  });

  test('Cart displays item details and checkout actions', async ({ page }) => {
    // 1. Add Sauce Labs Backpack to the cart.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. Open the cart.
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 3. Verify item details and checkout actions.
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toContainText('Sauce Labs Backpack');
    await expect(cartItem).toContainText('carry.allTheThings()');
    await expect(cartItem).toContainText('$29.99');
    await expect(cartItem.locator('.cart_quantity')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
    await expect(page.getByText(/total.*\$29\.99/i)).toBeVisible();

    // 4. Return to Products.
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });
});
