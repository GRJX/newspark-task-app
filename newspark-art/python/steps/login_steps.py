from behave import given, when, then
import time
from pages.login_page import LoginPage

@given('I am on the login page')
def step_impl(context):
    context.login_page.navigate()

@when('I login as "{user}"')
def step_impl(context, user):
    context.login_page.enter_credentials(user, user)

@when('I enter an incorrect username or password')
def step_impl(context):
    context.login_page.enter_credentials("admin", "wrong123")

@when('I click the Login button')
def step_impl(context):
    context.login_page.click_login_button()

@when('I click the Logout button')
def step_impl(context):
    context.login_page.click_login_button()

@then('I should be redirected to the "{page_name}" page')
def step_impl(context, page_name):
    context.page.wait_for_url(f"http://localhost:5173/{page_name}", timeout=3000)
    assert page_name in context.page.url, f"Expected page '{page_name}' in URL, but got '{context.page.url}'"

@then('I should see the login form')
def step_impl(context):
    assert context.login_page.username_input.is_visible(), "Login form not visible"

@then('I should see a Logout button')
def step_impl(context):
    assert context.login_page.is_logout_button_visible(), "Logout button not visible"

@given('I am logged in as "{user}"')
def step_impl(context, user):
    context.execute_steps(f'''
        Given I am on the login page
        When I login as "{user}"
        And I click the Login button
    ''')

@given('I am not logged in')
def step_impl(context):
    context.login_page.navigate()
    assert context.login_page.is_on_page(), "Not on login page"

@when('I navigate to the tasks page')
def step_impl(context):
    context.page.goto("http://localhost:5173/tasks")
    time.sleep(1)
