# SCRUM-101 Checkout Test Execution Report

**Execution date:** 2026-11-03  
**Application:** [SauceDemo](https://www.saucedemo.com)  
**Overall status:** **FAIL — 3 acceptance/business-rule gaps found**

## 1. Executive Summary

| Measure | Result |
|---|---:|
| Planned scenarios | 10 |
| Manual scenarios executed | 10 |
| Manual pass / fail | 7 / 3 |
| Automated scenarios | 10 |
| Automated browser executions | 30 |
| Automated pass / fail | 21 / 9 |
| Blocked | 0 |

The standard checkout, required-field validation, cancellation, order totals, order completion, cart clearing, and mobile layout checks passed. Three gaps were reproduced manually and in Chromium, Firefox, and WebKit automation: the cart has no total summary, Checkout remains enabled for an empty cart, and special characters in First Name are accepted.

## 2. Manual Exploratory Results

| Scenario | Result | Observation |
|---|---|---|
| Cart review | **FAIL** | Item name, description, $29.99 price, quantity, and both navigation actions appeared. No separate cart total calculation was shown. |
| Empty-cart checkout | **FAIL** | The empty cart still displayed an enabled Checkout button; selecting it opened checkout information. |
| Cancel from checkout information | **PASS** | Cancel returned to the cart and preserved the item. |
| Mobile checkout at 375×812 | **PASS** | Cart and checkout controls were usable; measured document width matched the viewport with no horizontal overflow. |
| Missing First Name | **PASS** | The form reported “First Name is required” and remained on checkout information. |
| Missing Last Name | **PASS** | The form reported “Last Name is required” and remained on checkout information. |
| Missing Zip/Postal Code | **PASS** | The form reported “Postal Code is required” and remained on checkout information. |
| Special characters in First Name | **FAIL** | `@@@` was accepted and the flow advanced to order overview without a validation message. |
| Order overview and cancel | **PASS** | Payment and shipping details, $29.99 item total, $2.40 tax, and $32.39 total appeared. Cancel returned to Products. |
| Order completion | **PASS** | Confirmation appeared, the cart was empty, and Back Home returned to Products. |

### Screenshot evidence

- [Cart review](../scrum-101-cart-review.png)
- [Empty-cart checkout state](../scrum-101-empty-cart-checkout.png)
- [Required-field error](../scrum-101-required-field-error.png)
- [Order overview](../scrum-101-order-overview.png)
- [Order confirmation](../scrum-101-order-confirmation.png)
- [Mobile cart](../scrum-101-mobile-cart.png)
- [Mobile checkout](../scrum-101-mobile-checkout.png)

## 3. Automated Test Results

The 10 Playwright scenarios were run against the configured Chromium, Firefox, and WebKit projects. A serial cross-browser run was used for the final stable result.

| Browser project | Passed | Failed |
|---|---:|---:|
| Chromium | 7 | 3 |
| Firefox | 7 | 3 |
| WebKit | 7 | 3 |
| **Total** | **21** | **9** |

The same three acceptance/business-rule assertions failed in each browser. An earlier parallel run had one additional Firefox login timeout; the affected test passed when rerun alone and the final one-worker run had no infrastructure timeouts.

### Healing and triage

The Playwright MCP test debugger was used on the Chromium failures. It confirmed that:

- The cart contains the individual item price but no separate total element.
- Empty-cart Checkout is enabled.
- Special-character input navigates to `checkout-step-two.html`.

No assertion was weakened or test marked skipped: these are reproducible product gaps, not selector or timing defects. No automated test fixes were appropriate; the three failures remain visible in the final results.

## 4. Defects Log

| Bug ID | Severity | Title | Steps to reproduce | Expected vs actual |
|---|---|---|---|---|
| SCRUM101-BUG-01 | Medium | Cart does not show a total price calculation | Log in, add Sauce Labs Backpack, and open the cart. | **Expected:** cart shows a total price calculation. **Actual:** the item price ($29.99) is shown, but there is no separate cart total. |
| SCRUM101-BUG-02 | Medium | Empty cart can enter checkout | Log in with an empty cart and select Checkout. | **Expected:** checkout is unavailable until an item is added. **Actual:** Checkout is enabled and opens the checkout-information page. |
| SCRUM101-BUG-03 | Medium | Special characters are accepted in checkout name | Add an item, open checkout, enter `@@@` as First Name plus otherwise valid values, and select Continue. | **Expected:** invalid data is rejected with a validation message. **Actual:** the user proceeds to order overview without an error. |

## 5. Test Coverage Analysis

| Acceptance criterion / rule | Manual coverage | Automated coverage | Status |
|---|---|---|---|
| AC1 — Cart details, total, and navigation | Cart item and actions checked | Cart review test | **Partial — total missing** |
| AC2 — Checkout fields and required validation | Each missing field exercised | Three required-field tests | **Pass** |
| AC3 — Overview details, totals, and cancel | Payment, shipping, totals, and cancel checked | Overview/cancel test | **Pass** |
| AC4 — Confirmation and Back Home | Completed and checked cart clearing | Order-completion test | **Pass** |
| AC5 — Invalid checkout data | Special-character input exercised | Invalid-data test | **Fail — input accepted** |
| Business rule — empty cart cannot proceed | Empty-cart checkout attempted | Empty-cart test | **Fail — checkout available** |
| Technical note — mobile responsiveness | 375×812 viewport explored | Mobile viewport test | **Pass for tested cart and information pages** |

The tests cover all listed acceptance criteria and the empty-cart business rule. Further coverage should include invalid postal formats, whitespace-only names, back-button navigation, and additional cart quantities.

## 6. Summary and Recommendations

The happy-path checkout works across the configured browsers, including totals on the overview, order confirmation, and cart clearing. The application does not fully meet SCRUM-101 because cart total display, empty-cart blocking, and invalid-data validation are missing.

Recommended next steps:

1. Add and verify a cart total summary.
2. Prevent checkout entry when the cart is empty.
3. Validate checkout names and other invalid values, then rerun the affected tests.
4. Re-run the complete cross-browser suite after the application changes.

## 7. Execution Notes

The plan was saved by the Playwright planner MCP. The task-based custom generator/healer agent launch was unavailable because its configured model (`Claude Sonnet 4.6`) is not available in this runtime. The Playwright generator MCP wrote the cart-review test; the remaining scenario scripts were authored from the plan and observed selectors. The MCP test debugger was used to triage failures. No application source code was changed.

Screenshot evidence files listed above remain in the local workspace. The GitHub MCP file-push interface accepts text files only, so the PNG evidence is not included in the remote commit.
