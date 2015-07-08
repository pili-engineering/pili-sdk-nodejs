'use strict';

var Request = require('./request')
  , Stream = require('./stream');

var API = {};

exports.API = API;

exports.setMAC = function(mac, hub) {
  API.mac = mac;
  API.hub = hub;
  API.request = new Request(mac);
};

// client APIs
exports.createStream = function(options, fn) {
  var data = {
    'hub': API.hub
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

  API.request.post('/streams', data, function(err, json) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(json);
      fn(null, stream);
    }
  });
};

exports.getStream = function(streamId, fn) {
  var path = '/streams/' + streamId;

  API.request.get(path, null, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
};

exports.listStreams = function(options, fn) {
  var data = {
    'hub': API.hub
  };

  if (options) {
    if (options.marker) {
      data['marker'] = options.marker;
    }
    if (options.limit) {
      data['limit'] = options.limit;
    }
  }

  API.request.get('/streams', data, function(err, jsonData) {
    if (err) {
      fn(err, null, null);
    } else {
      var list = [];
      var marker = jsonData['marker'];
      var jsonList = jsonData['items'];

      if (jsonList) {
        jsonList.forEach(function(json) {
          var stream = new Stream(json);
          list.push(stream);
        });
      }

      fn(null, marker, list);
    }
  });
};

exports.updateStream = function(streamId, options, fn) {
  var path = '/streams/' + streamId;
  var data = {};

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

  API.request.post(path, data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(data);
      fn(null, stream);
    }
  });
};

exports.getStreamSegments = function(streamId, options, fn) {
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

  API.request.get(path, data, function(err, jsonObject) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, jsonObject['segments']);
    }
  });
};

exports.getStreamStatus = function(streamId, fn) {
  var path = '/streams/' + streamId + '/status';
  API.request.get(path, null, fn);
};

exports.deleteStream = function(streamId, fn) {
  var path = '/streams/' + streamId;
  API.request.delete(path, function(err, object) {
    fn(err);
  });
};
