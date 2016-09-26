'use strict';

var Request = require('./request')
  , Stream = require('./stream');

var API = {};

exports.API = API;

exports.init = function() {
  if (!API.request) {
    API.request = new Request();
  }
};

// client APIs
exports.createStream = function(credentials, hub, options, fn) {
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

  API.request.post(credentials, '/streams', data, function(err, json) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(credentials, json);
      fn(null, stream);
    }
  });
};

exports.getStream = function(credentials, streamId, fn) {
  var path = '/streams/' + streamId;

  API.request.get(credentials, path, null, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(credentials, data);
      fn(null, stream);
    }
  });
};

exports.listStreams = function(credentials, hub, options, fn) {
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
    if (options.title) {
      data['title'] = options.title;
    }
  }

  API.request.get(credentials, '/streams', data, function(err, jsonData) {
    if (err) {
      fn(err, null, null);
    } else {
      var list = [];
      var marker = jsonData['marker'];
      var jsonList = jsonData['items'];

      if (jsonList) {
        jsonList.forEach(function(json) {
          var stream = new Stream(credentials, json);
          list.push(stream);
        });
      }

      fn(null, marker, list);
    }
  });
};

exports.updateStream = function(credentials, streamId, options, fn) {
  var path = '/streams/' + streamId;
  var data = {};

  if (options) {
    if (options.publishKey) {
      data['publishKey'] = options.publishKey;
    }
    if (options.publishSecurity) {
      data['publishSecurity'] = options.publishSecurity;
    }
    if (options.disabled != 'undefined') {
      data['disabled'] = options.disabled;
    }
  }

  API.request.post(credentials, path, data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(credentials, data);
      fn(null, stream);
    }
  });
};

exports.getStreamSegments = function(credentials, streamId, options, fn) {
  var path = '/streams/' + streamId + '/segments';
  var data = {};

  if (options) {
    if (options.startTime) {
      data['start'] = options.startTime;
    }
    if (options.endTime) {
      data['end'] = options.endTime;
    }
    if (options.limit) {
      data['limit'] = options.limit;
    }
  }

  API.request.get(credentials, path, data, function(err, jsonObject) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, jsonObject['segments']);
    }
  });
};

exports.getStreamStatus = function(credentials, streamId, fn) {
  var path = '/streams/' + streamId + '/status';
  API.request.get(credentials, path, null, fn);
};

exports.deleteStream = function(credentials, streamId, fn) {
  var path = '/streams/' + streamId;
  API.request.delete(credentials, path, function(err, object) {
    fn(err);
  });
};

exports.saveStreamAs = function(credentials, streamId, name, format, start, end, options, fn) {
  var path = '/streams/' + streamId + '/saveas';
  var data = {};

  data['name'] = name;
  data['start'] = start;
  data['end'] = end;

  if (format) {
    data['format'] = format;
  }
  if (options) {
    if (options.notifyUrl) {
      data['notifyUrl'] = options.notifyUrl;
    }
    if (options.pipeline) {
      data['pipeline'] = options.pipeline;
    }
  }

  API.request.post(credentials, path, data, function(err, responseData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, responseData);
    }
  });
}

exports.snapshotStream = function(credentials, streamId, name, format, options, fn) {
  var path = '/streams/' + streamId + '/snapshot';
  var data = {};

  data['name'] = name;
  data['format'] = format;

  if (options) {
    if (options.time) {
      data['time'] = options.time;
    }
    if (options.notifyUrl) {
      data['notifyUrl'] = options.notifyUrl;
    }
  }

  API.request.post(credentials, path, data, function(err, responseData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, responseData);
    }
  });
}
exports.createRoom = function(credentials, ownerId ,roomName, fn) {
  var path = '/rooms';
  var data = {};
  data['ownerId'] = name;
  if (roomName) {
    data['roomName'] = roomName;
  }
  API.request.post(credentials, path, data, function(err, responseData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, responseData);
    }
  });
};
exports.getRoom = function(credentials, roomName, fn) {
  var path = '/rooms' + roomName;
  API.request.get(credentials, path, null, function(err, responseData) {
    if (err) {
      fn(err, null);
    } else {
      var room = new Room(credentials, responseData);
      fn(null, room);
    }
  });
};
exports.deleteRoom = function(credentials, roomName, fn) {
  var path = '/rooms/' + roomName;
  API.request.delete(credentials, path, function(err, object) {
    fn(err);
  });
};
