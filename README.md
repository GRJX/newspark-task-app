# Newspark Task App

This document provides an overview of the scenarios tested in the Newspark Task App, along with necessary fixes for the test framework.

## Scenarios and Fixes

### Scenario: User enters incorrect credentials

- **Step:** When I click the Logout button
  - **Fix:** Click the correct button in the step definition.
  - **Reasoning:** The wrong button is clicked in this step, it needs to click the `logout_button`.

- **Step:** Then I should see an error message "Invalid username!"
  - **Fix:** Then I should see an error message "Invalid username or password"
  - **Reasoning:** The app shows the message "Invalid username or password". The expected message is wrong.

### Scenario: Navigate to the previous page of tasks

- **Step:** Then I should see the first page of tasks
  - **Fix:** The assertion in the step definition is incorrect and should be set to 1.
  - **Reasoning:** The message mentions that the number needs to be 1, but the test asserts on 0. The assertion needs to be on 1.

### Scenario: Add a new task

- **Step:** Then I should see an alert message "Task added"
  - **Fix:** No fix, this is a real bug.
  - **Reasoning:** The alert message should be shown, as is for other messages.

### Scenario: Edit an existing task

- **Step:** And I should see "Existing Task" in the task list
  - **Fix:** And I should see "Updated Task" in the task list
  - **Reasoning:** The task is being updated in the scenario, then we expect the task to have a new title: "Updated Task".

### Scenario: User can only see their own tasks

- **Step:** And there is a task named "Task for Developer" for "tester"
  - **Fix:** And there is a task named "Task for Developer" for "developer"
  - **Reasoning:** The task for developer should be for the developer, later on the tests expect the Task for Developer to be not in the list.
