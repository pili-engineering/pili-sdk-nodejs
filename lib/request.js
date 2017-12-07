'use strict';

var http = require('http'),
  queryString = require('querystring'),
  config = require('./config');

function Request(opt) {

    if (!opt) {
        opt = {};
    }
    if (opt.port) {
        this.port = opt.port;
    } else {
        this.port = config.API_PORT;
    }

    if (opt.host) {
        this.host = opt.host;
    } else {
        this.host = config.API_HOST;
    }

    if (opt.apiVersion) {
        this.apiVersion = opt.apiVersion;
    } else {
        this.apiVersion = config.const.DEFAULT_API_VERSION;
    }
}

Request.prototype.get = function(credentials, path, data, fn) {
  var reqPath = '/' + this.apiVersion + path;

  if (data && Object.keys(data).length > 0) {
    reqPath += '?' + queryString.stringify(data);
  }

  var headers = {};
  var options = {
    host: this.host,
    port: this.port,
    path: reqPath,
    method: 'GET',
    headers: headers
  };
  options.headers['Authorization'] = credentials.generateAccessToken(options, null);

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
        err.httpCode = res.statusCode;

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

Request.prototype.post = function(credentials, path, data, fn) {
  var dataString = JSON.stringify(data);
  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': dataString.length
  };

  var options = {
    host: this.host,
    port: this.port,
    path: '/' + this.apiVersion + path,
    method: 'POST',
    headers: headers
  };
  options.headers['Authorization'] = credentials.generateAccessToken(options, dataString);

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

Request.prototype.delete = function(credentials, path, fn) {
  var headers = {};
  var options = {
    host: this.host,
    port: this.port,
    path: '/' + this.apiVersion + path,
    method: 'DELETE',
    headers: headers
  };
  options.headers['Authorization'] = credentials.generateAccessToken(options, null);

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