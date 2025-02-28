# C# Test Automation Framework

This framework uses Reqnroll (formerly SpecFlow) with Playwright for automated testing of the React JSON Server Sample application.

## Setup Instructions

### 1. Install .NET 8.0

Make sure you have .NET 8.0 SDK installed:

```bash
# Verify .NET installation
dotnet --version
```

If .NET 8.0 is not installed, download it from the [official .NET download page](https://dotnet.microsoft.com/download/dotnet/8.0).

### 2. Install Dependencies

Restore all required NuGet packages:

```bash
dotnet restore
```

### 3. Install Playwright Browsers

Install the Playwright browsers:

```bash
pwsh bin/Debug/net8.0/playwright.ps1 install
# OR on macOS/Linux with bash
bash bin/Debug/net8.0/playwright.sh install
```

### 4. Configure Playwright

**Important:** Update the ExecutablePath in `Hooks/PlaywrightHooks.cs` to match your system path:

```csharp
_browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
{
    Headless = true,
    ExecutablePath = "/path/to/your/chromium/executable" // Replace with your path
});
```

## Running Tests

### 1. Start the Application

Before running tests, make sure the React application is running at `http://localhost:5173`

### 2. Build the Project

```bash
dotnet build
```

### 3. Run Tests

To run all tests:
```bash
dotnet test
```

To run specific features by @tag:
```bash
dotnet test --filter TestCategory=mytag
```

### 4. Test Results

Test results will be displayed in the terminal, showing:
- Scenarios executed
- Steps passed/failed
- Duration of test execution

### 5. Debug Tests

### 4. Debug Tests

To debug tests in VS Code:

1. Open the project in VS Code:
    - Create or open the `.vscode/launch.json` file
    - It should show the debug configurations including "C#: Reqnroll current file"

2. Set breakpoints:
    - Click the line number in your step definitions where you want to pause
    - A red dot will appear indicating a breakpoint

3. Start debugging:
    - Open the feature file you want to debug
    - Press F5 or select "Run and Debug" from the sidebar
    - Choose "Python: Behave current file"

4. Use debug controls:
    - Step through code using F10 (step over) or F11 (step into)
    - Inspect variables in the debug sidebar
    - Use the debug console to evaluate expressions

## Project Structure

```
CSharp/
├── Features/             # Feature files (.feature)
├── StepDefinitions/      # Step definitions
├── PageObjects/          # Page object models
├── Hooks/                # Test hooks including PlaywrightHooks.cs
├── Newspark.csproj       # Project file
└── README.md             # This file
```

## Troubleshooting

1. If you see build errors, ensure all NuGet packages are properly restored
2. If Playwright fails to start, check your ExecutablePath in PlaywrightHooks.cs
3. For issues with browser installation: run the Playwright install command again
4. Verify the application is running at `http://localhost:5173` before starting tests

## Notes

- Tests run in headless mode by default (browser not visible)
- To run in non-headless mode, change `Headless = true` to `false` in PlaywrightHooks.cs
- The database is reset before each test by copying the init_db.json file to db.json
