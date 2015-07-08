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

Client.prototype.updateStream = function(streamId, options, fn) {
  API.updateStream(streamId, options, fn);
}

Client.prototype.listStreams = function(options, fn) {
  API.listStreams(options, fn);
}

Client.prototype.deleteStream = function(streamId, fn) {
  API.deleteStream(streamId, fn);
}

Client.prototype.getStreamSegments = function(streamId, options, fn) {
  API.getStreamSegments(streamId, options, fn);
}

Client.prototype.getStreamStatus = function(streamId, fn) {
  API.getStreamStatus(streamId, fn);
}

module.exports = exports = Client;
