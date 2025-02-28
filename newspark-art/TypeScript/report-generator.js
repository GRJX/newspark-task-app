const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Create reports directory if it doesn't exist
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(reportsDir, 'cucumber-report.json'),
  output: path.join(reportsDir, 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Test",
    "Browser": "Multiple",
    "Platform": "Multiple",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);

console.log(`HTML report generated successfully at ${options.output}!`);
