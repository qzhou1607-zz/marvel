'use strict';

var path = require('path');
var request = require('request');
var crypto = require('crypto');
var dotenv = require('dotenv');
var q = require('q');
var ts = new Date().getTime();

dotenv.config();


var privateKey = process.env.PRIVATE_KEY;
var publicKey = process.env.PUBLIC_KEY;
var hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

module.exports = function(targetUrl) {
  var deferred = q.defer();
  request({
    url:targetUrl,
    json:true,
    qs:{
      ts:ts,
      apikey:publicKey,
      hash:hash,
      limit:20
    }
  }, function(err, response) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(response);
    }
  });
  return deferred.promise;
}
