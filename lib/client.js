'use strict';

var Request = require('./request')
  , Mac = require('./auth')
  , Stream = require('./stream');

function Client(params) {
  this.mac = new Mac(params.accessKey, params.secretKey);
  this.request = new Request(this.mac);
};

Client.prototype.createStream = function(hub, title, publishKey, publishSecurity, fn) {
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

  this.request.post('/streams', data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
}

Client.prototype.getStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  this.request.get(path, null, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
}

Client.prototype.updateStream = function(streamId, publishKey, publishSecurity, fn) {
  var path = '/streams/' + streamId;
  var data = {
    'publishKey': publishKey,
    'publishSecurity': publishSecurity
  };
  this.request.post(path, data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
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
  this.request.get('/streams', data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var list = [];
      var jsonList = data['items'];
      
      jsonList.forEach(function(json) {
        var stream = new Stream(json);
        list.push(stream);
      });

      fn(null, list);
    }
  });
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
