*** Settings ***
Documentation     Login and Logout test cases

Resource          ../resources/login_keywords.resource
Resource          ../resources/hooks.resource

Test Setup    Before Test
Test Teardown    After Test


*** Test Cases ***
User logs in successfully
    Given I am on the login page
    When I login as "admin"
    And I click the Login button
    Then I should be redirected to the "tasks" page
    And I should see a Logout button

User logs out successfully
    Given I am logged in as "admin"
    When I click the Logout button
    Then I should be redirected to the "login" page
    And I should see the login form

User enters incorrect credentials
    Given I am on the login page
    When I enter an incorrect username or password
    And I click the Login button
    Then I should see an error message "Invalid username or password"

User tries to access tasks page without logging in
    Given I am not logged in
    When I navigate to the tasks page
    Then I should be redirected to the "login" page
    And I should see the login form

