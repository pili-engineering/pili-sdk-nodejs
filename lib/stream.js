'use strict';

var PlayPolicy = require('./playPolicy')
  , PublishPolicy = require('./publishPolicy')
  , fmt = require('util')
  , urlUtil = require('url')
  , util = require('./util');

function Stream(params) {
  this.id = params.id;
  this.title = params.title;
  this.hub = params.hub;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;
  this.createdAt = params.createdAt;
  this.updatedAt = params.updatedAt;
}

Stream.prototype.rtmpLiveUrl = function(rtmpPlayHost, profile) {
  var url = fmt.format('rtmp://%s/%s/%s', rtmpPlayHost, this.hub, this.title);
  if (profile) {
    url += '@' + profile;
  }
  return url;
};

Stream.prototype.hlsLiveUrl = function(hlsPlayHost, profile) {
  var url = '';
  if (profile) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8', hlsPlayHost, this.hub, this.title, profile);
  } else {
    url = fmt.format('http://%s/%s/%s.m3u8', hlsPlayHost, this.hub, this.title);
  }
  return url;
};

Stream.prototype.hlsPlaybackUrl = function(hlsPlayHost, startTime, endTime, profile) {
  var url = '';
  if (profile) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8?start=%d&end=%d', hlsPlayHost,
      this.hub, this.title, profile, startTime, endTime);
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
  urlObject = urlUtil.parse(this._baseUrl(rtmpPublishHost));
  var path = urlObject.path;
  var digest = util.hmacSha1(path, this.publishKey);
  var token = util.base64ToUrlSafe(digest);
  return token;
}

module.exports = exports = Stream;
