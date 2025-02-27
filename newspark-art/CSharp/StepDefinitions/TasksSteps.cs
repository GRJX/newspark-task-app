using System;
using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using Newspark.PageObjects;

namespace Newspark.StepDefinitions;

[Binding]
public class TasksSteps
{
    private readonly ScenarioContext _context;
    private readonly TasksPage _tasksPage;
    private readonly IPage _page;

    public TasksSteps(ScenarioContext context)
    {
        _context = context;
        _page = (IPage)_context["Page"];
        _tasksPage = new TasksPage(_page);
    }

    [Given("I am on the tasks page")]
    [When("I am on the tasks page")]
    public async Task GivenIAmOnTheTasksPage()
    {
        await _tasksPage.Navigate();
    }

    [When("I enter {string} in the input field")]
    public async Task WhenIEnterInTheInputField(string taskTitle)
    {
        await _tasksPage.EnterTaskTitle(taskTitle);
    }

    [When("I click the Add Task button")]
    public async Task WhenIClickTheAddTaskButton()
    {
        await _tasksPage.ClickAddTaskButton();
    }

    [Then("I should see {string} in the task list")]
    public async Task ThenIShouldSeeInTheTaskList(string taskTitle)
    {
        Assert.IsTrue(await _tasksPage.IsTaskInTable(taskTitle), $"Task '{taskTitle}' not found in the task list");
    }

    [When("I click the Edit button next to {string}")]
    public async Task WhenIClickTheEditButtonNextTo(string taskTitle)
    {
        await _tasksPage.ClickEditButton(taskTitle);
    }

    [When("I update the task title to {string}")]
    public async Task WhenIUpdateTheTaskTitleTo(string taskTitle)
    {
        await _tasksPage.UpdateTaskTitle(taskTitle);
    }

    [When("I click the Apply button")]
    public async Task WhenIClickTheApplyButton()
    {
        await _tasksPage.ClickApplyButton();
    }

    [When("I click the Delete button next to {string}")]
    public async Task WhenIClickTheDeleteButtonNextTo(string taskTitle)
    {
        await _tasksPage.ClickDeleteButton(taskTitle);
    }

    [When("I confirm the Delete button")]
    public async Task WhenIConfirmTheDeleteButton()
    {
        await _tasksPage.ConfirmDeletion();
    }

    [Then("I should not see {string} in the task list")]
    public async Task ThenIShouldNotSeeInTheTaskList(string taskTitle)
    {
        Assert.IsFalse(await _tasksPage.IsTaskInTable(taskTitle), $"Task '{taskTitle}' should not be in the task list");
    }

    [When("I leave the input field empty")]
    public async Task WhenILeaveTheInputFieldEmpty()
    {
        await _tasksPage.ClearTaskInput();
    }

    [When("I clear the task title")]
    public async Task WhenIClearTheTaskTitle()
    {
        await _tasksPage.ClearEditInput();
    }

    [Then("I should see an alert message {string}")]
    public async Task ThenIShouldSeeAnAlertMessage(string message)
    {
        var alertMessage = _page.Locator("[data-testid='alert-message']");
        await alertMessage.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible, Timeout = 3000 });
        Assert.AreEqual(message, await alertMessage.TextContentAsync(), $"Expected alert message '{message}'");
    }

    [Given("there is a task named {string} for {string}")]
    public async Task GivenThereIsATaskNamedFor(string taskTitle, string user)
    {
        // Using StepDefinitionContext requires additional setup for ReqNroll
        // This is a simplified implementation
        var loginSteps = new LoginSteps(_context);
        await loginSteps.GivenIAmLoggedInAs(user);
        await GivenIAmOnTheTasksPage();
        await WhenIEnterInTheInputField(taskTitle);
        await WhenIClickTheAddTaskButton();
    }
}
