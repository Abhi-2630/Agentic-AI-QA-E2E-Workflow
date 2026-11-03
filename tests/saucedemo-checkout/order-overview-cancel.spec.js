import { test, expect } from '@playwright/test';
import { login, openCheckoutInformation, enterCheckoutInformation } from './support';

test.describe('Order Overview and Completion', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('Order overview shows accurate totals and can be cancelled', async ({ page }) => {
    await openCheckoutInformation(page);
    await enterCheckoutInformation(page);
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(page.locator('.summary_info')).toContainText('SauceCard #31337');
    await expect(page.locator('.summary_info')).toContainText('Free Pony Express Delivery!');
    await expect(page.locator('.summary_subtotal_label')).toHaveText('Item total: $29.99');
    await expect(page.locator('.summary_tax_label')).toHaveText('Tax: $2.40');
    await expect(page.locator('.summary_total_label')).toHaveText('Total: $32.39');
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');

    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(/inventory\.html$/);
  });
});
