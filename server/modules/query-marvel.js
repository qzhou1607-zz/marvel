'use strict';

var basePath = 'http://gateway.marvel.com/v1/public/characters';
var httpRequest = require('./httpRequest');

function QueryMarvel() {
  //get all characters
  this.getAllCharacters = function(req,res) {
    httpRequest(basePath)
      .then(function(response) {
        res.json(response);
      })
  }

  //get character details by id
  this.getCharacterById = function(req,res) {
    var id = req.params.id;
    httpRequest(basePath + '/' + id)
      .then(function(response) {
        res.json(response);
      })
  }
}

module.exports = QueryMarvel;
