module.exports = {
  default: {
    paths: [
      'tests/features/login.feature',
      'tests/features/pagination.feature',
      'tests/features/tasks.feature'
    ],
    require: [
      'tests/support/*.ts',
      'tests/step-definitions/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ]
  }
};
