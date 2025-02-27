using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;
using Reqnroll;

namespace Newspark.StepDefinitions;

[Binding]
public class ErrorMessageSteps
{
    private readonly IPage _page;

    public ErrorMessageSteps(ScenarioContext context)
    {
        _page = (IPage)context["Page"];
    }

    [Then("I should see an error message {string}")]
    public async Task ThenIShouldSeeAnErrorMessage(string message)
    {
        var errorMessage = _page.Locator("[data-testid='error-message']");
        await errorMessage.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible, Timeout = 3000 });
        Assert.AreEqual(message, await errorMessage.TextContentAsync(), $"Expected error message '{message}'");
    }
}
