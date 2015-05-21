use 'strict';

function urlsafeBase64Encode(jsonFlags) {
  var encoded = new Buffer(jsonFlags).toString('base64');
  return base64ToUrlSafe(encoded);
}

function base64ToUrlSafe(v) {
  return v.replace(/\//g, '_').replace(/\+/g, '-');
}
