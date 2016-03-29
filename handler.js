var fs = require("fs");
var index = fs.readFileSync('./index.html');

function main(request, response) {
    console.log("Request handler 'main' was called.");
    response.writeHead(200, {"Content-Type": "text/html}"});
    response.write("In main");
    response.end();
}

function show(request, response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "text/html}"});
    response.write("Tuta budem dejstvovat'");
    response.end();
}

exports.main = main;
exports.show = show;