@test
Feature: Pagination

  Scenario: Navigate to the next page of tasks
    Given I am logged in as "admin"
    And I am on the tasks page
    And there are multiple pages of tasks
    When I click the Next button
    Then I should see the next page of tasks
    And the Next button should be disabled

  Scenario: Navigate to the previous page of tasks
    Given I am logged in as "admin"
    And I am on the tasks page
    And I am on a page other than the first page
    When I click the Previous button
    Then I should see the first page of tasks
    And the Previous button should be disabled

  Scenario: Display current page number and total pages
    Given I am logged in as "admin"
    And I am on the tasks page
    And there are multiple pages of tasks
    Then I should see the current page number
    And I should see the total number of pages

  Scenario: No pagination when there is only one page of tasks
    Given I am logged in as "developer"
    When I am on the tasks page
    Then there is only one page of tasks
