'use strict';

var Mac = require('./auth')
  , API = require('./api');

function Client(accessKey, secretKey, hub) {
  var mac = new Mac(accessKey, secretKey);
  var hub = hub;

  API.setMAC(mac, hub);
};

Client.prototype.createStream = function(options, fn) {
  API.createStream(options, fn);
}

Client.prototype.getStream = function(streamId, fn) {
  API.getStream(streamId, fn);
}

Client.prototype.listStreams = function(options, fn) {
  API.listStreams(options, fn);
}

module.exports = exports = Client;
