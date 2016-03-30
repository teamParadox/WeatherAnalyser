var fs = require("fs");
var parser = require('./parser');
var index = fs.readFileSync('./index.html');

function main(request, response) {
    console.log("Request handler 'main' was called.");
    response.writeHead(200, {"Content-Type": "text/html}"});
    response.write("In main");
    response.end();
}

function show(request, response) {
    console.log("Request handler 'show' was called.");
    var resp = parser.show();
    console.log(resp); //надо как-то блокировать. не успевает выполнить ф-ция show.
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end();
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

exports.main = main;
exports.show = show;