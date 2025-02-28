using Microsoft.Playwright;
using System.Threading.Tasks;

namespace Newspark.PageObjects;

public class LoginPage
{
    private readonly IPage _page;
    private readonly ILocator _usernameInput;
    private readonly ILocator _passwordInput;
    private readonly ILocator _loginButton;
    private readonly ILocator _logoutButton;
    private readonly string _url = "http://localhost:5173/login";

    public LoginPage(IPage page)
    {
        _page = page;
        _usernameInput = _page.Locator("[data-testid='username-input']");
        _passwordInput = _page.Locator("[data-testid='password-input']");
        _loginButton = _page.Locator("[data-testid='login-button']");
        _logoutButton = _page.Locator("[data-testid='logout-button']");
    }

    public async Task NavigateAsync()
    {
        await _page.GotoAsync(_url);
    }

    public async Task EnterCredentialsAsync(string username, string password)
    {
        await _usernameInput.FillAsync(username);
        await _passwordInput.FillAsync(password);
    }

    public async Task ClickLoginButtonAsync()
    {
        await _loginButton.ClickAsync();
    }

    public async Task ClickLogoutButtonAsync()
    {
        await _logoutButton.ClickAsync();
    }

    public async Task<bool> IsLogoutButtonVisibleAsync()
    {
        await _logoutButton.WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
        return await _logoutButton.IsVisibleAsync();
    }

    public bool IsOnPageAsync()
    {
        return _page.Url == _url;
    }
}
