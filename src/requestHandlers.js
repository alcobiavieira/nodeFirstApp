// Imports
var logger = require("./logger");
var bunyan = require('bunyan');
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable"); 

// Log setup
var log = bunyan.createLogger({name: 'requestHandler', streams: [{level: 'trace',stream: process.stdout}]});

var exec = require("child_process").exec;

function start(response) {
    logger.writeMessage(log,'info',"Request handler 'start' was called.");
    // exec("ls -lah", function (error, stdout, stderr) { 
    //     response.writeHead(200, {"Content-Type": "text/plain"}); 
    //     response.write(stdout);
    //     response.end();
    // });
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+ 'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response, request) {
    logger.writeMessage(log,'info',"Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        logger.writeMessage(log,'info',"parsing done");
        logger.writeMessage(log,'info',"file path: " + files.upload.path);
        /* Possible error on Windows systems: tried to rename to an already existing file */
        fs.rename(files.upload.path, "/tmp/test.png", function(err) { 
            if (err) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response, postData) {
    logger.writeMessage(log,'info',"Request handler 'show' was called."); 
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end(); 
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        } 
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;