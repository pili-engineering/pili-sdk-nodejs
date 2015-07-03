'use strict';

var http = require('http')
  , queryString = require('querystring')
  , auth = require('./auth')
  , config = require('./config');

function Request(mac) {
  this.host = config.API_HOST;
  this.apiVersion = config.API_VERSION;
  this.mac = mac;
}

Request.prototype.get = function(path, data, fn) {
  var reqPath = '/' + config.API_VERSION + path;
  if (data && data.length > 0) {
    reqPath += '?' + queryString.stringify(data);
  }

  var headers = {};
  var options = {
    host: this.host,
    path: reqPath,
    method: 'GET',
    headers: headers
  };
  options.headers['Authorization'] = this.mac.generateAccessToken(options, null);

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);

      if (res.statusCode >= 400) {
        var err = new Error(resultObject['message']);
        err.errorCode = resultObject['error'];
        err.httpCode = (resultObject['error'] / 1000).toFixed(0);
        fn(err, null);
      } else {
        fn(null, resultObject);
      }
    });
  });

  req.on('error', function(e) {
    fn(e, null);
  });

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
    path: '/' + config.API_VERSION + path,
    method: 'POST',
    headers: headers
  };
  options.headers['Authorization'] = this.mac.generateAccessToken(options, dataString);

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = JSON.parse(responseString);

      if (res.statusCode >= 400) {
        var err = new Error(resultObject['message']);
        err.errorCode = resultObject['error'];
        err.httpCode = (resultObject['error'] / 1000).toFixed(0);
        fn(err, null);
      } else {
        fn(null, resultObject);
      }
    });
  });

  req.on('error', function(e) {
    fn(e, null);
  });

  req.write(dataString);

  req.end();
};

Request.prototype.delete = function (path, fn) {
  var headers = {};
  var options = {
    host: this.host,
    path: '/' + config.API_VERSION + path,
    method: 'DELETE',
    headers: headers
  };
  options.headers['Authorization'] = this.mac.generateAccessToken(options, null);

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var resultObject = responseString.length > 0 ? JSON.parse(responseString) : null;

      if (res.statusCode >= 400) {
        var err = new Error(resultObject['message']);
        err.errorCode = resultObject['error'];
        err.httpCode = (resultObject['error'] / 1000).toFixed(0);
        fn(err, null);
      } else {
        fn(null, resultObject);
      }
    });
  });

  req.on('error', function(e) {
    fn(e, null);
  });

  req.end();
};

module.exports = exports = Request;
