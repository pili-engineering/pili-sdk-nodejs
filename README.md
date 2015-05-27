# Pili server-side library for NodeJS

## Content

- [Installation](#Installation)
- [Usage](#Usage)
	- [Configuration](#Configuration)
	- [Client](#Client)
		- [Create a Pili client](#Create-a-Pili-client)
		- [Create a stream](#Create-a-stream)
		- [Get a stream](#Get-a-stream)
		- [Update a stream](#Update-a-stream)
		- [List streams](#List-streams)
		- [Delete a stream](#Delete-a-stream)
		- [Get stream segments](#Get-stream-segments)
	- [Stream](#Stream)
		- [Generate RTMP publish URL](#Generate-RTMP-publish-URL)
		- [Generate RTMP live play URL](#Generate-RTMP-live-play-URL)
		- [Generate HLS live play URL](#Generate-HLS-live-play-URL)
		- [Generate HLS playback URL](#Generate-HLS-playback-URL)
- [History](#History)

## Installaion

```
npm install pili --save
```

## Usage

### Configuration

```javascript
var Pili = require('pili');

var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

var HUB = 'hubName';

var RTMP_PUBLISH_HOST = "xxx.pub.z1.pili.qiniup.com";
var RTMP_PLAY_HOST    = "xxx.live1.z1.pili.qiniucdn.com";
var HLS_PLAY_HOST     = "xxx.hls1.z1.pili.qiniucdn.com";
```

### Client

#### Create a Pili client

```javascript
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY);
```

#### Create a stream

```javascript
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
```

#### Get a stream

```javascript
var streamId = null;
// Suppose you own a streamId.
client.getStream(streamId, function(err, stream) {
  // handle request
});
```

#### Update a stream

```javascript
client.updateStream(streamId, publishKey, publishSecurity, function(err, stream) {
  // handle request
});
```

#### List streams

```javascript
 var hub = HUB;     // required.
 var marker = null; // optional.
 var limit = 0;     // optional.
client.listStreams(hub, marker, limit, function(err, streams) {
  streams.forEach(function(stream) {
    // do something with stream object
    console.log(stream);
  });
});
```

#### Delete a stream

```javascript
client.deleteStream(streamId, function(err, data) {
  // handle request
});
```

#### Get stream segments

```javascript
var startTime = 0;  // optional.
var endTime = 0;    // optional.
client.getStreamSegments(streamId, startTime, endTime, function(err, data) {
  // handle request
});
```

### Stream

#### Generate RTMP publish URL

```javascript
var publishUrl = stream.rtmpPublishUrl(RTMP_PUBLISH_HOST);
```

#### Generate RTMP live play URL

```javascript
var profile = null;  // optional, just like '720p', '480p', '360p', '240p'. All profiles should be defined first.
 
var rtmpLiveUrl = stream.rtmpLiveUrl(RTMP_PLAY_HOST, profile);
```

#### Generate HLS live play URL

```javascript
var hlsLiveUrl = stream.hlsLiveUrl(HLS_PLAY_HOST, profile);
```

#### Generate HLS playback URL

```javascript
var hlsPlaybackUrl = stream.hlsPlaybackUrl(HLS_PLAY_HOST, startTime, endTime, profile);
```

## History

- 1.0.2
	- Update client create function
- 1.0.1
	- Update Stream publish and play url generate functions
- 1.0.0
	- Init sdk
	- Add Stream API
	- Add publish and play policy