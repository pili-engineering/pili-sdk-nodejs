'use strict';

var fmt = require('util')
  , urlUtil = require('url')
  , util = require('./util')
  , API = require('./api')
  , config = require('./config');

var ORIGIN = config.const.ORIGIN;

function Stream(credentials, params) {
  this.credentials = credentials;

  this.id = params.id;
  this.createdAt = params.createdAt;
  this.updatedAt = params.updatedAt;
  this.title = params.title;
  this.hub = params.hub;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;

  if (params.disabled) {
    this.disabled = params.disabled;
  } else {
    this.disabled = false;
  }

  if (params.profiles == null || params.profiles == 'undefined') {
    this.profiles = null;
  } else {
    this.profiles = params.profiles;
  }

  this.hosts = params.hosts;
}

/**
 * Stream operations
 */
Stream.prototype.update = function(options, fn) {
  API.updateStream(this.credentials, this.id, options, fn);
}

Stream.prototype.enable = function(fn) {
  var options = {
    disabled: false
  };
  API.updateStream(this.credentials, this.id, options, fn);
}

Stream.prototype.disable = function(fn) {
  var options = {
    disabled: true
  };
  API.updateStream(this.credentials, this.id, options, fn);
}

Stream.prototype.delete = function(fn) {
  API.deleteStream(this.credentials, this.id, fn);
}

Stream.prototype.status = function(fn) {
  API.getStreamStatus(this.credentials, this.id, fn);
}

Stream.prototype.segments = function(options, fn) {
  API.getStreamSegments(this.credentials, this.id, options, fn);
}

Stream.prototype.snapshot = function(name, format, options, fn) {
  API.snapshotStream(this.credentials, this.id, name, format, options, fn);
}

function replacer(key, value) {
  if (key == 'credentials') {
    return undefined;
} else if (key == 'play') {
    return undefined;
  } else {
    return value;
  }
}

Stream.prototype.toJSONString = function() {
  return JSON.stringify(this, replacer);
}

Stream.prototype.saveAs = function(name, start, end, options, fn) {
  API.saveStreamAs(this.credentials, this.id, name, start, end, options, fn);
}

/**
 * URL generators
 */
Stream.prototype.rtmpLiveUrls = function() {
  var result = {};
  var rtmpPlayHost = this.hosts.live.rtmp;
  var url = fmt.format('rtmp://%s/%s/%s', rtmpPlayHost, this.hub, this.title);
  result[ORIGIN] = url;

  if (this.profiles) {
    this.profiles.forEach(function(profile) {
      var profileUrl = url + '@' + profile;
      result[profile] = profileUrl;
    });
  }
  return result;
};

Stream.prototype.hlsLiveUrls = function() {
  var result = {};
  var hlsPlayHost = this.hosts.live.hls;
  var url = fmt.format('http://%s/%s/%s.m3u8', hlsPlayHost, this.hub, this.title);
  result[ORIGIN] = url;

  if (this.profiles) {
    this.profiles.forEach(function(profile) {
      var profileUrl = fmt.format('http://%s/%s/%s@%s.m3u8', hlsPlayHost, this.hub, this.title, profile);
      result[profile] = profileUrl;
    });
  }

  return result;
};

Stream.prototype.hlsPlaybackUrls = function(startTime, endTime, fn) {
  name = fmt.format("%d", Date.now() / 1000);
  this.saveAs(name, startTime, endTime, nil, function(err, resp) {
      if (err) {
          fn(err, null);
      } else {
          var result = {};
          result[ORIGIN] = resp.url;
          fn(nil, result);
      }
  })
};

Stream.prototype.rtmpPublishUrl = function() {
  var url = '';
  var rtmpPublishHost = this.hosts.publish.rtmp;
  switch (this.publishSecurity) {
    case 'static':
      url = this._staticUrl(rtmpPublishHost);
      break;
    case 'dynamic':
      url = this._dynamicUrl(rtmpPublishHost);
      break;
  }

  return url;
}

Stream.prototype.httpFlvLiveUrls = function() {
    var result = {};
    var httpLivePlayHost = this.hosts.live.hdl;
    var url = fmt.format('http://%s/%s/%s.flv', httpLivePlayHost, this.hub, this.title);
    result[ORIGIN] = url;

    if (this.profiles) {
      this.profiles.forEach(function(profile) {
        var profileUrl = fmt.format('http://%s/%s/%s@%s.flv', httpLivePlayHost, this.hub, this.title, profile);
        result[profile] = profileUrl;
      });
    }

    return result;
}

Stream.prototype._baseUrl = function(rtmpPublishHost) {
  var url = fmt.format('rtmp://%s/%s/%s', rtmpPublishHost, this.hub, this.title);
  return url;
}

Stream.prototype._staticUrl = function(rtmpPublishHost) {
  var url = fmt.format('%s?key=%s', this._baseUrl(rtmpPublishHost), this.publishKey);
  return url;
}

Stream.prototype._dynamicUrl = function(rtmpPublishHost) {
  this.nonce = 0;
  var url = fmt.format('%s?nonce=%d&token=%s', this._baseUrl(rtmpPublishHost), this._nonceValue(), this._token(rtmpPublishHost));
  return url;
}

Stream.prototype._nonceValue = function() {
  if (!this.nonce) {
    this.nonce = Date.now() / 1000 | 0;
  }
  return this.nonce;
}

Stream.prototype._token = function(rtmpPublishHost) {
  var urlObject = urlUtil.parse(this._baseUrl(rtmpPublishHost));
  var path = urlObject.path;
  var digest = util.hmacSha1(path, this.publishKey);
  var token = util.base64ToUrlSafe(digest);
  return token;
}

module.exports = exports = Stream;
