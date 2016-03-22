var server = require('./server');
var router = require('./router');
var handler = require('./handler')

server.start(router,handler);