'use strict';

var Request = require('request');

var Pili = function(options) {
  this.accessKey = options['accessKey'];
  this.secretKey = options['secretKey'];
  this.request = new Request(options);
};

Pili.prototype.createStream = function(title, hub, publishKey, publishSecurity, fn) {
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

Pili.prototype.getStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  this.request.get(path, null, fn);
}

Pili.prototype.updateStream = function(streamId, publishKey, publishSecurity, fn) {
  var path = '/streams/' + streamId;
  var data = {
    'publishKey': publishKey,
    'publishSecurity': publishSecurity
  };
  this.request.post(path, data, fn);
}

Pili.prototype.listStreams = function(hub, marker, limit, fn) {
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

Pili.prototype.deleteStream = function(streamId, fn) {
  var path = '/streams' + streamId;
  this.request.delete(path, fn);
}

Pili.prototype.getStreamSegments = function(streamId, startTime, endTime, fn) {
  var = path = '/streams/' + streamId + '/segments';
  var data = {
    'start': startTime,
    'end': endTime
  };
  this.request.get(path, data, fn);
}
