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
		- [To JSON String](#to-json-string)
		- [Update a Stream](#update-a-stream)
		- [Disable a stream](#disable-a-stream)
		- [Enable a stream](#enable-a-stream)
		- [Get stream status](#get-stream-status)
		- [Generate RTMP publish URL](#generate-rtmp-publish-url)
		- [Generate RTMP live play URLs](#generate-rtmp-live-play-urls)
		- [Generate HLS live play URLs](#generate-hls-live-play-urls)
		- [Generate Http-Flv live play URLs](#generate-http-flv-live-play-urls)
		- [Get stream segments](#get-stream-segments)
		- [Generate HLS playback URLs](#generate-hls-playback-url)
		- [Snapshot stream](#snapshot-stream)
		- [Save Stream as](#save-stream-as)
		- [Delete a stream](#delete-a-stream)
- [History](#history)

## Installaion

```
// install latest version
npm install pili --save
```

## Usage

### Configuration

```javascript
var Pili = require('pili');

var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

var HUB = 'PiliHubName';

// Change API host if necessary
// Pili.config.API_HOST = 'pili-lte.qiniuapi.com';
```

### Client

#### Instantiate a Pili client

```javascript
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY, HUB);
```

#### Create a new Stream

```javascript
var options = {
  title          : null,    // optional
  publishKey     : null,    // optional
  publishSecrity : null     // optional
};

client.createStream(options, function(err, stream) {
  if (!err) {
      console.log(stream);
    // Log stream
    // {
    //     "id":"z1.coding.35d7zfabe3bv5723280200c5",
    //     "createdAt":"2015-08-22T03:43:55.247Z",
    //     "updatedAt":"2015-08-22T03:43:55.247Z",
    //     "title":"35d7zfabe3bv5723280200c5",
    //     "hub":"coding",
    //     "publishKey":"f054e65199703b14",
    //     "publishSecurity":"dynamic",
    //     "disabled":false,
    //     "profiles":null,
    //     "hosts":
    //     {
    //         "publish":
    //         {
    //             "rtmp":"scv02k.pub.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.hls.z1.pili.qiniucdn.com"
    //         }
    //     }
    // }
  } else {
    // Log error
    console.log(err + 'error code: ' + err.errorCode + 'http code: ' err.httpCode);
  }
});
```

#### Get a Stream

```javascript
var streamId = 'id":"z1.coding.35d7zfabe3bv5723280200c5';  // required
client.getStream(streamId, function(err, stream) {
    if (!err) {
        console.log(stream);
        // Log stream
        // {
        //     "id":"z1.coding.35d7zfabe3bv5723280200c5",
        //     "createdAt":"2015-08-22T03:43:55.247Z",
        //     "updatedAt":"2015-08-22T03:43:55.247Z",
        //     "title":"35d7zfabe3bv5723280200c5",
        //     "hub":"coding",
        //     "publishKey":"f054e65199703b14",
        //     "publishSecurity":"dynamic",
        //     "disabled":false,
        //     "profiles":null,
        //     "hosts":
        //     {
        //         "publish":
        //         {
        //             "rtmp":"scv02k.pub.z1.pili.qiniup.com"
        //         },
        //         "live":
        //         {
        //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
        //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
        //         },
        //         "playback":
        //         {
        //             "http":"scv02k.hls.z1.pili.qiniucdn.com"
        //         }
        //     }
        // }
    }
});
```

#### List streams

```javascript
var options = {
    marker : null,    // optional
    limit  : null,    // optional
    title  : null     // optional
};

client.listStreams(options, function(err, marker, streams) {
  streams.forEach(function(stream) {
    console.log(stream);
    // Log stream
    // {
    //     "id":"z1.coding.35d7zfabe3bv5723280200c5",
    //     "createdAt":"2015-08-22T03:43:55.247Z",
    //     "updatedAt":"2015-08-22T03:43:55.247Z",
    //     "title":"35d7zfabe3bv5723280200c5",
    //     "hub":"coding",
    //     "publishKey":"f054e65199703b14",
    //     "publishSecurity":"dynamic",
    //     "disabled":false,
    //     "profiles":null,
    //     "hosts":
    //     {
    //         "publish":
    //         {
    //             "rtmp":"scv02k.pub.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.hls.z1.pili.qiniucdn.com"
    //         }
    //     }
    // }
  });
});
```

### Stream

#### To JSON String

```javascript
var result = stream.toJSONString();
console.log(result);
// {"id":"z1.coding.55d7f30ce3ba5723280000c5","createdAt":"2015-08-22T03:57:00.064Z","updatedAt":"2015-08-22T03:57:00.064Z","title":"55d7f30ce3ba5723280000c5","hub":"coding","publishKey":"131be2572c682413","publishSecurity":"dynamic","disabled":false,"profiles":null,"hosts":{"publish":{"rtmp":"scv02k.pub.z1.pili.qiniup.com"},"live":{"http":"scv02k.live1-http.z1.pili.qiniucdn.com","rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"},"playback":{"http":"scv02k.hls.z1.pili.qiniucdn.com"}}}
```

#### Update a stream

```javascript
var options = {
  publishKey     : 'new_secret_words',  // optional
  publishSecrity : 'static',            // optional, can be "dynamic" or "static"
  disabled       : false                // optional, can be "true" of "false"
};

stream.update(options, function(err, stream) {
    console.log(stream);
    // Log stream
    // {
    //     "id":"z1.coding.35d7zfabe3bv5723280200c5",
    //     "createdAt":"2015-08-22T03:43:55.247Z",
    //     "updatedAt":"2015-08-22T03:43:55.247Z",
    //     "title":"35d7zfabe3bv5723280200c5",
    //     "hub":"coding",
    //     "publishKey":"new_secret_words",
    //     "publishSecurity":"static",
    //     "disabled":false,
    //     "profiles":null,
    //     "hosts":
    //     {
    //         "publish":
    //         {
    //             "rtmp":"scv02k.pub.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.hls.z1.pili.qiniucdn.com"
    //         }
    //     }
    // }
});
```

#### Disable a Stream

```javascript
stream.disable(function(err, stream) {
	console.log(stream.disabled);
	// true
});
```

#### Enable a Stream

```javascript
stream.enable(function(err, stream) {
	console.log(stream.disabled);
	// false
});
```

#### Get Stream status

```javascript
stream.status(function(err, status) {
    if (!err) {
        console.log(status);
        // Log stream status
        // {
        //     "addr": "222.73.202.226:2572",
        //     "status": "disconnected",
        //		 "bytesPerSecond": 16870,
        //		 "framesPerSecond": {
        //		 		"audio": 42,
        //				"video": 14,
        //				"data": 0
        //		 }
        // }
    }
});
```

#### Generate RTMP publish URL

```javascript
var publishUrl = stream.rtmpPublishUrl();
console.log(publishUrl);
// rtmp://scv02k.pub.z1.pili.qiniup.com/coding/55d7f934e3ba5723280000cb?key=new_secret_words
```

#### Generate RTMP live play URLs

```javascript
var urls = stream.rtmpLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'rtmp://scv02k.live1-rtmp.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb'
// }
```

#### Generate HLS live play URLs

```javascript
var urls = stream.hlsLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.m3u8'
// }
```

#### Generate Http-Flv live play URLs

```javascript
var urls = stream.httpFlvLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.flv'
// }
```

#### Get stream segments

```javascript
var options = {
   startTime : null,	// optional, in second, unix timestamp
   endTime   : null,	// optional, in second, unix timestamp
   limit	  : null	// optional
};

stream.segments(options, function(err, segments) {
   if (!err) {
	   console.log(segments);
	   // Log stream segments
	   // [
	   //     {
	   //         "start": 1440196065,
	   //         "end": 1440196124
	   //     },
	   //     {
	   //         "start": 1440198072,
	   //         "end": 1440198092
	   //     },
	   //     ...
	   // ]
   }
});
```

#### Generate HLS playback URLs

```javascript
var start = 1440196065;
var end = 1440196105;

var urls = stream.hlsPlaybackUrls(start, end);
console.log(urls);
// {
//     ORIGIN: 'http://scv02k.hls.z1.pili.qiniucdn.com/coding/55d7fa0ee3ba5723280000cc.m3u8?start=1440196065&end=1440196105'
// }
```

#### Snapshot Stream

```javascript
var name = 'imageName';	// required
var format = 'jpg';		// required

var options = {
	time		: 1440196100,	// optional, default as now, in second, unix timestamp
	notifyUrl	: null			// optional
};

stream.snapshot(name, format, options, function(err, responseData) {
	console.log(responseData);
	// Log responseData
	// {
	// 	"targetUrl": "http://scv02k.static1.z1.pili.qiniucdn.com/snapshots/z1.coding.55d7faf0e3ba5723280000cd/imageName",
	// 	"persistentId": "z1.55d7a6e77823de5a49a8899a"
	// }
});
```

You can get saving state via Qiniu fop service using persistentId.
API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`

#### Save Stream as a file

```javascript
var name = 'videoName';	// required
var format = 'mp4';		// required
var start = 1440196065;	// required, in second, unix timestamp
var end = 1440196105;	// required, in second, unix timestamp

var options = {
	notifyUrl : null	// optional
};

stream.saveAs(name, format, start, end, options, function(err, responseData) {
	console.log(responseData);
	// Log responseData
	// {
	//     "url": "http://scv02k.media1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName.m3u8",
	//     "targetUrl": "http://scv02k.vod1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName",
	//     "persistentId": "z1.55d7a6e77823de5a49a8899b"
	// }
});
```

You can get saving state via Qiniu fop service using persistentId.
API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`

#### Delete a stream

```javascript
client.deleteStream(streamId, function(err, data) {
    console.log(data);
    // null
});
```

## History

- 1.4.0
	- Update stream struct
	- Add stream snapshot function
	- Add stream enable function
	- Add stream disable function
	- Add stream generate Http-Flv live URLs functions
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
