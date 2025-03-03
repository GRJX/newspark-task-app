from playwright.sync_api import Page

class TasksPage:
    def __init__(self, page: Page):
        self.page = page
        self.next_button = page.locator('[data-testid="next-button"]')
        self.previous_button = page.locator('[data-testid="previous-button"]')
        self.current_page_number = page.locator('[data-testid="current-page-number"]')
        self.total_pages = page.locator('[data-testid="total-page-number"]')
        self.title_input = page.locator('[data-testid="title-input"]')
        self.edit_title_input = page.locator('[data-testid="edit-title-input"]')
        self.add_task_button = page.locator('[data-testid="add-task-button"]')
        self.apply_button = page.locator('[data-testid="apply-button"]')
        self.confirm_delete_button = page.locator('[data-testid="delete-button"]')
        self.url = "http://localhost:5173/tasks"

    def navigate(self):
        self.page.goto(self.url)

    def click_next(self):
        self.next_button.click()

    def click_previous(self):
        self.previous_button.click()

    def get_current_page_number(self):
        return self.current_page_number.text_content()

    def get_total_pages(self):
        return self.total_pages.text_content()

    def is_next_button_visible(self):
        return self.next_button.is_visible()

    def is_previous_button_visible(self):
        return self.previous_button.is_visible()

    def is_pagination_visible(self):
        return self.is_next_button_visible() and self.is_previous_button_visible()

    def is_next_button_enabled(self):
        return self.next_button.is_visible()

    def is_previous_button_enabled(self):
        return self.previous_button.is_visible()

    def is_next_button_disabled(self):
        return self.next_button.get_attribute('disabled') is not None

    def is_previous_button_disabled(self):
        return self.previous_button.get_attribute('disabled') is not None

    def enter_task_title(self, task_title: str):
        self.title_input.fill(task_title)

    def click_add_task_button(self):
        self.add_task_button.click()

    def is_task_in_table(self, task_title: str):
        return self.page.locator(f'table tr:has-text("{task_title}")').is_visible(timeout=3000)

    def click_edit_button(self, task_title: str):
        self.page.locator(f'table tr:has-text("{task_title}") >> [data-testid*="edit-task-button"]').click()

    def update_task_title(self, new_task_title: str):
        self.edit_title_input.fill(new_task_title)

    def click_apply_button(self):
        self.apply_button.click()

    def click_delete_button(self, task_title: str):
        self.page.locator(f'table tr:has-text("{task_title}") >> [data-testid*="delete-task-button"]').click()

    def confirm_deletion(self):
        self.confirm_delete_button.click()

    def clear_task_input(self):
        self.title_input.fill('')

    def clear_edit_input(self):
        self.edit_title_input.fill('')
