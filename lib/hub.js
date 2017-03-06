'use strict';

const Credentials = require('./credentials')
const API = require('./api');
const Stream = require('./stream');

function Hub(credentials, hub) {
  this.credentials = credentials;
  this.hub = hub;

  API.init();
}

Hub.prototype.newStream = function(key) {
  return new Stream(this.credentials, this.hub, key);
}

Hub.prototype.createStream = function(key, fn) {
  API.createStream(this.credentials, this.hub, key, fn);
}

Hub.prototype.listStreams = function(options, fn) {
  API.listStreams(this.credentials, this.hub, options, fn);
}

Hub.prototype.listLiveStreams = function (items, fn) {
  API.listLiveStreams(this.credentials, this.hub, items, fn);
}

module.exports = exports = Hub;