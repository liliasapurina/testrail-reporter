# testrail-reporter
Report test results to TestRail using Jasmine

## Setup
```
 var TestRailReporter = require('testrail-reporter');
    env.addReporter(new TestRailReporter({
      host: "<url>",
      username: "<user email>",
      password: "<password/apikey>",
      testIdDictionary: "<test_id>",
      // optional parameter
      version: "<test version>"
    }));
```
If test_id is undefined, report in TestRail isn't generated.
