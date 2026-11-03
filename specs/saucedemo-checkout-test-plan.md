# SCRUM-101 SauceDemo Checkout Test Plan

## Application Overview

Validate the SCRUM-101 SauceDemo cart, checkout information validation, order overview, completion, navigation, empty-cart rules, and mobile presentation using the standard_user account. Observed application: https://www.saucedemo.com; credentials: standard_user / secret_sauce. The plan follows story acceptance criteria, including assertions for requirements that may not be implemented and should therefore be recorded as defects if absent.

## Test Scenarios

### 1. Cart Review and Navigation

**Seed:** `tests/seed.spec.js`

#### 1.1. Cart displays item details and checkout actions

**File:** `tests/saucedemo-checkout/cart-review.spec.js`

**Steps:**
  1. Log in as standard_user using secret_sauce.
    - expect: The Products page is displayed.
  2. Add Sauce Labs Backpack to the cart and open the cart.
    - expect: The cart shows the item name, description, price, and quantity 1.
    - expect: The cart shows a total price calculation.
    - expect: Continue Shopping and Checkout actions are available.
  3. Select Continue Shopping.
    - expect: The Products page is displayed.

#### 1.2. Empty cart cannot proceed to checkout

**File:** `tests/saucedemo-checkout/empty-cart-checkout.spec.js`

**Steps:**
  1. Log in as standard_user and open the cart without adding any products.
    - expect: The cart is empty.
    - expect: Checkout cannot be used to enter checkout with no items.
    - expect: Continue Shopping is available.

#### 1.3. Cancel from checkout information returns to cart

**File:** `tests/saucedemo-checkout/checkout-cancel.spec.js`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information page is displayed.
  2. Select Cancel.
    - expect: The cart page is displayed and the item remains in the cart.

#### 1.4. Checkout is usable on a mobile viewport

**File:** `tests/saucedemo-checkout/mobile-responsive.spec.js`

**Steps:**
  1. Set the browser viewport to 375 by 812 pixels, log in, add Sauce Labs Backpack, and open the cart.
    - expect: Cart item details and the Checkout action are visible and usable.
    - expect: The page has no horizontal overflow.
  2. Select Checkout.
    - expect: First Name, Last Name, Zip/Postal Code, Cancel, and Continue are visible and usable.
    - expect: The page has no horizontal overflow.

### 2. Checkout Information Validation

**Seed:** `tests/seed.spec.js`

#### 2.1. First Name is required

**File:** `tests/saucedemo-checkout/required-first-name.spec.js`

**Steps:**
  1. Log in, add an item, open the cart, and select Checkout.
    - expect: The checkout information form is displayed.
  2. Leave First Name empty, enter Last Name Tester and Zip/Postal Code 12345, then select Continue.
    - expect: An error identifies First Name as required.
    - expect: The user remains on the checkout information page.

#### 2.2. Last Name is required

**File:** `tests/saucedemo-checkout/required-last-name.spec.js`

**Steps:**
  1. Log in, add an item, open the cart, and select Checkout.
    - expect: The checkout information form is displayed.
  2. Enter First Name QA and Zip/Postal Code 12345, leave Last Name empty, and select Continue.
    - expect: An error identifies Last Name as required.
    - expect: The user remains on the checkout information page.

#### 2.3. Zip/Postal Code is required

**File:** `tests/saucedemo-checkout/required-postal-code.spec.js`

**Steps:**
  1. Log in, add an item, open the cart, and select Checkout.
    - expect: The checkout information form is displayed.
  2. Enter First Name QA and Last Name Tester, leave Zip/Postal Code empty, and select Continue.
    - expect: An error identifies Zip/Postal Code as required.
    - expect: The user remains on the checkout information page.

#### 2.4. Invalid checkout data is rejected

**File:** `tests/saucedemo-checkout/invalid-checkout-data.spec.js`

**Steps:**
  1. Log in, add an item, open the cart, and select Checkout.
    - expect: The checkout information form is displayed.
  2. Enter special characters in First Name, a valid Last Name and Zip/Postal Code, then select Continue.
    - expect: The application shows an appropriate validation error.
    - expect: The user cannot proceed to order overview until invalid data is corrected.

### 3. Order Overview and Completion

**Seed:** `tests/seed.spec.js`

#### 3.1. Order overview shows accurate totals and can be cancelled

**File:** `tests/saucedemo-checkout/order-overview-cancel.spec.js`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, enter QA, Tester, and 12345 on checkout information, and select Continue.
    - expect: The Checkout: Overview page shows the order item, payment information, and shipping information.
    - expect: Item subtotal is $29.99, tax is $2.40, and total is $32.39.
    - expect: Cancel and Finish actions are available.
  2. Select Cancel.
    - expect: The Products page is displayed.

#### 3.2. Successful order confirmation clears cart

**File:** `tests/saucedemo-checkout/order-completion.spec.js`

**Steps:**
  1. Log in, add Sauce Labs Backpack, open the cart, enter QA, Tester, and 12345 on checkout information, and select Continue.
    - expect: The Checkout: Overview page is displayed with correct item and totals.
  2. Select Finish.
    - expect: The Checkout: Complete! page confirms the order.
    - expect: A Back Home action is available.
    - expect: The cart is empty.
  3. Select Back Home.
    - expect: The Products page is displayed.
