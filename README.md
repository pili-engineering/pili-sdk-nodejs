# Pili server-side library for NodeJS

## Content

- [Installation](#Installation)
- [Usage](#Usage)
	- [Client](#Client)
		- [Client Configuration](#Client-Configuration)
		- [Create a Pili client](#Create-a-Pili-client)
		- [Create a stream](#Create-a-stream)
		- [Get a stream](#Get-a-stream)
		- [Update a stream](#Update-a-stream)
		- [List streams](#List-streams)
		- [Delete a stream](#Delete-a-stream)
		- [Get stream segments](#Get-stream-segments)
	- [Stream](#Stream)
		- [Generate Play Policy](#Generate-Play-Policy)
		- [Generate Publish Policy](#Generate-Publish-Policy)
	- [Policy](#Policy)
		- [Policy Configurations](#Policy-Configurations)
- [History](#History)

## Installaion

```
npm install pili --save
```

## Usage

### Client

#### Client Configuration

```javascript
var Pili = require('pili');

var creds = {
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY'
};

var HUB = 'HUB_NAME';
```

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
  // handle request
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
  // handle request
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

#### Generate Play Policy

```javascript
var rtmpPlayHost = 'xxx.live1.z1.pili.qiniucdn.com';
var hlsPlayHost = 'xxx.hls1.z1.pili.qiniucdn.com';
var play = stream.generatePlayPolicy(rtmpPlayHost, hlsPlayHost);
```

#### Generate Publish Policy

```javascript
var rtmpPublishHost = 'xxx.pub.z1.pili.qiniup.com';
var play = stream.generatePublishPolicy(rtmpPublishHost);
```

### Policy

#### Policy Configurations

```
// Replace with your customized domains
var publishParams = {
  rtmpPublishHost:       'xxx.pub.z1.pili.qiniup.com',
  streamPublishKey:      'STREAM_PUBLISH_KEY',
  streamPublishSecurity: 'dynamic' // 'static' or 'dynamic'
};

// Replace with your customized domains
var playParams = {
  rtmpPlayHost: 'xxx.live1.z1.pili.qiniucdn.com',
  hlsPlayHost:  'xxx.hls1.z1.pili.qiniucdn.com'
};
```

#### Create a publish policy

```javascript
var publish = new Pili.PublishPolicy(publishParams);

// Publish policy operations
var pushUrl = publish.url();
```

#### Create a play policy

```javascript
var play = new Pili.PlayPolicy(playParams);

// Play policy operations
var preset = null;  // optional, just like '720p', '480p', '360p', '240p'. All presets should be defined first.

var rtmpLiveUrl = play.rtmpLiveUrl(preset);
var hlsLiveUrl = play.hlsLiveUrl(preset);
var hlsPlaybackUrl = play.hlsPlaybackUrl(startTime, endTime, preset);
```

## History

- 1.0.0
	- Init sdk
	- Add Stream API
	- Add publish and play policy