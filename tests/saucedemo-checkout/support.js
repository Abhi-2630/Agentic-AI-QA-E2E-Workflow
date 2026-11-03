import { expect } from '@playwright/test';

export async function login(page) {
  await page.goto('https://www.saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory\.html$/);
}

export async function addBackpackToCart(page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
}

export async function openCheckoutInformation(page) {
  await addBackpackToCart(page);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
}

export async function enterCheckoutInformation(page, firstName = 'QA', lastName = 'Tester', postalCode = '12345') {
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(postalCode);
}
