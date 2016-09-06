# testrail-reporter
Report test results to TestRail using Jasmine

## Setup
```
 var TestRailReporter = require('testrail-reporter');
    env.addReporter(new TestRailReporter({
      host: "<url>",
      username: "<user email>",
      password: "<password/apikey>",
      testIdDictionary: "<test_id_distionary.json>",
      // optional parameter
      version: "<test version>"
    }));
```
## test_id_dictionary.json
```
 {
  <test_title>: <test_id>
 }
```

If test_id is undefined, report in TestRail isn't generated.
