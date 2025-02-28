import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private username_input: Locator;
  private password_input: Locator;
  private login_button: Locator;
  private logout_button: Locator;
  private url: string;

  constructor(page: Page) {
    this.page = page;
    this.username_input = page.locator('[data-testid="username-input"]');
    this.password_input = page.locator('[data-testid="password-input"]');
    this.login_button = page.locator('[data-testid="login-button"]');
    this.logout_button = page.locator('[data-testid="logout-button"]');
    this.url = "http://localhost:5173/login";
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.username_input.fill(username);
    await this.password_input.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.login_button.click();
  }

  async clickLogoutButton(): Promise<void> {
    await this.logout_button.click();
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    await this.logout_button.waitFor({ state: 'visible' });
    return await this.logout_button.isVisible();
  }

  async isUsernameInputVisible(): Promise<boolean> {
    await this.username_input.waitFor({ state: 'visible' });
    return await this.username_input.isVisible();
  }

  async isOnPage(): Promise<boolean> {
    return this.page.url() === this.url;
  }
}
