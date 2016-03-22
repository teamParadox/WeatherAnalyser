var http = require("http");
var url = require("url");


function start(router, handler) {
    http.createServer(function (request, response) {
        router.route(handler,response);
    }).listen(8083);

    console.log("Server has started.");
}

exports.start = start;