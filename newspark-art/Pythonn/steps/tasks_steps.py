from behave import given, when, then
from pages.tasks_page import TasksPage

@given('I am on the tasks page')
@when('I am on the tasks page')
def step_impl(context):
    if not hasattr(context, 'tasks_page'):
        context.tasks_page = TasksPage(context.page)
    context.tasks_page.navigate()

@when('I enter "{task_title}" in the input field')
def step_impl(context, task_title):
    context.tasks_page.enter_task_title(task_title)

@when('I click the Add Task button')
def step_impl(context):
    context.tasks_page.click_add_task_button()

@then('I should see "{task_title}" in the task list')
def step_impl(context, task_title):
    assert context.tasks_page.is_task_in_table(task_title), f"Task '{task_title}' not found in the task list"

@when('I click the Edit button next to "{task_title}"')
def step_impl(context, task_title):
    context.tasks_page.click_edit_button(task_title)

@when('I update the task title to "{task_title}"')
def step_impl(context, task_title):
    context.tasks_page.update_task_title(task_title)

@when('I click the Apply button')
def step_impl(context):
    context.tasks_page.click_apply_button()

@when('I click the Delete button next to "{task_title}"')
def step_impl(context, task_title):
    context.tasks_page.click_delete_button(task_title)

@when('I confirm the Delete button')
def step_impl(context):
    context.tasks_page.confirm_deletion()

@then('I should not see "{task_title}" in the task list')
def step_impl(context, task_title):
    assert not context.tasks_page.is_task_in_table(task_title), f"Task '{task_title}' should not be in the task list"

@when('I leave the input field empty')
def step_impl(context):
    context.tasks_page.clear_task_input()

@when('I clear the task title')
def step_impl(context):
    context.tasks_page.clear_edit_input()

@then('I should see an alert message "{message}"')
def step_impl(context, message):
    error_message = context.page.locator('[data-testid="alert-message"]')
    error_message.wait_for(state='visible', timeout=3000)
    assert error_message.text_content() == message, f"Expected alert message '{message}'"

@given('there is a task named "{task_title}" for "{user}"')
def step_impl(context, task_title, user):
    context.execute_steps(f'''
            Given I am logged in as "{user}"
            And I am on the tasks page
            When I enter "{task_title}" in the input field
            And I click the Add Task button
    ''')