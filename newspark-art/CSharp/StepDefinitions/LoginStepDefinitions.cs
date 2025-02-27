using System;
using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;
using Newspark.PageObjects;

namespace Newspark.StepDefinitions;

[Binding]
public class LoginSteps
{
    private readonly ScenarioContext _context;
    private readonly LoginPage _loginPage;
    private readonly IPage _page;

    public LoginSteps(ScenarioContext context)
    {
        _context = context;
        _page = (IPage)_context["Page"];
        _loginPage = new LoginPage(_page);
    }

    [Given("I am on the login page")]
    public async Task GivenIAmOnTheLoginPage()
    {
        await _loginPage.NavigateAsync();
    }

    [When("I login as {string}")]
    public async Task WhenILoginAs(string user)
    {
        await _loginPage.EnterCredentialsAsync(user, user);
    }

    [When("I enter an incorrect username or password")]
    public async Task WhenIEnterAnIncorrectUsernameOrPassword()
    {
        await _loginPage.EnterCredentialsAsync("admin", "wrong123");
    }

    [When("I click the Login button")]
    public async Task WhenIClickTheLoginButton()
    {
        await _loginPage.ClickLoginButtonAsync();
    }

    [When("I click the Logout button")]
    public async Task WhenIClickTheLogoutButton()
    {
        await _loginPage.ClickLogoutButtonAsync();
    }

    [Then("I should be redirected to the {string} page")]
    public async Task ThenIShouldBeRedirectedToThePage(string pageName)
    {
        await _page.WaitForURLAsync($"http://localhost:5173/{pageName}", new PageWaitForURLOptions { Timeout = 3000 });
        Assert.IsTrue(_page.Url.Contains(pageName), $"Expected page '{pageName}' in URL, but got '{_page.Url}'");
    }

    [Then("I should see the login form")]
    public void ThenIShouldSeeTheLoginForm()
    {
        Assert.IsTrue(_loginPage.IsOnPageAsync(), "Login form not visible");
    }

    [Then("I should see a Logout button")]
    public async Task ThenIShouldSeeALogoutButton()
    {
        Assert.IsTrue(await _loginPage.IsLogoutButtonVisibleAsync(), "Logout button not visible");
    }

    [Given("I am logged in as {string}")]
    public async Task GivenIAmLoggedInAs(string user)
    {
        await GivenIAmOnTheLoginPage();
        await WhenILoginAs(user);
        await WhenIClickTheLoginButton();
    }

    [Given("I am not logged in")]
    public async Task GivenIAmNotLoggedIn()
    {
        await _loginPage.NavigateAsync();
        Assert.IsTrue(_loginPage.IsOnPageAsync(), "Not on login page");
    }

    [When("I navigate to the tasks page")]
    public async Task WhenINavigateToTheTasksPage()
    {
        await _page.GotoAsync("http://localhost:5173/tasks");
        await Task.Delay(1000);
    }
}
