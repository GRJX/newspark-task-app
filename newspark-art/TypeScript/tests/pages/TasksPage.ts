import { Page, Locator } from '@playwright/test';

export class TasksPage {
  private page: Page;
  private nextButton: Locator;
  private previousButton: Locator;
  private currentPageNumber: Locator;
  private totalPages: Locator;
  private titleInput: Locator;
  private editTitleInput: Locator;
  private addTaskButton: Locator;
  private applyButton: Locator;
  private confirmDeleteButton: Locator;
  private url: string;

  constructor(page: Page) {
    this.page = page;
    this.nextButton = page.locator('[data-testid="next-button"]');
    this.previousButton = page.locator('[data-testid="previous-button"]');
    this.currentPageNumber = page.locator('[data-testid="current-page-number"]');
    this.totalPages = page.locator('[data-testid="total-page-number"]');
    this.titleInput = page.locator('[data-testid="title-input"]');
    this.editTitleInput = page.locator('[data-testid="edit-title-input"]');
    this.addTaskButton = page.locator('[data-testid="add-task-button"]');
    this.applyButton = page.locator('[data-testid="apply-button"]');
    this.confirmDeleteButton = page.locator('[data-testid="delete-button"]');
    this.url = "http://localhost:5173/tasks";
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  async clickPrevious(): Promise<void> {
    await this.previousButton.click();
  }

  async getCurrentPageNumber(): Promise<string | null> {
    return await this.currentPageNumber.textContent();
  }

  async getTotalPages(): Promise<string | null> {
    return await this.totalPages.textContent();
  }

  async isNextButtonVisible(): Promise<boolean> {
    return await this.nextButton.isVisible();
  }

  async isPreviousButtonVisible(): Promise<boolean> {
    return await this.previousButton.isVisible();
  }

  async isPaginationVisible(): Promise<boolean> {
    return (await this.isNextButtonVisible()) && (await this.isPreviousButtonVisible());
  }

  async isNextButtonEnabled(): Promise<boolean> {
    return await this.nextButton.isVisible();
  }

  async isPreviousButtonEnabled(): Promise<boolean> {
    return await this.previousButton.isVisible();
  }

  async isNextButtonDisabled(): Promise<boolean> {
    return (await this.nextButton.getAttribute('disabled')) !== null;
  }

  async isPreviousButtonDisabled(): Promise<boolean> {
    return (await this.previousButton.getAttribute('disabled')) !== null;
  }

  async enterTaskTitle(taskTitle: string): Promise<void> {
    await this.titleInput.fill(taskTitle);
  }

  async clickAddTaskButton(): Promise<void> {
    await this.addTaskButton.click();
  }

  async isTaskInTable(taskTitle: string): Promise<boolean> {
    return await this.page.locator(`table tr:has-text("${taskTitle}")`).isVisible({ timeout: 3000 });
  }

  async clickEditButton(taskTitle: string): Promise<void> {
    await this.page.locator(`table tr:has-text("${taskTitle}") >> [data-testid*="edit-task-button"]`).click();
  }

  async updateTaskTitle(newTaskTitle: string): Promise<void> {
    await this.editTitleInput.fill(newTaskTitle);
  }

  async clickApplyButton(): Promise<void> {
    await this.applyButton.click();
  }

  async clickDeleteButton(taskTitle: string): Promise<void> {
    await this.page.locator(`table tr:has-text("${taskTitle}") >> [data-testid*="delete-task-button"]`).click();
  }

  async confirmDeletion(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  async clearTaskInput(): Promise<void> {
    await this.titleInput.fill('');
  }

  async clearEditInput(): Promise<void> {
    await this.editTitleInput.fill('');
  }
}
