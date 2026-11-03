import { test, expect } from '@playwright/test';
import { login } from './support';

test.describe('Cart Review and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await login(page);
  });

  test('Checkout is usable on a mobile viewport', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('html')).toHaveJSProperty('scrollWidth', 375);

    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    await expect(page.locator('[data-test="cancel"]')).toBeVisible();
    await expect(page.locator('[data-test="continue"]')).toBeVisible();
    await expect(page.locator('html')).toHaveJSProperty('scrollWidth', 375);
  });
});
