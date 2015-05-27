'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

var HUB = 'hubName';

var RTMP_PUBLISH_HOST = "xxx.pub.z1.pili.qiniup.com";
var RTMP_PLAY_HOST    = "xxx.live1.z1.pili.qiniucdn.com";
var HLS_PLAY_HOST     = "xxx.hls1.z1.pili.qiniucdn.com";

// ========================== Client ============================

/**
 * Create a Pili client
 */
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY);

/**
 * Create a new streamPublishKey
 */
var hub = HUB;              // required.
var options = {
  'title': title, // optional
  'publishKey': 'publishKey', // optional
  'publishSecrity': 'dynamic' // optional
};

client.createStream(hub, options, function(err, stream) {
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
var streamId = 'streamId';  // required
client.getStream(streamId, function(err, stream) {
  // handle request
});


/**
 * Update a stream
 */
var streamId = 'streamId';  // required
var options = {
  'publishKey': 'publishKey', // optional
  'publishSecrity': 'dynamic' // optional
};
client.updateStream(streamId, options, function(err, stream) {
  // handle request
});

/**
 * List streams
 */
var hub = HUB;     // required.
var options = {
 marker: 'marker',  // optional
 limit: 1000  // optional
};
client.listStreams(hub, options, function(err, streams) {
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
var streamId = 'streamId';  // required
var options = {
  startTime: startTime, // optional
  endTime: endTime  // optional
}；

client.getStreamSegments(streamId, options, function(err, data) {
  // handle request
});

/**
 * Generate RTMP publish URL
 */
var publishUrl = stream.rtmpPublishUrl(RTMP_PUBLISH_HOST);

/**
 * Generate RTMP live play URL
 */
var options = {
  profile: '480p' // optional, such as '720p', '480p', '360p', '240p'. All profiles should be defined first.
};

var rtmpLiveUrl = stream.rtmpLiveUrl(RTMP_PLAY_HOST, options);

/**
 * Generate HLS live play URL
 */
var options = {
 profile: '480p' // optional, such as '720p', '480p', '360p', '240p'. All profiles should be defined first.
};

var hlsLiveUrl = stream.hlsLiveUrl(HLS_PLAY_HOST, options);

/**
 * Generate HLS playback URL
 */
var options = {
 profile: '480p' // optional, such as '720p', '480p', '360p', '240p'. All profiles should be defined first.
};

var hlsPlaybackUrl = stream.hlsPlaybackUrl(HLS_PLAY_HOST, startTime, endTime, profile);
