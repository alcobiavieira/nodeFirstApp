// Imports
var http = require("http");
var url = require("url");
var logger = require("./logger");
// const winston = require('winston') // https://github.com/winstonjs/winston
var bunyan = require('bunyan'); // https://github.com/trentm/node-bunyan

var log = bunyan.createLogger({
    name: 'myserver',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    },
    streams: [
    // {
    //   level: 'info',
    //   stream: process.stdout            // log INFO and above to stdout
    // },
    {
      level: 'debug',
      stream: process.stdout
      // path: '/var/tmp/myapp-error.log'  // log ERROR and above to a file
    }
  ]
});

function start(route, handle){
    function onRequest(request, response) {
        logger.writeMessage(log,'trace',"Request received!!!", {req: request})
        var pathname = url.parse(request.url).pathname; 
        logger.writeMessage(log,'info',"Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    logger.writeMessage(log,'debug',"Server has started.")
}

exports.start = start;