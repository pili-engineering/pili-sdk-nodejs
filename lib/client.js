'use strict';

var Mac = require('./auth')
  , API = require('./api');

function Client(accessKey, secretKey, hub) {
  var mac = new Mac(accessKey, secretKey);
  var hub = hub;

  this.mac = mac;
  this.hub = hub;

  API.init();
};

Client.prototype.createStream = function(options, fn) {
  API.createStream(this.mac, this.hub, options, fn);
}

Client.prototype.getStream = function(streamId, fn) {
  API.getStream(this.mac, streamId, fn);
}

Client.prototype.listStreams = function(options, fn) {
  API.listStreams(this.mac, this.hub, options, fn);
}

module.exports = exports = Client;
