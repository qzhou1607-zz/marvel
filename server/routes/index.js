'use strict';

var express = require('express');
var QueryMarvel = require('../modules/query-marvel.js');

module.exports = function (app) {

  var queryMarvelHandler = queryMarvelHandler || new QueryMarvel();

	app.route('/api/characters')
		.get(queryMarvelHandler.getAllCharacters);

	app.route('/api/characters/:id')
    .get(queryMarvelHandler.getCharacterById); 

 };
