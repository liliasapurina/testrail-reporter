var TestRail = require("testrail-promise"),
    fs = require('fs');

var resultsArray = [],
    specName = "",
    testId = "",
    actualResult = "",
    // passed
    resultedStatusId = 1;

var TestRailReporter = function (options){
    this.tr = new TestRail(options.host, options.username, options.password);
    this.testIdDictionary = options.testIdDictionary;
    this.version = options.version || "";
};

TestRailReporter.prototype = {

    suiteStarted: function(suiteInfo) {
        specName = suiteInfo.description;
        testId = JSON.parse(fs.readFileSync(this.testIdDictionary))[specName];
    },

    specDone: function(result) {
        if(testId){
            if (result.status == "failed") {

                // failed
                resultedStatusId = 5;

                if(result.failedExpectations.length == 1){
                    actualResult = actualResult + "Error: " +  result.failedExpectations[0].message;
                }else{
                    result.failedExpectations.forEach(function(item, index){
                        actualResult = actualResult + "Error №" + (index + 1) + ": " +  item.message + "\n";
                    });
                }

                return resultsArray.push(
                    {
                        content: result.description,
                        actual: actualResult + "\n Execution Time: " + result.duration,
                        // failed
                        status_id: 5
                    }
                );
            }else{

                return resultsArray.push(
                    {
                        content: result.description,
                        actual: "Execution Time: " + result.duration,
                        // passed
                        status_id: 1
                    }
                );
            }
        }
    },

    suiteDone: function(){
        if(testId){
            this.tr.addResult(
                {
                    test_id: testId,
                    status_id: resultedStatusId,
                    comment: "Test name: " + specName,
                    version: this.version,
                    custom_step_results: resultsArray
                }
            );
        }
    }
};

module.exports = TestRailReporter;
