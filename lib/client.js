'use strict';

var Request = require('./request')
  , Mac = require('./auth')
  , Stream = require('./stream');

function Client(accessKey, secretKey) {
  this.mac = new Mac(accessKey, secretKey);
  this.request = new Request(this.mac);
};

Client.prototype.createStream = function(hub, options, fn) {
  var data = {
    'hub': hub
  };

  if (options) {
    if (options.title) {
      data['title'] = options.title;
    }
    if (options.publishKey) {
      data['publishKey'] = options.publishKey;
    }
    if (options.publishSecurity) {
      data['publishSecurity'] = options.publishSecurity;
    }
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

Client.prototype.updateStream = function(streamId, options, fn) {
  var path = '/streams/' + streamId;
  var data = {};

  if (options) {
    if (options.publishKey) {
      data['publishKey'] = options.publishKey;
    }
    if (options.publishSecurity) {
      data['publishSecurity'] = options.publishSecurity;
    }
  }

  this.request.post(path, data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
}

Client.prototype.listStreams = function(hub, options, fn) {
  var data = {
    'hub': hub
  };

  if (options) {
    if (options.marker) {
      data['marker'] = options.marker;
    }
    if (options.limit) {
      data['limit'] = options.limit;
    }
  }

  this.request.get('/streams', data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var list = [];
      var jsonList = data['items'];

      if (jsonList) {
        jsonList.forEach(function(json) {
          var stream = new Stream(json);
          list.push(stream);
        });
      }

      fn(null, list);
    }
  });
}

Client.prototype.deleteStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  this.request.delete(path, fn);
}

Client.prototype.getStreamSegments = function(streamId, options, fn) {
  var path = '/streams/' + streamId + '/segments';
  var data = {};

  if (options) {
    if (options.startTime) {
      data['start'] = options.startTime;
    }
    if (options.endTime) {
      data['end'] = options.endTime;
    }
  }

  this.request.get(path, data, fn);
}

Client.prototype.getStreamStatus = function(streamId, fn) {
  var path = '/streams/' + streamId + '/status';
  this.request.get(path, null, fn);
}

module.exports = exports = Client;
