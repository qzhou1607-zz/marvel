'use strict';

var express = require('express');
var QueryMarvel = require('../modules/query-marvel.js');
var CommentHandler = require('../modules/comment-handler.js');

module.exports = function (app) {

  var queryMarvelHandler = queryMarvelHandler || new QueryMarvel();
  var commentHandler = commentHandler || new CommentHandler();

	app.route('/api/characters/:page') //offset is used to allow the customization of offset number in http requests
		.get(queryMarvelHandler.getAllCharacters);

	app.route('/api/characters/:id')
    .get(queryMarvelHandler.getCharacterById)

  app.route('/api/characters/comments/:id')
    .get(commentHandler.getComments)
    .post(commentHandler.addComment)
    .put(commentHandler.updateComment)
    .delete(commentHandler.deleteComment);
 };
