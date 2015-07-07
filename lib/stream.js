'use strict';

var fmt = require('util')
  , urlUtil = require('url')
  , util = require('./util');

var STREAM_DEFAULT = '_DEFAULT';

function Stream(params) {
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

  this.profiles = params.profiles;
  this.hosts = params.hosts;
}

Stream.prototype.rtmpLiveUrl = function() {
  var result = {};
  var rtmpPlayHost = this.hosts.play.rtmp;
  var url = fmt.format('rtmp://%s/%s/%s', rtmpPlayHost, this.hub, this.title);
  result[STREAM_DEFAULT] = url;

  if (this.profiles) {
    this.profiles.forEach(function(profile) {
      var profileUrl = url + '@' + profile;
      result[profile] = profileUrl;
    });
  }
  return result;
};

Stream.prototype.hlsLiveUrl = function() {
  var hlsPlayHost = this.hosts.play.hls;
  var url = fmt.format('http://%s/%s/%s.m3u8', hlsPlayHost, this.hub, this.title);;
  return url;
};

Stream.prototype.hlsPlaybackUrl = function(startTime, endTime) {
  var hlsPlayHost = this.hosts.play.hls;
  var url = fmt.format('http://%s/%s/%s.m3u8?start=%d&end=%d', hlsPlayHost,
   this.hub, this.title, startTime, endTime);
  return url;
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
    this.nonce = Date.now();
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
