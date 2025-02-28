import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('there are multiple pages of tasks', async function() {
  const isPaginationVisible = await this.tasksPage.isPaginationVisible();
  expect(isPaginationVisible).toBeTruthy();
});

Then('there is only one page of tasks', async function() {
  const isPaginationVisible = await this.tasksPage.isPaginationVisible();
  expect(isPaginationVisible).toBeFalsy();
});

Given('I am on a page other than the first page', async function() {
  await this.tasksPage.clickNext();
});

When('I click the Next button', async function() {
  await this.tasksPage.clickNext();
});

When('I click the Previous button', async function() {
  await this.tasksPage.clickPrevious();
});

Then('I should see the next page of tasks', async function() {
  // Validate that the current page number has increased
  const currentPage = parseInt(await this.tasksPage.getCurrentPageNumber());
  expect(currentPage).toBeGreaterThan(1);
});

Then('I should see the first page of tasks', async function() {
  // Validate that the current page number has decreased
  const currentPage = parseInt(await this.tasksPage.getCurrentPageNumber());
  expect(currentPage).toBe(1);
});

Then('the current page number should be updated', async function() {
  // Validate that the current page number is displayed correctly
  const currentPage = await this.tasksPage.getCurrentPageNumber();
  expect(Number.isInteger(parseInt(currentPage))).toBeTruthy();
});

Then('I should see the current page number', async function() {
  const currentPage = await this.tasksPage.getCurrentPageNumber();
  expect(Number.isInteger(parseInt(currentPage))).toBeTruthy();
});

Then('I should see the total number of pages', async function() {
  const totalPages = await this.tasksPage.getTotalPages();
  expect(Number.isInteger(parseInt(totalPages))).toBeTruthy();
});

Then('the Next button should be disabled', async function() {
  const isNextButtonDisabled = await this.tasksPage.isNextButtonDisabled();
  expect(isNextButtonDisabled).toBeTruthy();
});

Then('the Previous button should be disabled', async function() {
  const isPreviousButtonDisabled = await this.tasksPage.isPreviousButtonDisabled();
  expect(isPreviousButtonDisabled).toBeTruthy();
});
