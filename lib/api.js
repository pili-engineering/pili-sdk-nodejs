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
exports.createStream = function(mac, hub, options, fn) {
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

  API.request.post(mac, '/streams', data, function(err, json) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(mac, json);
      fn(null, stream);
    }
  });
};

exports.getStream = function(mac, streamId, fn) {
  var path = '/streams/' + streamId;

  API.request.get(mac, path, null, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(mac, data);
      fn(null, stream);
    }
  });
};

exports.listStreams = function(mac, hub, options, fn) {
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

  API.request.get(mac, '/streams', data, function(err, jsonData) {
    if (err) {
      fn(err, null, null);
    } else {
      var list = [];
      var marker = jsonData['marker'];
      var jsonList = jsonData['items'];

      if (jsonList) {
        jsonList.forEach(function(json) {
          var stream = new Stream(mac, json);
          list.push(stream);
        });
      }

      fn(null, marker, list);
    }
  });
};

exports.updateStream = function(mac, streamId, options, fn) {
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

  API.request.post(mac, path, data, function(err, data) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(mac, data);
      fn(null, stream);
    }
  });
};

exports.getStreamSegments = function(mac, streamId, options, fn) {
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

  API.request.get(mac, path, data, function(err, jsonObject) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, jsonObject['segments']);
    }
  });
};

exports.getStreamStatus = function(mac, streamId, fn) {
  var path = '/streams/' + streamId + '/status';
  API.request.get(mac, path, null, fn);
};

exports.deleteStream = function(mac, streamId, fn) {
  var path = '/streams/' + streamId;
  API.request.delete(mac, path, function(err, object) {
    fn(err);
  });
};

exports.saveStreamAs = function(mac, streamId, name, format, options, fn) {
  var path = '/streams/' + streamId + '/saveas';
  var data = {};

  data['name'] = name;
  data['format'] = format;

  if (options) {
    if (options.notifyUrl) {
      data['notifyUrl'] = options.notifyUrl;
    }
    if (options.start) {
      data['start'] = options.start;
    }
    if (options.end) {
      data['end'] = options.end;
    }
  }

  API.request.post(mac, path, data, function(err, responseData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, responseData);
    }
  });
}
