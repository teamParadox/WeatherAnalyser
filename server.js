var http = require("http");


function start(router, handler) {
    http.createServer(function (request, response) {
        router.route(handler,response);
    }).listen(8083);

    console.log("Server has started.");
}

exports.start = start;