'use strict';

var Request = require('./request')
  , Mac = require('./auth');

function Client(options) {
  this.mac = new Mac(options.accessKey, options.secretKey);
  this.request = new Request(this.mac);
};

Client.prototype.createStream = function(title, hub, publishKey, publishSecurity, fn) {
  var data = {
    'hub': hub
  };

  if (title) {
    data['title'] = title;
  }
  if (publishKey) {
    data['publishKey'] = publishKey;
  }
  if (publishSecurity) {
    data['publishSecurity'] = publishSecurity;
  }

  this.request.post('/streams', data, fn);
}

Client.prototype.getStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  this.request.get(path, null, fn);
}

Client.prototype.updateStream = function(streamId, publishKey, publishSecurity, fn) {
  var path = '/streams/' + streamId;
  var data = {
    'publishKey': publishKey,
    'publishSecurity': publishSecurity
  };
  this.request.post(path, data, fn);
}

Client.prototype.listStreams = function(hub, marker, limit, fn) {
  var data = {
    'hub': hub
  };

  if (marker) {
    data['maker'] = maker;
  }
  if (limit) {
    data['limit'] = limit;
  }
  this.request.get('/streams', data, fn);
}

Client.prototype.deleteStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  this.request.delete(path, fn);
}

Client.prototype.getStreamSegments = function(streamId, startTime, endTime, fn) {
  var path = '/streams/' + streamId + '/segments';
  var data = {
    'start': startTime,
    'end': endTime
  };
  this.request.get(path, data, fn);
}

module.exports = exports = Client;
