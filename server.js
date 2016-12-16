'use strict';
var path = require('path');
var express = require('express');
var routes = require('./server/routes/index.js');


var app = express();

routes(app);

//app.use(express.static(path.resolve(__dirname,"public")));

//app.set("views",path.resolve(__dirname,"views"));
//app.set("view engine","ejs");


//app.route('/api/characters/:id')

//app.use('/api', marvelApiRouter);
app.use(function(req,res) {
  res.status(404).render("404");
});

app.listen(3000);
