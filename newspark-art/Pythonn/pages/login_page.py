from playwright.sync_api import Page

class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.username_input = page.locator('[data-testid="username-input"]')
        self.password_input = page.locator('[data-testid="password-input"]')
        self.login_button = page.locator('[data-testid="login-button"]')
        self.logout_button = page.locator('[data-testid="logout-button"]')
        self.url = "http://localhost:5173/login"

    def navigate(self):
        self.page.goto(self.url)

    def enter_credentials(self, username: str, password: str):
        self.username_input.fill(username)
        self.password_input.fill(password)

    def click_login_button(self):
        self.login_button.click()

    def click_logout_button(self):
        self.logout_button.click()

    def is_logout_button_visible(self):
        self.logout_button.wait_for(state='visible')
        return self.logout_button.is_visible()

    def is_on_page(self):
        return self.page.url == self.url
