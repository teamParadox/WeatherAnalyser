var http = require("http");
console.log("Try to start server.")

function start(router, handler) {
    http.createServer(function (request, response) {
        router.route(handler,response);
    }).listen(8083);

    console.log("Server has started.");
}

exports.start = start;