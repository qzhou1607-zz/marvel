'use strict';

var basePath = 'http://gateway.marvel.com/v1/public/characters';
var httpRequest = require('./http-request');
var flatten = require('flat');
var client = require('./redis.js');

function QueryMarvel() {
  //get all characters
  this.getAllCharacters = function(req,res) {
    var page = req.params.page
    client.get(page + '-all-characters', function(err, characters) {
      if (characters) { //if data was cached and has not expired
        res.json(JSON.parse(characters));
      } else { //data was not cached or has expired
        httpRequest(basePath,page)
          .then(function(response) {
            var data = response.body.data;
            client.setex(page + '-all-characters',60*60*24,JSON.stringify(data)); //cache result for 24 hours
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
        httpRequest(basePath + '/' + id + '/comics?')
          .then(function(response) {
            var data = response.body.data;
            client.setex(id,60*60*24,JSON.stringify(data)); //cache data for 24 hours
            res.json(data);
          })
      }
    });
  }
}

module.exports = QueryMarvel;
