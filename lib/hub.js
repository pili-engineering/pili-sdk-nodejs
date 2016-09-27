'use strict';

var Credentials = require('./credentials')
  , API = require('./api');

function Hub(credentials, hub, host, hostRoom) {
  this.credentials = credentials;
  this.hub = hub;

  API.init(host, hostRoom);
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

Hub.prototype.createRoom = function(ownerId ,roomName, userMax, fn) {
  API.createRoom(this.credentials, ownerId, roomName, userMax, fn);
}

Hub.prototype.getRoom = function(roomName, fn) {
  API.getRoom(this.credentials, roomName, fn);
}

module.exports = exports = Hub;
