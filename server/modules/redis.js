'use strict';
var redis = require('redis');
if (process.env.REDISTOGO_URL) { //production
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
} else { //development
  var redis = require("redis").createClient();
}
module.exports = redis;
