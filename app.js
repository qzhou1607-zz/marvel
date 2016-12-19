'use strict';
var path = require('path');
var express = require('express');
var routes = require('./server/routes/index.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI);
console.log(process.env.MONGODB_URI);

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

routes(app);

app.set('port',(process.env.Port||8080));
app.use(function(req,res) {
  res.status(404);
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ' + app.get('port'));
});
