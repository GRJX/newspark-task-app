Feature: Manage Tasks

  Scenario: Add a new task
    Given I am logged in
    And I am on the tasks page
    When I enter "New Task" in the input field
    And I click the "Add Task" button
    Then I should see "New Task" in the task list

  Scenario: Edit an existing task
    Given I am logged in
    And I am on the tasks page
    And there is a task named "Existing Task"
    When I click the "Edit" button next to "Existing Task"
    And I update the task title to "Updated Task"
    And I click the "Save" button
    Then I should see "Updated Task" in the task list

  Scenario: Delete a task
    Given I am logged in
    And I am on the tasks page
    And there is a task named "Task to Delete"
    When I click the "Delete" button next to "Task to Delete"
    And I confirm the deletion
    Then I should not see "Task to Delete" in the task list

  Scenario: Add a task without a title
    Given I am logged in
    And I am on the tasks page
    When I leave the input field empty
    And I click the "Add Task" button
    Then I should see an error message "Task title cannot be empty"

  Scenario: Edit a task to have an empty title
    Given I am logged in
    And I am on the tasks page
    And there is a task named "Existing Task"
    When I click the "Edit" button next to "Existing Task"
    And I clear the task title
    And I click the "Save" button
    Then I should see an error message "Task title cannot be empty"
