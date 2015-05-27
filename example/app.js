'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
var creds = {
  accessKey: 'QiniuAccessKey',
  secretKey: 'QiniuSecretKey'
};

var HUB = 'hubName';

var RTMP_PUBLISH_HOST = "xxx.pub.z1.pili.qiniup.com";
var RTMP_PLAY_HOST    = "xxx.live1.z1.pili.qiniucdn.com";
var HLS_PLAY_HOST     = "xxx.hls1.z1.pili.qiniucdn.com";

// ========================== Client ============================

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
  // Log stream
  // {
  //    id: 'STREAM_ID',
  //    title: 'STREAM_TITLE'.
  //    hub: 'HUB_NAME',
  //    publishKey: 'PUBLISH_KEY',
  //    publishSecurity: 'PUBLISH_SECURITY',
  //    createdAt: 'CREATED_TIME',
  //    updatedAt: 'UPDATED_TIME'
  // }
  console.log(stream);
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
  streams.forEach(function(stream) {
    // do something with stream object
    console.log(stream);
  });
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

/**
 * Generate RTMP publish URL
 */
var publishUrl = stream.rtmpPublishUrl(RTMP_PUBLISH_HOST);

/**
 * Generate RTMP live play URL
 */
 var preset = null;  // optional, just like '720p', '480p', '360p', '240p'. All presets should be defined first.
 
var rtmpLiveUrl = stream.rtmpLiveUrl(RTMP_PLAY_HOST, preset);

/**
 * Generate HLS live play URL
 */
var hlsLiveUrl = stream.hlsLiveUrl(HLS_PLAY_HOST, preset);

/**
 * Generate HLS playback URL
 */
var hlsPlaybackUrl = stream.hlsPlaybackUrl(HLS_PLAY_HOST, startTime, endTime, preset);
