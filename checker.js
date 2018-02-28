const fetch = require('node-fetch')
querystring = require('querystring');

function check(url, invocationParameters, expectedResultData, expectedResultStatus) {
    const checkResult = {
        urlChecked: null,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    url = url + "?" + querystring.stringify(invocationParameters);;
    var status = null;
    return fetch(url)
      .then(res => {
          status = res.status;
          return res.json();
      })
      .then(json => {
        const checkResult = {
            urlChecked: url,
            resultData: json,
            resultStatus: status,
            statusTestPassed: status == expectedResultStatus,
            resultDataAsExpected: compareResults(expectedResultData, json)
        };
        return checkResult;
      });
}


function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

module.exports = check
