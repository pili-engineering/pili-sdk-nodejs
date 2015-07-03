'use strict';

var fmt = require('util')
  , urlUtil = require('url')
  , util = require('./util');

function Stream(params) {
  this.id = params.id;
  this.title = params.title;
  this.hub = params.hub;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;

  if (params.disabled) {
    this.disabled = params.disabled;
  } else {
    this.disabled = false;
  }
}

Stream.prototype.rtmpLiveUrl = function(rtmpPlayHost, options) {
  var url = fmt.format('rtmp://%s/%s/%s', rtmpPlayHost, this.hub, this.title);
  if (options && options.profile) {
    url += '@' + options.profile;
  }
  return url;
};

Stream.prototype.hlsLiveUrl = function(hlsPlayHost, options) {
  var url = '';
  if (options && options.profile) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8', hlsPlayHost, this.hub, this.title, options.profile);
  } else {
    url = fmt.format('http://%s/%s/%s.m3u8', hlsPlayHost, this.hub, this.title);
  }
  return url;
};

Stream.prototype.hlsPlaybackUrl = function(hlsPlayHost, startTime, endTime, options) {
  var url = '';
  if (options && options.profile) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8?start=%d&end=%d', hlsPlayHost,
      this.hub, this.title, options.profile, startTime, endTime);
  } else {
    url = fmt.format('http://%s/%s/%s.m3u8?start=%d&end=%d', hlsPlayHost,
     this.hub, this.title, startTime, endTime);
  }
  return url;
};

Stream.prototype.rtmpPublishUrl = function(rtmpPublishHost) {
  var url = '';
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
  var url = fmt.format('%s?nonce=%d&token=%s', this._baseUrl(rtmpPublishHost), this._nonceValue(), this._token(rtmpPublishHost));
  return url;
}

Stream.prototype._nonceValue = function() {
  if (!this.nonce) {
    this.nonce = process.hrtime();
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
