import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation } from './support';

test.describe('Cart Review and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Cancel from checkout information returns to cart', async ({ page }) => {
    await openCheckoutInformation(page);
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/cart\.html$/);
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });
});
