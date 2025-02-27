using System;
using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using Newspark.PageObjects;

namespace Newspark.StepDefinitions;

[Binding]
public class PaginationSteps
{
    private readonly ScenarioContext _context;
    private readonly TasksPage _tasksPage;
    private readonly IPage _page;

    public PaginationSteps(ScenarioContext context)
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

    [Given("there are multiple pages of tasks")]
    public async Task GivenThereAreMultiplePagesOfTasks()
    {
        Assert.IsTrue(await _tasksPage.IsPaginationVisible(), "Pagination not visible, no multiple pages of tasks");
    }

    [Then("there is only one page of tasks")]
    public async Task ThenThereIsOnlyOnePageOfTasks()
    {
        Assert.IsFalse(await _tasksPage.IsPaginationVisible(), "Pagination is visible, there should be only one page of tasks");
    }

    [Given("I am on a page other than the first page")]
    public async Task GivenIAmOnAPageOtherThanTheFirstPage()
    {
        await _tasksPage.ClickNext();
    }

    [When("I click the Next button")]
    public async Task WhenIClickTheNextButton()
    {
        await _tasksPage.ClickNext();
    }

    [When("I click the Previous button")]
    public async Task WhenIClickThePreviousButton()
    {
        await _tasksPage.ClickPrevious();
    }

    [Then("I should see the next page of tasks")]
    public async Task ThenIShouldSeeTheNextPageOfTasks()
    {
        int currentPage = await _tasksPage.GetCurrentPageNumber();
        Assert.Greater(currentPage, 1, $"Expected current page number to be greater than 1, but got {currentPage}");
    }

    [Then("I should see the first page of tasks")]
    public async Task ThenIShouldSeeTheFirstPageOfTasks()
    {
        int currentPage = await _tasksPage.GetCurrentPageNumber();
        Assert.AreEqual(1, currentPage, $"Expected current page number to be 1, but got {currentPage}");
    }

    [Then("the current page number should be updated")]
    public async Task ThenTheCurrentPageNumberShouldBeUpdated()
    {
        string currentPage = await _tasksPage.GetCurrentPageNumberText();
        Assert.IsTrue(int.TryParse(currentPage, out _), $"Expected current page number to be a digit, but got {currentPage}");
    }

    [Then("I should see the current page number")]
    public async Task ThenIShouldSeeTheCurrentPageNumber()
    {
        string currentPage = await _tasksPage.GetCurrentPageNumberText();
        Assert.IsTrue(int.TryParse(currentPage, out _), "Current page number not visible");
    }

    [Then("I should see the total number of pages")]
    public async Task ThenIShouldSeeTheTotalNumberOfPages()
    {
        string totalPages = await _tasksPage.GetTotalPages();
        Assert.IsTrue(int.TryParse(totalPages, out _), "Total number of pages not visible");
    }

    [Then("the Next button should be disabled")]
    public async Task ThenTheNextButtonShouldBeDisabled()
    {
        Assert.IsTrue(await _tasksPage.IsNextButtonDisabled(), "Next button is enabled, but it should be disabled");
    }

    [Then("the Previous button should be disabled")]
    public async Task ThenThePreviousButtonShouldBeDisabled()
    {
        Assert.IsTrue(await _tasksPage.IsPreviousButtonDisabled(), "Previous button is enabled, but it should be disabled");
    }
}
