'use strict';

var fmt = require('util');

function PlayPolicy(options) {
  this.streamId = options.streamId;
  this.rtmpPlayHost = options.rtmpPlayHost;
  this.hlsPlayHost = options.hlsPlayHost;

  var components = this.streamId.split('.');
  this.hub = components[1];
  this.title = components[2];
}

PlayPolicy.prototype.rtmpLiveUrl = function(preset) {
  var url = fmt.format('rtmp://%s/%s/%s', this.rtmpPlayHost, this.hub, this.title);
  if (preset) {
    url += '@' + preset;
  }
  return url;
}

PlayPolicy.prototype.hlsLiveUrl = function(preset) {
  var url = '';
  if (preset) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8', this.hlsPlayHost, this.hub, this.title, preset);
  } else {
    url = fmt.format('http://%s/%s/%s.m3u8', this.hlsPlayHost, this.hub, this.title);
  }
  return url;
}

PlayPolicy.prototype.hlsPlaybackUrl = function(startTime, endTime, preset) {
  var url = '';
  if (preset) {
    url = fmt.format('http://%s/%s/%s@%s.m3u8?start=%d&end=%d', this.hlsPlayHost,
      this.hub, this.title, preset, startTime, endTime);
  } else {
    url = fmt.format('http://%s/%s/%s.m3u8?start=%d&end=%d', this.hlsPlayHost,
     this.hub, this.title, startTime, endTime);
  }
  return url;
}

module.exports = exports = PlayPolicy;
