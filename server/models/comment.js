'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({
  characterId:Number,
  name:String,
  message:String,
  updated:String,
});

module.exports = mongoose.model('Comment',Comment);
