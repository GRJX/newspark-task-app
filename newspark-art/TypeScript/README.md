# TypeScript Test Automation Framework

This framework uses Cucumber.js with Playwright for automated testing of the React JSON Server Sample application.

## Setup Instructions

### 1. Install Dependencies

Install all required packages using npm:

```bash
# Install all dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### 1. Start the Application

Before running tests, make sure the React application is running at `http://localhost:5173`

### 2. Run Tests

To run all tests:
```bash
npm test
```

To run a specific feature file:
```bash
npx cucumber-js --require-module ts-node/register --require 'tests/**/*.ts' tests/features/login.feature
```

To generate HTML reports:
```bash
npm run test:report
```

### 3. Test Results

Test results will be displayed in the terminal, showing:
- Scenarios executed
- Steps passed/failed
- Duration of test execution

HTML reports will be generated in the `reports` directory.

### 4. Debug Tests

To debug tests in VS Code:

1. Open the project in VS Code:
    - Use the launch configuration "npm test Debug" in `.vscode/launch.json`

2. Set breakpoints:
    - Click the line number in your step definitions where you want to pause
    - A red dot will appear indicating a breakpoint

3. Start debugging:
    - Press F5 or select "Run and Debug" from the sidebar
    - Choose "npm test Debug"

4. Use debug controls:
    - Step through code using F10 (step over) or F11 (step into)
    - Inspect variables in the debug sidebar
    - Use the debug console to evaluate expressions

## Project Structure

```
TypeScript/
├── node_modules/        # Node modules (created after npm install)
├── tests/               # Test related files
│   ├── features/        # Feature files (Gherkin syntax)
│   ├── step-definitions/# Step definition files
│   └── support/         # Support files (hooks, world, etc.)
├── cucumber.js          # Cucumber configuration
├── package.json         # Project dependencies
├── report-generator.js  # HTML report generator
└── README.md            # This file
```

## Troubleshooting

1. If you encounter Node.js version issues, ensure you're using a compatible version
2. If Playwright fails to start, try running `npx playwright install` again
3. Verify the application is running at `http://localhost:5173/login` before starting tests
4. For TypeScript errors, check your tsconfig.json settings or try:
   ```bash
   npx tsc --noEmit
   ```
   to check for compilation errors without generating output files

## Notes

- Tests can be configured to run in headless or non-headless mode by modifying the browser launch options in your test setup
- Configuration options can be adjusted in the cucumber.js file
- Use TypeScript types from @playwright/test and @cucumber/cucumber for better code completion and type checking
