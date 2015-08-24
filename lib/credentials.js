'use strict';

var util = require('./util');

function Credentials(accessKey, secretKey) {
  this.accessKey = accessKey;
  this.secretKey = secretKey;
}

Credentials.prototype.generateAccessToken = function (options, data) {
  var sign = this._signRequest(options, data);
  var token = 'Qiniu' + ' ' + this.accessKey + ':' + sign;

  return token;
}

Credentials.prototype._signRequest = function (options, body) {
  var contentType = options.headers['Content-Type'];

  var data = options.method + ' ' + options.path;
  data += '\nHost: ' + options.host;
  if (contentType) {
    data += '\nContent-Type: ' + contentType;
  }
  data += '\n\n';

  if (body && contentType && contentType != 'application/octet-stream') {
    data += body;
  }

  var digest = util.hmacSha1(data, this.secretKey);
  var sageDigest = util.base64ToUrlSafe(digest);

  return sageDigest;
}

module.exports = exports = Credentials;
