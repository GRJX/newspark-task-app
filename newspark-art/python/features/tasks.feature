Feature: Manage Tasks

  Scenario: Add a new task
    Given I am logged in as "tester"
    And I am on the tasks page
    When I enter "New Task" in the input field
    And I click the Add Task button
    Then I should see an alert message "Task added"
    And I should see "New Task" in the task list

  Scenario: Edit an existing task
    Given there is a task named "Existing Task" for "tester"
    And I am logged in as "tester"
    And I am on the tasks page
    When I click the Edit button next to "Existing Task"
    And I update the task title to "Updated Task"
    And I click the Apply button
    Then I should see an alert message "Task edited"
    And I should see "Existing Task" in the task list

  Scenario: Delete a task
    Given there is a task named "Task to Delete" for "tester"
    And I am logged in as "tester"
    And I am on the tasks page
    When I click the Delete button next to "Task to Delete"
    And I confirm the Delete button
    Then I should see an alert message "Task deleted"
    And I should not see "Task to Delete" in the task list

  Scenario: Add a task without a title
    Given I am logged in as "tester"
    And I am on the tasks page
    When I leave the input field empty
    And I click the Add Task button
    Then I should see an error message "Task title cannot be empty"

  Scenario: Edit a task to have an empty title
    Given there is a task named "Empty Task" for "tester"
    And I am logged in as "tester"
    And I am on the tasks page
    When I click the Edit button next to "Empty Task"
    And I clear the task title
    And I click the Apply button
    Then I should see an error message "Task title cannot be empty"

  Scenario: User can only see their own tasks
    Given there is a task named "Task for Tester" for "tester"
    And there is a task named "Task for Developer" for "tester"
    And I am logged in as "tester"
    And I am on the tasks page
    Then I should see "Task for Tester" in the task list
    And I should not see "Task for Developer" in the task list