var fs = require("fs");
var parser = require('./parser');
var index = fs.readFileSync('./index.html');
var htmlData = "EMPTY";

parser.show(function (error, data) {
    if (error != null) {
        htmlData = "Server unavailable";
    }
    if (data != null) {
        htmlData = data;
    }
});

function main(request, response) {
    console.log("Request handler 'main' was called.");
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("In main");
    response.end();
}

function show(request, response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.end(htmlData);
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

exports.main = main;
exports.show = show;