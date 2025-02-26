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

## Project Structure

```
python/
├── .venv/                 # Virtual environment (created after setup)
├── pages/                 # Page objects
├── steps/                 # Step definitions
├── utils/                 # Utility functions
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Troubleshooting

1. If you see import errors, ensure your virtual environment is activated
2. If Playwright fails to start, try running `playwright install` again
3. Verify the application is running at `http://localhost:5173` before starting tests

## Notes

- Tests run in non-headless mode by default (you can see the browser)
- To run in headless mode, modify the `headless=False` to `True` in environment.py
