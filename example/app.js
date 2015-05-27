'use strict';

var Pili = require('../index.js')
  , config = Pili.config;

// ========================== Client ============================

/**
 * Create a Pili client
 */
var client = new Pili.Client(config.CREDS);

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
 * Create a publish policy from stream object
 */
var publish = stream.publishPolicy();

// Publish policy operations
var pushUrl = publish.url();

/**
 * Create a play policy frome stream object
 */
var play = stream.playPolicy();

// Play policy operations
var preset = null;  // optional, just like '720p', '480p', '360p', '240p'. All presets should be defined first.

var rtmpLiveUrl = play.rtmpLiveUrl(preset);
var hlsLiveUrl = play.hlsLiveUrl(preset);
var hlsPlaybackUrl = play.hlsPlaybackUrl(startTime, endTime, preset);
