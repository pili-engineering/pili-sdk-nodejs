'use strict';

var PlayPolicy = require('./playPolicy')
  , PublishPolicy = require('./publishPolicy')
  .config = require('./conf');

function Stream(params) {
  this.id = params.id;
  this.title = params.title;
  this.hub = params.hub;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;
  this.createdAt = params.createdAt;
  this.updatedAt = params.updatedAt;
}

Stream.prototype.playPolicy = function() {
  var play = new PlayPolicy({
    streamId: this.id,
    rtmpPlayHost: config.RTMP_PLAY_HOST,
    hlsPlayHost: conf.HLS_PLAY_HOST
  });

  return play;
};

Stream.prototype.publishPolicy = function() {
  var publish = new PublishPolicy({
    streamId: this.id,
    rtmpPublishHost: conf.RTMP_PUBULISH_HOST,
    streamPublishKey: this.publishKey,
    streamPublishSecurity: this.publishSecurity
  });

  return publish;
}

module.exports = exports = Stream;
