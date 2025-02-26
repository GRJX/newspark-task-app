from behave import given, when, then
from pages.tasks_page import TasksPage

@given('there are multiple pages of tasks')
def step_impl(context):
    assert context.tasks_page.is_pagination_visible(), "Pagination not visible, no multiple pages of tasks"

@then('there is only one page of tasks')
def step_impl(context):
    assert not context.tasks_page.is_pagination_visible(), "Pagination is visible, there should be only one page of tasks"

@given('I am on a page other than the first page')
def step_impl(context):
    context.tasks_page.click_next()

@when('I click the Next button')
def step_impl(context):
    context.tasks_page.click_next()

@when('I click the Previous button')
def step_impl(context):
    context.tasks_page.click_previous()

@then('I should see the next page of tasks')
def step_impl(context):
    # Validate that the current page number has increased
    current_page = int(context.tasks_page.get_current_page_number())
    assert current_page > 1, f"Expected current page number to be greater than 1, but got {current_page}"

@then('I should see the first page of tasks')
def step_impl(context):
    # Validate that the current page number has decreased
    current_page = int(context.tasks_page.get_current_page_number())
    assert current_page == 0, f"Expected current page number to be 1, but got {current_page}"

@then('the current page number should be updated')
def step_impl(context):
    # Validate that the current page number is displayed correctly
    current_page = context.tasks_page.get_current_page_number()
    assert current_page.isdigit(), f"Expected current page number to be a digit, but got {current_page}"

@then('I should see the current page number')
def step_impl(context):
    assert context.tasks_page.get_current_page_number().isdigit(), "Current page number not visible"

@then('I should see the total number of pages')
def step_impl(context):
    assert context.tasks_page.get_total_pages().isdigit(), "Total number of pages not visible"

@then('the Next button should be disabled')
def step_impl(context):
    assert context.tasks_page.is_next_button_disabled(), "Next button is enabled, but it should be disabled"

@then('the Previous button should be disabled')
def step_impl(context):
    assert context.tasks_page.is_previous_button_disabled(), "Previous button is enabled, but it should be disabled"
