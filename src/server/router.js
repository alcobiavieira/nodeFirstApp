// Imports
var logger = require("./logger");
var bunyan = require('bunyan');

// Log setup
var log = bunyan.createLogger({name: 'router', streams: [{level: 'trace',stream: process.stdout}]});

// Functions
function route(handle, pathname, response, request) {
    logger.writeMessage(log,'info',"About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request); 
    } else {
        logger.writeMessage(log,'warn',"No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
        logger.writeMessage(log,'trace',"Response sent.", {res: response})
    }
}
exports.route = route;