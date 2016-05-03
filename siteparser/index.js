var express = require('express');
var app = express();
var parser = require('parser');

app.get('/', function (req, res) {
    parser.updateInformation();
    res.send('Reading data complete!');
});

app.listen(3000, function () {
    console.log('Started');
})