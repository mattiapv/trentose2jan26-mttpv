const express = require('express');
const bodyParser = require('body-parser');
const checker = require('./checker');

const app = express();
app.use(bodyParser.json());

app.get('/area', function (req, res) {
    var lato1 = parseInt(req.query.lato1, 10);
    var lato2 = parseInt(req.query.lato2, 10);
    var area = lato1 * lato2;
    console.log(area);
    if (area === parseInt(area, 10)){
        res.status(200).json({
            area: area
        })
    }else
        res.status(400).json({
            status: 400,
            message: "Error!"
    });
});

app.post('/check', function (req, res) {
    url = req.body.url;
    invocationParameters = req.body.invocationParameters;
    expectedResultData = req.body.expectedResultData;
    expectedResultStatus = req.body.expectedResultStatus;

    if (url && invocationParameters && expectedResultData && expectedResultStatus) {
        checker(url, invocationParameters, expectedResultData, expectedResultStatus).then((checkResult) => {
            res.status(200).json(checkResult);
        });
    } else {
        res.status(400).json({
            status: 400,
            message: "Missing parameters!"
        });
    }
});

app.listen(process.env.PORT || 5000, function () {
    console.log('Express server running');
});
