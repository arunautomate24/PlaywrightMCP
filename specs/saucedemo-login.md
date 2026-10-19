# Sauce Demo Login Test Plan

## Application Overview

Test plan for the login flow of https://www.saucedemo.com (Swag Labs). The login page (/) has a Username textbox, a Password textbox and a Login button; accepted usernames and the shared password (secret_sauce) are listed on the page. A successful login redirects to /inventory.html (Products page). Failed logins stay on / and show a dismissible alert starting with "Epic sadface:". All scenarios assume a fresh browser context starting at https://www.saucedemo.com/ with no active session. Note: the app's test hooks use the `data-test` attribute (e.g. login-button, username, password, error-button), whereas the project's getByTestId convention expects `data-test-id`; prefer getByRole / getByLabel-style locators (textbox "Username", textbox "Password", button "Login", alert, button "Dismiss error"). Passwords for all valid users: secret_sauce.

## Test Scenarios

### 1. Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/login/standard-user-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The Login form is visible with Username and Password textboxes and a Login button
    - expect: No error alert is displayed
  2. Fill the Username textbox with 'standard_user'
    - expect: The Username textbox contains 'standard_user'
  3. Fill the Password textbox with 'secret_sauce'
    - expect: The Password textbox is filled (input is masked)
  4. Click the Login button
    - expect: The URL changes to https://www.saucedemo.com/inventory.html
    - expect: The 'Products' header is visible
    - expect: The product inventory list is displayed
    - expect: The Cart button (empty) is visible in the header
    - expect: The login form and any error alert are no longer shown

#### 1.2. Locked out user sees locked-out error

**File:** `tests/login/locked-out-user-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The Login form is visible
  2. Fill the Username textbox with 'locked_out_user'
    - expect: The Username textbox contains 'locked_out_user'
  3. Fill the Password textbox with 'secret_sauce'
    - expect: The Password textbox is filled
  4. Click the Login button
    - expect: An alert is displayed with text 'Epic sadface: Sorry, this user has been locked out.'
    - expect: The URL remains https://www.saucedemo.com/
    - expect: The user is not redirected to the inventory page
    - expect: Username and Password values remain in the form
  5. Click the 'Dismiss error' button on the alert
    - expect: The error alert is no longer visible
    - expect: The user remains on the login page

#### 1.3. Empty username submission shows required error

**File:** `tests/login/empty-username-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The Login form is visible with both fields empty
  2. Leave the Username and Password fields empty and click the Login button
    - expect: An alert is displayed with text 'Epic sadface: Username is required'
    - expect: The URL remains https://www.saucedemo.com/
  3. Fill only the Password textbox with 'secret_sauce' (Username left empty) and click the Login button
    - expect: An alert is displayed with text 'Epic sadface: Username is required'
    - expect: The URL remains https://www.saucedemo.com/
    - expect: The user is not logged in

#### 1.4. Empty password submission shows required error

**File:** `tests/login/empty-password-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The Login form is visible with both fields empty
  2. Fill the Username textbox with 'standard_user' and leave Password empty
    - expect: The Username textbox contains 'standard_user'
    - expect: The Password textbox is empty
  3. Click the Login button
    - expect: An alert is displayed with text 'Epic sadface: Password is required'
    - expect: The URL remains https://www.saucedemo.com/
    - expect: The Username textbox still contains 'standard_user'
    - expect: The user is not logged in

#### 1.5. Invalid credentials show mismatch error

**File:** `tests/login/invalid-credentials-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: The Login form is visible
  2. Fill the Username textbox with 'invalid_user' and the Password textbox with 'wrong_password', then click the Login button
    - expect: An alert is displayed with text 'Epic sadface: Username and password do not match any user in this service'
    - expect: The URL remains https://www.saucedemo.com/
    - expect: The user is not logged in
  3. Replace the credentials with valid username 'standard_user' and wrong password 'wrong_password', then click the Login button
    - expect: The same 'Username and password do not match any user in this service' alert is displayed
    - expect: The URL remains https://www.saucedemo.com/
  4. Replace the credentials with unknown username 'invalid_user' and the valid password 'secret_sauce', then click the Login button
    - expect: The same 'Username and password do not match any user in this service' alert is displayed
    - expect: The URL remains https://www.saucedemo.com/
