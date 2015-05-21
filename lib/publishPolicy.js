'use strict';

var fmt = require('util')
  , urlUtil = require('url')
  , util = require('./util');
  
function PublishPolicy(options) {
  this.streamId = options.streamId;
  this.rtmpPublishHost = options.rtmpPublishHost;
  this.streamPublishKey = options.streamPublishKey;
  this.streamPublishSecurity = options.streamPublishSecurity;
  if (options.nonce) {
    this.nonce = options.nonce;
  } else {
    this.nonce = process.hrtime();
  }

  var components = this.streamId.split('.');
  this.hub = components[1];
  this.title = components[2];
}

PublishPolicy.prototype._baseUrl = function() {
  var url = fmt.format('rtmp://%s/%s/%s', this.rtmpPublishHost, this.hub, this.title);
  return url;
}

PublishPolicy.prototype._staticUrl = function() {
  var url = fmt.format('%s?key=%s', this._baseUrl(), this.streamPublishKey);
  return url;
}

PublishPolicy.prototype._dynamicUrl = function() {
  var url = fmt.format('%s?nonce=%d&token=%s', this._baseUrl(), this.nonceValue(), this.token());
  return url;
}

PublishPolicy.prototype.nonceValue = function() {
  if (!this.nonce) {
    this.nonce = process.hrtime();
  }
  return this.nonce;
}

PublishPolicy.prototype.token = function() {
  urlObject = urlUtil.parse(this._baseUrl());
  var path = urlObject.path;
  var digest = util.hmacSha1(path, this.streamPublishKey);
  var token = util.base64ToUrlSafe(digest);
  return token;
}

PublishPolicy.prototype.url = function() {
  var url = '';
  switch (this.streamPublishSecurity) {
    case 'static':
      url = this._staticUrl();
      break;
    case 'dynamic':
      url = this._dynamicUrl();
      break;
  }

  return url;
}

module.exports = exports = PublishPolicy;
