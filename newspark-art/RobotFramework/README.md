# Robot Framework Test Automation Framework

This framework uses Robot Framework with Browser Library for automated testing of web applications.

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
# Install Python dependencies
pip install -r requirements.txt

# Initialize the Browser library (installs Playwright)
rfbrowser init
```

## VS Code Setup

For the best development experience with Robot Framework, we recommend setting up VS Code with the following extensions:

### 1. Required Extensions

- **RobotCode - Robot Framework Language Server** (d-biehl.robotcode)
  - Provides syntax highlighting, code completion, and validation for Robot Framework files
  - Includes debugger support for Robot Framework tests
  - Enables Go to Definition and Find References functionality

- **Python** (ms-python.python)
  - Provides Python language support and IntelliSense
  - Enables virtual environment management and package installation
  - Allows selecting the correct Python interpreter for your project

- **Live Preview** (ms-vscode.live-server)
  - Allows you to view HTML reports directly in VS Code
  - Useful for reviewing test results without opening external browsers

### 2. Python Interpreter Selection

To ensure VS Code uses the correct Python interpreter from your virtual environment:

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS)
2. Type and select "Python: Select Interpreter"
3. Choose the interpreter from your virtual environment (usually listed as `.venv:venv`)
4. Alternatively, click on the Python version in the status bar and select from the list

When properly configured, you'll see the virtual environment name in the VS Code status bar.

### 3. Configuration (optional)

Add these settings to your VS Code `settings.json` file for optimal Robot Framework development:

```json
{
  "robotcode.robot.pythonPath": "${workspaceFolder}/.venv/bin/python",
  "robotcode.robot.loadArgumentsFromFiles": true,
  "robotcode.language-server.python": "${workspaceFolder}/.venv/bin/python",
  "editor.formatOnSave": true,
  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python"
}
```

### 4. Running Tests in VS Code

With RobotCode extension installed:

1. Open your `.robot` file
2. Click the "Run" button above test cases or use the CodeLens links
3. Alternatively, use the Test Explorer view to run and debug tests

### 5. Debugging Tests

To debug a Robot Framework test:

1. Set breakpoints in your `.robot` file
2. Click the "Debug" CodeLens link above a test
3. Use the Debug console to inspect variables during test execution

## Running Tests

### 1. Start the Application

Before running tests, make sure the application under test is running.

### 2. Run Tests

To run all tests:
```bash
robot tests/
```

To run a specific test suite:
```bash
robot tests/login_tests.robot
```

To run specific test case by name:
```bash
robot -t "User logs in successfully" tests/login_tests.robot
```

To generate reports in a specific directory:
```bash
robot --outputdir results/ tests/
```

### 3. Test Results

Robot Framework automatically generates the following reports:
- report.html - Overall test results summary
- log.html - Detailed test execution log
- output.xml - Machine-readable results data

## Project Structure

```
robot/
├── .venv/                 # Virtual environment (created after setup)
├── tests/                 # Test suites
├── resources/             # Keywords and page objects
├── requirements.txt       # Python dependencies
└── README.md              # This file
```

## Troubleshooting

1. If you see import errors, ensure your virtual environment is activated
2. If Browser library initialization fails, try running `rfbrowser init --debug`
3. On macOS, you might need to allow browser permissions for automation
4. If tests seem slow, you can speed them up with:
   ```robotframework
   *** Settings ***
   Library    Browser    timeout=10s    enable_playwright_debug=False
   ```
5. If the Python interpreter isn't being detected correctly, try restarting VS Code after activating the virtual environment

## Usage Example

```robotframework
*** Settings ***
Library    Browser

*** Test Cases ***
Example Test
    New Browser    chromium    headless=False
    New Page       https://robotframework.org
    Take Screenshot
    Close Browser
```

## Notes

- Tests run in non-headless mode by default (you can see the browser)
- To run in headless mode, modify the browser creation to `New Browser    chromium    headless=True`
- Browser library supports Chrome, Firefox, and WebKit (Safari) engines
