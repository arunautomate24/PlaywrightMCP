// spec: specs/saucedemo-login.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Standard user login', () => {
  test('Standard user logs in successfully @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open the login page', async () => {
      await loginPage.goto();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.errorAlert).toBeHidden();
    });

    const inventoryPage = await test.step('Log in as the standard user', async () => {
      return loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verify the inventory page is displayed', async () => {
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      await expect(inventoryPage.productsHeader).toBeVisible();
      await expect(inventoryPage.sortDropdown).toBeVisible();
      await expect(inventoryPage.cartButton).toBeVisible();
      await expect(inventoryPage.addToCartButtons.first()).toBeVisible();
      await expect(loginPage.loginButton).toBeHidden();
      await expect(loginPage.errorAlert).toBeHidden();
    });
  });
});
