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
		- [Create Play Policy](#Create-Play-Policy)
		- [Create Publish Policy](#Create-Publish-Policy)
- [History](#History)

## Installaion

```
npm install pili --save
```

## Usage

### Configuration

Edit configuration in ```/lib/conf.js``` file
```javascript
// Change the null values to your account values
var config = {
  API_HOST          : 'pili.qiniuapi.com',
  API_VERSION       : 'v1',
  RTMP_PUBULISH_HOST: null,
  RTMP_PLAY_HOST    : null,
  HLS_PLAY_HOST     : null,
  HUB               : null,
  CREDS             : {
    ACCESS_KEY  : null,
    SECRET_KEY  : null
  },
}
```

### Include Pili

```javascript
var Pili = require('../index.js')
  , config = Pili.config;
```

### Client

#### Create a Pili client

```javascript
var client = new Pili.Client(creds);
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

### Policy


#### Create a publish policy

```javascript
var publish = stream.publishPolicy();

// Publish policy operations
var pushUrl = publish.url();
```

#### Create a play policy

```javascript
var play = stream.playPolicy();

// Play policy operations
var preset = null;  // optional, just like '720p', '480p', '360p', '240p'. All presets should be defined first.

var rtmpLiveUrl = play.rtmpLiveUrl(preset);
var hlsLiveUrl = play.hlsLiveUrl(preset);
var hlsPlaybackUrl = play.hlsPlaybackUrl(startTime, endTime, preset);
```

## History

- 1.0.1
	- Add conf.js
	- Update Stream policy create functions
- 1.0.0
	- Init sdk
	- Add Stream API
	- Add publish and play policy