'use strict';

const API = require('./api');

function Stream(credentials, hub, key) {

  this.credentials = credentials;

  this.key = key;
  this.hub = hub;
}

/**
 * Stream operations
 */
Stream.prototype.loadInfo = function(fn) {

  var self = this;
  API.getStreamInfo(this.credentials, self.hub, self.key, function(err, rst) {
    if (err) {
      fn(err);
    } else {
      // self = this ?
      self.createdAt = rst.createdAt;
      self.updatedAt = rst.updatedAt;
      self.expireAt = rst.expireAt;
      self.disabledTill = rst.disabledTill;
      fn(null);
    }
  });
}

Stream.prototype.liveInfo = function(fn) {

  API.streamLiveInfo(this.credentials, this.hub, this.key, function(err, jsonData) {
    fn(err, jsonData);
  });
}

Stream.prototype.disable = function(disabledTill, fn) {

  var self = this;
  API.disableStream(this.credentials, this.hub, this.key, disabledTill, function(err, jsonData) {
    if (!err) {
      self.disabledTill = disabledTill;
      fn(null);
    } else {
      fn(err)
    }
  });
}

Stream.prototype.enable = function(fn) {

  var self = this;
  API.disableStream(this.credentials, this.hub, this.key, 0, function(err, jsonData) {
    if (!err) {
      self.disabledTill = 0;
      fn(null);
    } else {
      fn(err)
    }
  });
}

Stream.prototype.savePlayback = function(options, fn) {
  API.savePlayback(this.credentials, this.hub, this.key, options, function(err, jsonData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, jsonData['fname']);
    }
  });
}

Stream.prototype.publishHistory = function(options, fn) {
  API.publishHistory(this.credentials, this.hub, this.key, options, function(err, rst) {
    if (err) {
      fn(err, null);
    } else {
      fn(err, rst.items);
    }
  });
}

module.exports = exports = Stream;