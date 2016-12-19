'use strict';
var path = require('path');
var express = require('express');
var routes = require('./server/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);


var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

routes(app);


app.use(function(req,res) {
  res.status(404);
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

module.exports = app;
