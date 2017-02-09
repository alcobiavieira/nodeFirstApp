// var express = require('express');
import express from 'express';
var webpack = require('webpack');
var path = require('path');
// import config from '../webpack.config.dev';
var open = require('open');

/* eslint-disable no-console */

var port = 3000;
var app = express();
// const compiler = webpack(config);

// app.use(require('webpack-dev-middleware')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// Useful if doing client-side routing.
app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/server/index.html'));
});

app.listen(port, function(err){
	if(err){
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
