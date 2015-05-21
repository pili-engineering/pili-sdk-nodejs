use 'strict';

var crypto = require('crypto')
  , util = require('util');

function generateAccessToken(req, accessKey, secretKey) {
  var sign = _signRequest(req, secretKey);
  var token = 'Qiniu' + ' ' + accessKey + ':' + sign;

  return token;
}

function _signRequest(req, secretKey) {
  var contentType = req.headers['Content-Type'];

  var data = req.METHOD + ' ' + req.path;
  data += '\nHost: ' + req.host;
  data += '\nContent-Type: ' + contentType;

  if (req.body && contentType != 'application/octet-stream') {
    data += '\n' + req.body;
  }

  var hmac = crypto.createHmac('sha1', secretKey);
  hmac.setEncoding('hex');
  hmac.write(data);
  hmac.end();

  var hash = hmac.read();
  var sign = urlsafeBase64Encode(hash);

  return sign;
}
