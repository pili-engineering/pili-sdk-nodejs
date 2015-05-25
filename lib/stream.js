'use strict';

var PlayPolicy = require('./playPolicy')
  , PublishPolicy = require('./publishPolicy');

function Stream(params) {
  this.id = params.id;
  this.title = params.title;
  this.hub = params.hub;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;
  this.createdAt = params.createdAt;
  this.updatedAt = params.updatedAt;
}

Stream.prototype.generatePlayPolicy = function(rtmpPlayHost, hlsPlayHost) {
  var play = new PlayPolicy({
    streamId: this.id,
    rtmpPlayHost: rtmpPlayHost,
    hlsPlayHost: hlsPlayHost
  });

  return play;
};

Stream.prototype.generatePublishPolicy = function(rtmpPublishHost) {
  var publish = new PublishPolicy({
    streamId: this.id,
    rtmpPublishHost: rtmpPublishHost,
    streamPublishKey: this.publishKey,
    streamPublishSecurity: this.publishSecurity
  });

  return publish;
}

module.exports = exports = Stream;
