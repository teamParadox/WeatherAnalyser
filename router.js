function route(handler, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf8',
        'Cache-Control': 'no-cache'
    });
    response.end(handler.handle());
}
exports.route = route;