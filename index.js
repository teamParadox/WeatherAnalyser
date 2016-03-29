var server = require('./server');
var router = require('./router');
var handler = require('./handler');

var handle = {};
handle["/"] = handler.main;
handle["/show"] = handler.show;

server.start(router.route, handle);