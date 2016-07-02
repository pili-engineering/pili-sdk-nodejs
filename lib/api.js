'use strict';

const fmt = require('util');
const Request = require('./request');
const Util = require('./util');
const Stream = require('./stream');

var API = {};

exports.API = API;

exports.init = function() {
  if (!API.request) {
    API.request = new Request();
  }
}

// client APIs
exports.createStream = function(credentials, hub, key, fn) {

  var data = {
    'key': key
  };

  var path = fmt.format('/hubs/%s/streams', hub);
  API.request.post(credentials, path, data, function(err, jsonData) {
    if (err) {
      fn(err, null);
    } else {
      var stream = new Stream(credentials, hub, key);
      fn(null, stream);
    }
  });
}

exports.listStreams = function(credentials, hub, options, fn) {

  var data = {};

  if (options) {
    if (options.liveonly) {
      data['liveonly'] = true;
    }
    if (options.prefix) {
      data['prefix'] = options.prefix;
    }
    if (options.limit) {
      data['limit'] = options.limit;
    }
    if (options.marker) {
      data['marker'] = options.marker;
    }
  }

  var path = fmt.format('/hubs/%s/streams', hub);
  API.request.get(credentials, path, data, function(err, jsonData) {
    if (err) {
      fn(err, null, null);
    } else {
      var marker = null;
      if (jsonData['marker'] && jsonData['marker'] != '') {
        marker = jsonData['marker'];
      }

      var list = [];
      var jsonList = jsonData['items'];
      if (jsonList) {
        jsonList.forEach(function(json) {
          var stream = new Stream(credentials, hub, json['key']);
          list.push(stream);
        })
      }
      fn(null, marker, list);
    }
  });
}

exports.getStreamInfo = function(credentials, hub, key, fn) {

  var path = fmt.format('/hubs/%s/streams/%s', hub, Util.urlsafeBase64Encode(key));
  API.request.get(credentials, path, null, fn);
}

exports.streamLiveInfo = function(credentials, hub, key, fn) {

  var path = fmt.format('/hubs/%s/streams/%s/live', hub, Util.urlsafeBase64Encode(key));
  API.request.get(credentials, path, null, fn);
}

exports.disableStream = function(credentials, hub, key, disabledTill, fn) {

  var path = fmt.format('/hubs/%s/streams/%s/disabled', hub, Util.urlsafeBase64Encode(key));
  var data = {
    'disabledTill': disabledTill
  }

  API.request.post(credentials, path, data, fn);
}

exports.savePlayback = function(credentials, hub, key, options, fn) {

  var path = fmt.format('/hubs/%s/streams/%s/saveas', hub, Util.urlsafeBase64Encode(key));

  var data = {};
  if (options) {
    if (options.start) {
      data['start'] = options.start;
    }
    if (options.end) {
      data['end'] = options.end;
    }
  }

  API.request.post(credentials, path, data, fn);
}

exports.publishHistory = function(credentials, hub, key, options, fn) {

  var path = fmt.format('/hubs/%s/streams/%s/historyactivity', hub, Util.urlsafeBase64Encode(key));

  var data = {};
  if (options) {
    if (options.start) {
      data['start'] = options.start;
    }
    if (options.end) {
      data['end'] = options.end;
    }
  }

  API.request.get(credentials, path, data, fn);
}

// URL ------------

exports.publishURL = function(credentials, domain, hub, key, expireAfterSec) {

	var expire = Math.floor(Date.now()/1000) + expireAfterSec;
	var path = fmt.format('/%s/%s?e=%d', hub, key, expire);
	var token = credentials.sign(path);
	return fmt.format('rtmp://%s%s&token=%s', domain, path, token);
}

exports.rtmpPlayURL = function(domain, hub, key) {
	return fmt.format('rtmp://%s/%s/%s', domain, hub, key);
}

exports.hdlPlayURL = function(domain, hub, key) {
	return fmt.format('http://%s/%s/%s.flv', domain, hub, key);
}

exports.hlsPlayURL = function(domain, hub, key) {
	return fmt.format('http://%s/%s/%s.m3u8', domain, hub, key);
}

exports.snapshotPlayURL = function(domain, hub, key) {
	return fmt.format('http://%s/%s/%s.jpg', domain, hub, key);
}
