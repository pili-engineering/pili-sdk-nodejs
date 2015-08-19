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

- [Installation](#installation)
- [Usage](#usage)
	- [Configuration](#configuration)
	- [Client](#client)
		- [Create a Pili client](#create-a-pili-client)
		- [Create a stream](#create-a-stream)
		- [Get a stream](#get-a-stream)
		- [List streams](#list-streams)
	- [Stream](#stream)
    - [Update a stream](#update-a-stream)
		- [Enable a stream](#enable-a-stream)
		- [Disable a stream](#disable-a-stream)
		- [Delete a stream](#delete-a-stream)
		- [Get stream segments](#get-stream-segments)
		- [Get stream status](#get-stream-status)
		- [Generate RTMP publish URL](#generate-rtmp-publish-url)
		- [Generate RTMP live play URL](#generate-rtmp-live-play-url)
		- [Generate HLS live play URL](#generate-hls-live-play-url)
		- [Generate HLS playback URL](#generate-hls-playback-url)
		- [To JSON String](#to-json-string)
		- [Save Stream as](#save-stream-as)
		- [Snapshot stream](#snapshot-stream)
- [History](#history)

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
    //        "live": {
    //            "rtmp": "HLS_LIVE_HOST",
    //            "http": "RTMP_LIVE_HOST"
    //        },
	//				"playback": {
	//						"http": "PLAYBACK_HOST"
	//				}
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
 limit  : 1000,     // optional
 title	: 'title'		// optional
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

#### Enable a stream

```javascript
stream.enable(function(err, stream) {
	// handle request
});
```

#### Disable a stream

```javascript
stream.disable(function(err, stream) {
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
  endTime   : endTime,      // optional, in second, unix timestamp
	limit		  : limit					// optional
};

stream.segments(options, function(err, segmentssegments) {
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
    //     "status": "disconnected",
	//		 "bytesPerSecond": 1024,
	//		 "framesPerSecond": {
	//		 		"audio": 1111,
	//				"video": 1111,
	//				"data": 1111
	//		 }
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

// Get original RTMP live url
var originalUrl = urls['ORIGIN'];
```

#### Generate HLS live play URLs

```javascript
var urls = stream.hlsLiveUrls();
Object.keys(urls).forEach(function(key) {
    var val = urls[key];
    console.log(key + ': ' + val);
});

// Get original HLS live url
var originalUrl = urls['ORIGIN'];
```

#### Generate HLS playback URLs

```javascript
var urls = stream.hlsPlaybackUrls(startTime, endTime);
Object.keys(urls).forEach(function(key) {
    var val = urls[key];
    console.log(key + ': ' + val);
});

// Get original HLS playback url
var originalUrl = urls['ORIGIN'];
```

#### To JSON String

```javascript
var jsonString = stream.toJSONString();
console.log(jsonString);
```

#### Save Stream as

```javascript
var fileName;
var format;
var start, end;

var options = {
	notifyUrl : 'http://your_notify_url',
};

stream.saveAs(fileName, format, start, end, options, function(err, responseData) {
	// Log responseData
	// {
	//     "url": "<m3u8Url>",
	//     "targetUrl": "<TargetFileUrl>",
	//     "persistentId": <PersistentId>
	// }
	//
	// You can get saving state via Qiniu fop service using persistentId.
	// API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
	// Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`
	console.log(responseData);
});
```

#### Snapshot stream

```javascript
var imageName;
var format;

var options = {
	time 			: snapAtUnixTimestamp,	// default as now, in second
	notifyUrl : 'http://your_notify_url'
};

stream.snapshot(imageName, format, options, function(err, responseData) {
	// Log responseData
	// {
	// 	"targetUrl": "<TargetUrl>",
	// 	"persistentId": "<PersistentId>"
	// }
	//
	// You can get saving state via Qiniu fop service using persistentId.
	// API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
	// Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`
	console.log(responseData);
});
```

## History

- 1.4.0
	- Update stream struct
	- Add stream snapshot function
	- Add stream enable function
	- Add stream disable function
	- Update stream status struct
	- Update stream toJSONString function
	- Update client listStreams params, add title
	- Update stream segments params, add limit
- 1.2.1
	- Add stream saveas function
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
