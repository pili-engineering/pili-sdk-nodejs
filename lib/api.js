'use strict';

const fmt = require('util');
const Request = require('./request');
const Util = require('./util');
const Stream = require('./stream');
const config = require('./config');

var API = {};

exports.API = API;

exports.init = function() {
  if (!API.request) {
    API.request = new Request();
  }
  if (!API.requestRTC) {
    API.requestRTC = new Request({
        host: config.const.DEFAULT_RTC_HOST,
        apiVersion: "v1"
        });
    }
  if(!API.requestRTCV2) {
    API.requestRTCV2 = new Request({
        host: config.const.DEFAULT_RTC_HOST,
        apiVersion: "v2"
    });
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

exports.batchLiveStreamsInfo = function(credentials, hub, items, fn) {
    var path = fmt.format('/hubs/%s/livestreams', hub);
    var data = {'items': items};
    API.request.post(credentials, path, data, function(err, jsonData) {
        if (err) {
            fn(err, null);
            return;
        }

        var list = jsonData['items'];
        fn(null, list);
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
    if (options.fname) {
        data['fname'] = options.fname;
    }
    if (options.start) {
      data['start'] = options.start;
    }
    if (options.end) {
      data['end'] = options.end;
    }
    if (options.format) {
      data['format'] = options.format;
    }
    if (options.pipeline) {
        data['pipeline'] = options.pipeline;
    }
    if (options.notify) {
        data['notify'] = options.notify;
    }
    if (options.expireDays) {
        data['expireDays'] = options.expireDays;
    }
  }

  API.request.post(credentials, path, data, fn);
}

exports.saveSnapshot = function(credentials, hub, key, options, fn) {

    var path = fmt.format('/hubs/%s/streams/%s/snapshot', hub, Util.urlsafeBase64Encode(key));

    var data = {};
    if (options) {
        if (options.fname) {
            data['fname'] = options.fname;
        }
        if (options.time) {
            data['time'] = options.time;
        }
        if (options.format) {
            data['format'] = options.format;
        }
    }

    API.request.post(credentials, path, data, fn);
}

exports.updateConverts = function(credentials, hub, key, profiles, fn) {
    var path = fmt.format('/hubs/%s/streams/%s/converts', hub, Util.urlsafeBase64Encode(key));
    var data = {};
    data['converts'] = profiles;
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

//RTC ------------------------
exports.createRtcRoom = function(credentials, ownerID, roomName, options, fn) {

    var path = fmt.format('/rooms');
    var data = {
        "owner_id": ownerID,
        "room_name": roomName
    }

    if (options.userMax) {
        data["user_max"] = options.userMax;
    }

    API.requestRTC.post(credentials, path, data, fn);
}

exports.getRtcRoom = function(credentials, roomName, fn) {

    var path = fmt.format('/rooms/%s', roomName);

    API.requestRTC.get(credentials, path, {}, fn);
}

exports.deleteRtcRoom = function(credentials, roomName, fn) {

    var path = fmt.format('/rooms/%s', roomName);

    API.requestRTC.delete(credentials, path, fn);
}

exports.getRoomMember = function(credentials, roomName, fn) {

    var path = fmt.format('/rooms/%s/users', roomName);

    API.requestRTC.get(credentials, path,{}, fn);
}

exports.deleteRoomMember = function(credentials, roomName, userId,fn) {

    var path = fmt.format('/rooms/%s/users/%s', roomName, userId);
    console.log(path);

    API.requestRTC.delete(credentials, path, fn);
}

//RTCV2---------------------------------------------
exports.createRtcRoomV2 = function(credentials, ownerID, roomName, options, fn) {

    var path = fmt.format('/rooms');
    var data = {
        "owner_id": ownerID,
        "room_name": roomName
    }

    if (options.userMax) {
        data["user_max"] = options.userMax;
    }

    API.requestRTCV2.post(credentials, path, data, fn);
}

exports.getRtcRoomV2 = function(credentials, roomName, fn) {

    var path = fmt.format('/rooms/%s', roomName);

    API.requestRTCV2.get(credentials, path, {}, fn);
}

exports.deleteRtcRoomV2 = function(credentials, roomName, fn) {

    var path = fmt.format('/rooms/%s', roomName);

    API.requestRTCV2.delete(credentials, path, fn);
}

exports.getRoomMemberV2 = function(credentials, roomName, fn) {
    var path = fmt.format('/rooms/%s/users', roomName);

    API.requestRTCV2.get(credentials, path,{}, fn);
}

exports.deleteRoomMemberV2 = function(credentials, roomName, userId,fn) {

    var path = fmt.format('/rooms/%s/users/%s', roomName, userId);
    console.log(path);

    API.requestRTCV2.delete(credentials, path, fn);
}