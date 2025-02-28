# Python Test Automation Framework

This framework uses Behave with Playwright for automated testing of the React JSON Server Sample application.

## Setup Instructions

### 1. Create Virtual Environment

First, create and activate a Python virtual environment:

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 2. Install Dependencies

Install all required packages using pip:

```bash
pip install -r requirements.txt

# Upgrade Playwright to latest version
pip install --upgrade playwright

# Install Playwright browsers
playwright install
```

## Running Tests

### 1. Start the Application

Before running tests, make sure the React application is running at `http://localhost:5173`

### 2. Run Tests

To run all tests:
```bash
behave ./features/login.feature
```

To run a specific scenario:
```bash
behave ./features/login.feature --name "User logs in successfully"
```

To run with HTML reporting:
```bash
behave ./features/login.feature -f behave_html_formatter:HTMLFormatter -o reports/report.html
```

### 3. Test Results

Test results will be displayed in the terminal, showing:
- Scenarios executed
- Steps passed/failed
- Duration of test execution

### 4. Debug Tests

To debug tests in VS Code:

1. Open the project in VS Code:
    - Create or open the `.vscode/launch.json` file
    - It should show the debug configurations including "Python: Behave current file"

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
python/
├── .venv/                 # Virtual environment (created after setup)
├── pages/                 # Page objects
├── steps/                 # Step definitions
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Troubleshooting

1. If you see import errors, ensure your virtual environment is activated
2. If Playwright fails to start, try running `playwright install` again
3. Verify the application is running at `http://localhost:5173/login` before starting tests
4. On macOS, you may need to set the executable path for Chromium:
   ```python
   # In your environment.py or configuration file
   executable_path="/Users/<user>/Library/Caches/ms-playwright/chromium-1155/chrome-mac/Chromium.app/Contents/MacOS/Chromium"
   
   # Use this path when launching the browser
   browser = playwright.chromium.launch(
       headless=False, 
       executable_path=executable_path
   )
   ```

## Notes

- Tests run in non-headless mode by default (you can see the browser)
- To run in headless mode, modify the `headless=False` to `True` in environment.py
