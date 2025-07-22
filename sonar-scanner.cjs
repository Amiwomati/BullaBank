const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || "https://sonarcloud.io",
    token: process.env.SONAR_TOKEN,
    options: {
      "sonar.projectKey": "bullabank",
      "sonar.projectName": "BullaBank",
      "sonar.projectVersion": "1.0.0",
      "sonar.sources": "src",
      "sonar.tests": "src/tests",
      "sonar.inclusions": "**",
      "sonar.exclusions":
        "**/node_modules/**,**/dist/**,**/coverage/**,**/*.test.js,**/*.test.jsx",
      "sonar.test.inclusions": "**/*.test.js,**/*.test.jsx",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "coverage/test-reporter.xml",
      "sonar.coverage.exclusions":
        "**/*.test.js,**/*.test.jsx,**/setupTests.js",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit()
);
