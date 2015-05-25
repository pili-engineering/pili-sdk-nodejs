'use strict';

var Pili = require('../index.js');

// ========================== Client ============================

var creds = {
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY'
};

var HUB = 'HUB_NAME';

/**
 * Create a Pili client
 */
var client = new Pili.Client(creds);

/**
 * Create a new streamPublishKey
 */
var hub = HUB;              // required.
var title = null;           // optional.
var publishKey = null;      // optional.
var publishSecurity = null; // optional. 'static' or 'dynamic', 'dynamic' as default.

client.createStream(hub, title, publishKey, publishSecurity, function(err, stream) {
  // handle request
});

/**
 * Get a stream
 */
var streamId = null;
// Suppose you own a streamId.
client.getStream(streamId, function(err, stream) {
  // handle request
});


/**
 * Update a stream
 */
client.updateStream(streamId, publishKey, publishSecurity, function(err, stream) {
  // handle request
});

/**
 * List streams
 */
 var hub = HUB;     // required.
 var marker = null; // optional.
 var limit = 0;     // optional.
client.listStreams(hub, marker, limit, function(err, streams) {
  // handle request
});

/**
 * Delete a stream
 */
client.deleteStream(streamId, function(err, data) {
  // handle request
});

/**
 * Get stream segments
 */
var startTime = 0;  // optional.
var endTime = 0;    // optional.
client.getStreamSegments(streamId, startTime, endTime, function(err, data) {
  // handle request
});

// =========================== Policy =============================
// Replace with your customized domains
var publishParams = {
  streamId:              streamId,
  rtmpPublishHost:       'xxx.pub.z1.pili.qiniup.com',
  streamPublishKey:      'STREAM_PUBLISH_KEY',
  streamPublishSecurity: 'dynamic' // 'static' or 'dynamic'
};

// Replace with your customized domains
var playParams = {
  streamId:     streamId,
  rtmpPlayHost: 'xxx.live1.z1.pili.qiniucdn.com',
  hlsPlayHost:  'xxx.hls1.z1.pili.qiniucdn.com'
};

/**
 * Create a publish policy directly
 */
var publish = new Pili.PublishPolicy(publishParams);

// or generate one from stream object
var publish = stream.generatePublishPolicy(publishParams.rtmpPublishHost);

// Publish policy operations
var pushUrl = publish.url();

/**
 * Create a play policy directly
 */
var play = new Pili.PlayPolicy(playParams);

// or generate one from stream object
var play = stream.generatePlayPolicy(playParams.rtmpPlayHost, playParams.hlsPlayHost);

// Play policy operations
var preset = null;  // optional, just like '720p', '480p', '360p', '240p'. All presets should be defined first.

var rtmpLiveUrl = play.rtmpLiveUrl(preset);
var hlsLiveUrl = play.hlsLiveUrl(preset);
var hlsPlaybackUrl = play.hlsPlaybackUrl(startTime, endTime, preset);
