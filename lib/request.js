'use strict';

var http = require('http')
  , queryString = require('querystring')
  , auth = require('auth');


var API_HOST    = 'pili.qiniuapi.com';
var API_VERSION = 'v1';

function Request(options) {
  this.host = API_HOST;
  this.apiVersion = API_VERSION;
  this.accessKey = options['accessKey'];
  this.secretKey = options['secretKey'];
}

Request.prototype.get = function(path, data, fn) {
  var reqPath = '/' + API_VERSION + path;
  if (data) {
    reqPath += '?' + queryString.stringify(data);
  }

  var headers = {
    'Content-Type': 'application/json'
  };
  var options = {
    host: this.host,
    path: reqPath,
    method: 'GET',
    headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
      fn(null, resultObject);
    });
  });

  req.on('error', function(e) {
    fn(e, null);
  });

  req.headers['Authorization'] = generateAccessToken(req, this.accessKey, this.secretKey);

  req.end();
};

Request.prototype.post = function (path, data, fn) {
  var dataString = JSON.stringify(data);
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': dataString.length
  };

  var options = {
    host: this.host,
    path: '/' + API_VERSION + path,
    method: 'POST',
    headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
      fn(null, resultObject);
    });
  });

  req.on('error', function(e) {
    fn(e, null);
  });

  req.write(dataString);
  req.headers['Authorization'] = generateAccessToken(req, this.accessKey, this.secretKey);

  req.end();
};

Request.prototype.delete = function (path, fn) {
  var headers = {
    'Content-Type': 'application/json'
  };
  var options = {
    host: this.host,
    path: '/' + API_VERSION + path,
    method: 'DELETE',
    headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);
      fn(null, resultObject);
    });
  });
  
  req.on('error', function(e) {
    fn(e, null);
  });

  req.headers['Authorization'] = generateAccessToken(req, this.accessKey, this.secretKey);

  req.end();
};
