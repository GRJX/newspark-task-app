using System.Threading.Tasks;
using Microsoft.Playwright;
using Reqnroll;
using System;

namespace Newspark.Hooks
{
    [Binding]
    public class PlaywrightHooks
    {
        private readonly ScenarioContext _scenarioContext;
        private IBrowser _browser;
        private IPlaywright _playwright;
        private IPage _page;
        private IBrowserContext _context;

        public PlaywrightHooks(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
        }

        [BeforeScenario]
        public async Task BeforeScenario()
        {
            _playwright = await Playwright.CreateAsync();
            _browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
            {
                Headless = true,
                ExecutablePath = "/Users/jelle/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium" // Specify the path to the Chromium executable
            });
            _context = await _browser.NewContextAsync();
            _page = await _context.NewPageAsync();
            
            _scenarioContext["Playwright"] = _playwright;
            _scenarioContext["Browser"] = _browser;
            _scenarioContext["BrowserContext"] = _context;
            _scenarioContext["Page"] = _page;
        }

        [AfterScenario]
        public async Task AfterScenario()
        {
            await _page?.CloseAsync();
            await _context?.CloseAsync();
            await _browser?.CloseAsync();
            _playwright?.Dispose();
        }
    }
}
