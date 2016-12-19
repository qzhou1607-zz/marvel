'use strict';

var express = require('express');
var QueryMarvel = require('../modules/query-marvel.js');
var CommentHandler = require('../modules/comment-handler.js');

module.exports = function (app) {

  var queryMarvelHandler = queryMarvelHandler || new QueryMarvel();
  var commentHandler = commentHandler || new CommentHandler();

  //end point for getting all characters
	app.route('/api/characters/:page') //parameter page is used to allow the start of search by an offset of page*20
		.get(queryMarvelHandler.getAllCharacters);

  //end point for getting comics details for a specific character
	app.route('/api/characters/details/:id')
    .get(queryMarvelHandler.getCharacterById)

  //end point for getting/posting/deleting comments
  app.route('/api/characters/comments/:id')
    .get(commentHandler.getComments)
    .post(commentHandler.addComment)
    //.put(commentHandler.updateComment)
    .delete(commentHandler.deleteComment);
 };
