import { defineStep, Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Given and When steps are defined.
defineStep('I am on the tasks page', async function() {
  await this.tasksPage.navigate();
});

When('I enter {string} in the input field', async function(taskTitle: string) {
  await this.tasksPage.enterTaskTitle(taskTitle);
});

When('I click the Add Task button', async function() {
  await this.tasksPage.clickAddTaskButton();
});

Then('I should see {string} in the task list', async function(taskTitle: string) {
  expect(await this.tasksPage.isTaskInTable(taskTitle)).toBeTruthy();
});

When('I click the Edit button next to {string}', async function(taskTitle: string) {
  await this.tasksPage.clickEditButton(taskTitle);
});

When('I update the task title to {string}', async function(taskTitle: string) {
  await this.tasksPage.updateTaskTitle(taskTitle);
});

When('I click the Apply button', async function() {
  await this.tasksPage.clickApplyButton();
});

When('I click the Delete button next to {string}', async function(taskTitle: string) {
  await this.tasksPage.clickDeleteButton(taskTitle);
});

When('I confirm the Delete button', async function() {
  await this.tasksPage.confirmDeletion();
});

Then('I should not see {string} in the task list', async function(taskTitle: string) {
  expect(await this.tasksPage.isTaskInTable(taskTitle)).toBeFalsy();
});

When('I leave the input field empty', async function() {
  await this.tasksPage.clearTaskInput();
});

When('I clear the task title', async function() {
  await this.tasksPage.clearEditInput();
});

Then('I should see an alert message {string}', async function(message: string) {
  const errorLocator = this.page.locator('[data-testid="alert-message"]');
  await errorLocator.waitFor({ state: 'visible', timeout: 3000 });
  expect(await errorLocator.textContent()).toEqual(message);
});

Given('there is a task named {string} for {string}', async function(taskTitle: string, user: string) {
  // Using direct sequential steps like in login.steps.ts
  await this.loginPage.navigate();
  await this.loginPage.enterCredentials(user, user);
  await this.loginPage.clickLoginButton();
  await this.tasksPage.navigate();
  await this.tasksPage.enterTaskTitle(taskTitle);
  await this.tasksPage.clickAddTaskButton();
  // Log out after creating the task
  await this.loginPage.clickLogoutButton();
});
