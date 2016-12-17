'use strict';

var basePath = 'http://gateway.marvel.com/v1/public/characters';
var httpRequest = require('./http-request');
var flatten = require('flat');
var client = require('./redis.js');

function QueryMarvel() {
  //get all characters
  this.getAllCharacters = function(req,res) {
    client.get('all-characters', function(err, characters) {
      if (characters) { //if data was cached and has not expired
        res.json(JSON.parse(characters));
      } else { //data was not cached or has expired
        httpRequest(basePath)
          .then(function(response) {
            var data = response.body.data;
            client.setex('all-characters',30,JSON.stringify(data));
            res.json(data);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    })
  }

  //get character details by id
  this.getCharacterById = function(req,res) {
    var id = req.params.id;
    client.get(id, function(err, character) {
      if (character) { //if data was cached and has expired
        res.json(JSON.parse(character));
      } else { //if data was not cached or has expired
        httpRequest(basePath + '/' + id)
          .then(function(response) {
            var data = response.body.data;
            client.setex(id,30,JSON.stringify(data));
            res.json(data);
          })
      }
    });
  }
}

module.exports = QueryMarvel;
