'use strict';

var Credentials = require('./credentials')
  , API = require('./api');

function Hub(credentials, hub) {
  this.credentials = credentials;
  this.hub = hub;

  API.init();
};

Hub.prototype.createStream = function(options, fn) {
  API.createStream(this.credentials, this.hub, options, fn);
}

Hub.prototype.getStream = function(streamId, fn) {
  API.getStream(this.credentials, streamId, fn);
}

Hub.prototype.listStreams = function(options, fn) {
  API.listStreams(this.credentials, this.hub, options, fn);
}

Hub.prototype.createRoom = function(ownerId ,roomName, fn) {
  API.createRoom(this.credentials, ownerId, roomName, fn);
}
Hub.prototype.getRoom = function(streamId, fn) {
  API.getRoom(this.credentials, streamId, fn);
}
module.exports = exports = Hub;
