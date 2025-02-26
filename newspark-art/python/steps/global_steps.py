from behave import given, when, then
from pages.login_page import LoginPage

@then('I should see an error message "{message}"')
def step_impl(context, message):
    error_message = context.page.locator('[data-testid="error-message"]')
    error_message.wait_for(state='visible', timeout=3000)
    assert error_message.text_content() == message, f"Expected error message '{message}'"
