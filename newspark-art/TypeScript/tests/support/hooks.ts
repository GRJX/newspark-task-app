import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TasksPage } from '../pages/TasksPage';
import * as fs from 'fs';
import * as path from 'path';
import { CustomWorld } from './world';

// Logger setup
const logger = {
  info: (message: string) => console.log(`INFO: ${message}`),
  error: (message: string) => console.error(`ERROR: ${message}`)
};

Before(async function(this: CustomWorld, scenario) {
  try {
    // Overwrite db.json with init_db.json
    const projectPath = path.resolve(__dirname, '../../../../');
    const sourceFile = path.join(projectPath, 'newspark-db', 'init_db.json');
    const targetFile = path.join(projectPath, 'newspark-db', 'db.json');
    
    fs.copyFileSync(sourceFile, targetFile);
    
    // Initialize Playwright
    this.browser = await chromium.launch({
      headless: false,
      slowMo: 500,
      args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
      executablePath: '/Users/jelle/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium'
    });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true
    });
    
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(5000);
    this.page.setDefaultNavigationTimeout(5000);
    
    // Initialize page objects
    this.loginPage = new LoginPage(this.page);
    this.tasksPage = new TasksPage(this.page);
    
    logger.info(`Setup complete for scenario: ${scenario.pickle.name}`);
  } catch (error) {
    logger.error(`Failed to initialize browser or page objects: ${error instanceof Error ? error.message : String(error)}`);
    // Cleanup any partially initialized resources
    throw error;
  }
});

After(async function(this: CustomWorld) {
  if (this.page) {
    await this.page.close();
  }
  
  if (this.context) {
    await this.context.close();
  }
  
  if (this.browser) {
    await this.browser.close();
  }
});
