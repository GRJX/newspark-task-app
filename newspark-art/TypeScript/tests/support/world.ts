import { setWorldConstructor, World, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TasksPage } from '../pages/TasksPage';

// Set default timeout for all steps
setDefaultTimeout(5000);

export class CustomWorld extends World {
  page!: Page;
  browser!: Browser;
  context!: BrowserContext;
  loginPage!: LoginPage;
  tasksPage!: TasksPage;
}

setWorldConstructor(CustomWorld);
