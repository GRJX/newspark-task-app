Feature: Login and Logout

  Scenario: User logs in successfully
    Given I am on the login page
    When I login as "admin"
    And I click the Login button
    Then I should be redirected to the "tasks" page
    Then I should see a Logout button

  Scenario: User logs out successfully
    Given I am logged in as "admin"
    When I click the Logout button
    Then I should be redirected to the "login" page
    And I should see the login form

  Scenario: User enters incorrect credentials
    Given I am on the login page
    When I enter an incorrect username or password
    And I click the Login button
    Then I should see an error message "Invalid username or password"

  Scenario: User tries to access tasks page without logging in
    Given I am not logged in
    When I navigate to the tasks page
    Then I should be redirected to the "login" page
    And I should see the login form
