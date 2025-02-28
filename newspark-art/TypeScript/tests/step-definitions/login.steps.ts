import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am on the login page', async function(this: CustomWorld) {
  await this.loginPage.navigate();
});

When('I login as {string}', async function(this: CustomWorld, user: string) {
  await this.loginPage.enterCredentials(user, user);
});

When('I enter an incorrect username or password', async function() {
  await this.loginPage.enterCredentials('admin', 'wrong123');
});

When('I click the Login button', async function() {
  await this.loginPage.clickLoginButton();
});

When('I click the Logout button', async function() {
  await this.loginPage.clickLogoutButton();
});

Then('I should be redirected to the {string} page', async function(pageName: string) {
  await this.page.waitForURL(`http://localhost:5173/${pageName}`, { timeout: 3000 });
  expect(this.page.url()).toContain(pageName);
});

Then('I should see the login form', async function() {
  const isVisible = await this.loginPage.isUsernameInputVisible();
  expect(isVisible).toBeTruthy();
});

Then('I should see a Logout button', async function() {
  const isVisible = await this.loginPage.isLogoutButtonVisible();
  expect(isVisible).toBeTruthy();
});

Given('I am logged in as {string}', async function(user: string) {
  // In TypeScript we execute steps sequentially rather than using execute_steps
  await this.loginPage.navigate();
  await this.loginPage.enterCredentials(user, user);
  await this.loginPage.clickLoginButton();
});

Given('I am not logged in', async function() {
  await this.loginPage.navigate();
  const isOnLoginPage = await this.loginPage.isOnPage();
  expect(isOnLoginPage).toBeTruthy();
});

When('I navigate to the tasks page', async function() {
  await this.page.goto('http://localhost:5173/tasks');
  // Converting Python's time.sleep to JavaScript's setTimeout wrapped in a Promise
  await new Promise(resolve => setTimeout(resolve, 1000));
});
