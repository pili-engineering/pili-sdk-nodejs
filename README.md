# Pili server-side library for NodeJS

## Features

- [x] Stream operations (Create, Delete, Update, Get)
- [x] Get Streams list
- [x] Get Stream status
- [x] Get Stream segments
- [x] Generate RTMP publish URL
- [x] Generate RTMP / HLS live play URL
- [x] Generate HLS playback URL

## Content

- [Installation](#Installation)
- [Usage](#Usage)
	- [Configuration](#Configuration)
	- [Client](#Client)
		- [Create a Pili client](#Create-a-Pili-client)
		- [Create a stream](#Create-a-stream)
		- [Get a stream](#Get-a-stream)
		- [List streams](#List-streams)
	- [Stream](#Stream)
    	- [Update a stream](#Update-a-stream)
		- [Delete a stream](#Delete-a-stream)
		- [Get stream segments](#Get-stream-segments)
		- [Get stream status](#Get-stream-status)
		- [Generate RTMP publish URL](#Generate-RTMP-publish-URL)
		- [Generate RTMP live play URL](#Generate-RTMP-live-play-URL)
		- [Generate HLS live play URL](#Generate-HLS-live-play-URL)
		- [Generate HLS playback URL](#Generate-HLS-playback-URL)
		- [To JSON String](#To-JSON-String)
- [History](#History)

## Installaion

```
// install latest version
npm install pili --save
```

```
// install old version
npm install pili@1.07
```

## Usage

### Configuration

```javascript
var Pili = require('pili');

var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

var HUB = 'hubName';
```

### Client

#### Create a Pili client

```javascript
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY, HUB);
```

#### Create a stream

```javascript
var options = {
  title          : 'title',      // optional
  publishKey     : 'publishKey', // optional
  publishSecrity : 'dynamic'     // optional
};

client.createStream(options, function(err, stream) {
  if (!err) {
    // Log stream
    // {
    //    "id": "STREAM_ID",
    //    "createdAt": "CREATED_AT",
    //    "updatedAt": "UPDATED_AT",
    //    "title": "TITLE",
    //    "hub": "HUB_NAME",
    //    "publishKey": "PUBLISH_KEY",
    //    "publishSecurity": "dynamic", // or static
    //    "disabled": false,
    //    "profiles": null, // or ["480p", "720p"] ...
    //    "hosts": {
    //        "publish": {
    //            "rtmp": "RTMP_PUBLISH_HOST"
    //        },
    //        "play": {
    //            "hls": "HLS_PLAY_HOST",
    //            "rtmp": "RTMP_PLAY_HOST"
    //        }
    //    }
    // }
    console.log(stream);
  } else {
    // Log error
    console.log(err + 'error code: ' + err.errorCode + 'http code: ' err.httpCode);
  }
});
```

#### Get a stream

```javascript
var streamId = 'streamId';  // required
client.getStream(streamId, function(err, stream) {
  // handle request
});
```

#### List streams

```javascript
var options = {
 marker : 'marker', // optional
 limit  : 1000      // optional
};

client.listStreams(options, function(err, marker, streams) {
  streams.forEach(function(stream) {
    // do something with stream object
    console.log(stream);
  });
});
```

### Stream

#### Update a stream

```javascript
var options = {
  publishKey     : 'publishKey',  // optional
  publishSecrity : 'dynamic',     // optional
  disabled       : false          // optional
};

stream.update(options, function(err, stream) {
  // handle request
});
```

#### Delete a stream

```javascript
stream.delete(function(err) {
  // handle request
});
```

#### Get stream segments

```javascript
var options = {
  startTime : startTime,    // optional, in second, unix timestamp
  endTime   : endTime       // optional, in second, unix timestamp
}；

stream.segments(streamId, options, function(err, segmentssegments) {
  if (!err) {
    // Log stream segments
    // [
    //     {
    //         "start": <StartSecond>,
    //         "end": <EndSecond>
    //     },
    //     {
    //         "start": <StartSecond>,
    //         "end": <EndSecond>
    //     },
    //     ...
    // ]
    console.log(segments);
  }
});
```

#### Get stream status

```javascript
stream.status(function(err, data) {
  if (!err) {
    // Log stream status
    // {
    //     "addr": "106.187.43.211:51393",
    //     "status": "disconnected"
    // }
    console.log(data);
  }
});
```

#### Generate RTMP publish URL

```javascript
var publishUrl = stream.rtmpPublishUrl();
```

#### Generate RTMP live play URLs

```javascript
var urls = stream.rtmpLiveUrls();
Object.keys(urls).forEach(function(key) {
    var val = urls[key];
    console.log(key + ': ' + val);
});
```

#### Generate HLS live play URLs

```javascript
var urls = stream.hlsLiveUrls();
Object.keys(urls).forEach(function(key) {
    var val = urls[key];
    console.log(key + ': ' + val);
});
```

#### Generate HLS playback URLs

```javascript
var urls = stream.hlsPlaybackUrls(startTime, endTime);
Object.keys(urls).forEach(function(key) {
    var val = urls[key];
    console.log(key + ': ' + val);
});
```

#### To JSON String
```javascript
var jsonString = stream.toJSONString();
console.log(jsonString);
```

## History

- 1.2.0
    - Update Stream object
    - Add new Stream functions
    - Update Client functions
- 1.0.7
    - Fix import bug
- 1.0.6
    - Fix GET request query method
    - Add more defensive code to improve robustness
- 1.0.5
    - Fix dynamic RTMP publish URL nonce generate bug
- 1.0.4
	- Add server error handle
	- Fix merge bugs
- 1.0.2
	- Update client create function
	- Update optional params
	- Add ```disabled``` field in ```Stream```
	- Add ```getStreamStatus``` function in ```Client```
- 1.0.1
	- Update Stream publish and play url generate functions
- 1.0.0
	- Init sdk
	- Add Stream API
	- Add publish and play policy
