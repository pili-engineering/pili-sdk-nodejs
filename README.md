# Pili Streaming Cloud server-side library for NodeJS

## Features

- Stream Create, Get, List
    - [x] hub.createStream()
    - [x] hub.getStream()
    - [x] hub.listStreams()
- Stream operations else
    - [x] stream.toJSONString()
    - [x] stream.update()
    - [x] stream.disable()
    - [x] stream.enable()
    - [x] stream.status()
    - [x] stream.rtmpPublishUrl()
    - [x] stream.rtmpLiveUrls()
    - [x] stream.hlsLiveUrls()
    - [x] stream.httpFlvLiveUrls()
    - [x] stream.segments()
    - [x] stream.hlsPlaybackUrls()
    - [x] stream.saveAs()
    - [x] stream.snapshot()
    - [x] stream.delete()

## Content

- [Installation](#installation)
- [Usage](#usage)
	- [Configuration](#configuration)
	- [Hub](#hub)
		- [Instantiate a Pili Hub object](#instantiate-a-pili-hub-object)
		- [Create a Stream](#create-a-stream)
		- [Get a Stream](#get-a-stream)
		- [List Streams](#list-streams)
	- [Stream](#stream)
    - [Update a stream](#update-a-stream)
		- [To JSON String](#to-json-string)
		- [Update a Stream](#update-a-stream)
		- [Disable a Stream](#disable-a-stream)
		- [Enable a Stream](#enable-a-stream)
		- [Get Stream status](#get-stream-status)
		- [Generate RTMP publish URL](#generate-rtmp-publish-url)
		- [Generate RTMP live play URLs](#generate-rtmp-live-play-urls)
		- [Generate HLS live play URLs](#generate-hls-live-play-urls)
		- [Generate Http-Flv live play URLs](#generate-http-flv-live-play-urls)
		- [Get stream segments](#get-stream-segments)
		- [Generate HLS playback URLs](#generate-hls-playback-url)
		- [Save Stream as a file](#save-stream-as)
		- [Snapshot Stream](#snapshot-stream)
		- [Delete a Stream](#delete-a-stream)
- [History](#history)

## Installaion

```shell
// install latest version
npm install pili --save
```

## Usage

### Configuration

```javascript
var Pili = require('pili');

var ACCESS_KEY  = 'QiniuAccessKey';
var SECRET_KEY  = 'QiniuSecretKey';

var HUB = 'PiliHubName'; // The Hub must be exists before use

// Change API host as necessary
//
// pili.qiniuapi.com as default
// pili-lte.qiniuapi.com is the latest RC version
//
// Pili.config.API_HOST = 'pili.qiniuapi.com'; // default
```

### Hub

#### Instantiate a Pili Hub object

```javascript
var credentials = new Pili.Credentials(ACCESS_KEY, SECRETE_KEY);
var hub = new Pili.Hub(credentials, HUB);
```

#### Create a new Stream

```javascript
var options = {
  title          : null,    // optional, auto-generated as default
  publishKey     : null,    // optional, auto-generated as default
  publishSecrity : "static" // optional, can be "dynamic" or "static", "dynamic" as default
};

hub.createStream(options, function(err, stream) {
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
    //     "publishSecurity":"static",
    //     "disabled":false,
    //     "profiles":null,
    //     "hosts":
    //     {
    //         "publish":
    //         {
    //             "rtmp":"scv02k.publish.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.playback1.z1.pili.qiniucdn.com"
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
var streamId = 'z1.coding.35d7zfabe3bv5723280200c5';  // required
hub.getStream(streamId, function(err, stream) {
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
        //     "publishSecurity":"static",
        //     "disabled":false,
        //     "profiles":null,
        //     "hosts":
        //     {
        //         "publish":
        //         {
        //             "rtmp":"scv02k.publish.z1.pili.qiniup.com"
        //         },
        //         "live":
        //         {
        //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
        //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
        //         },
        //         "playback":
        //         {
        //             "http":"scv02k.playback1.z1.pili.qiniucdn.com"
        //         }
        //     }
        // }
    }
});
```

#### List Stream

```javascript
var options = {
    marker : null,    // optional
    limit  : null,    // optional
    title  : null     // optional
};

hub.listStreams(options, function(err, marker, streams) {
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
    //             "rtmp":"scv02k.publish.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.playback1.z1.pili.qiniucdn.com"
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
// {"id":"z1.coding.55d7f30ce3ba5723280000c5","createdAt":"2015-08-22T03:57:00.064Z","updatedAt":"2015-08-22T03:57:00.064Z","title":"55d7f30ce3ba5723280000c5","hub":"coding","publishKey":"131be2572c682413","publishSecurity":"dynamic","disabled":false,"profiles":null,"hosts":{"publish":{"rtmp":"scv02k.publish.z1.pili.qiniup.com"},"live":{"http":"scv02k.live1-http.z1.pili.qiniucdn.com","rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"},"playback":{"http":"scv02k.playback1.z1.pili.qiniucdn.com"}}}
```

#### Update a Stream

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
    //             "rtmp":"scv02k.publish.z1.pili.qiniup.com"
    //         },
    //         "live":
    //         {
    //             "http":"scv02k.live1-http.z1.pili.qiniucdn.com",
    //             "rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"
    //         },
    //         "playback":
    //         {
    //             "http":"scv02k.playback1.z1.pili.qiniucdn.com"
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
        //     "status": "connected",
        //		 "bytesPerSecond": 16870.200000000001,
        //		 "framesPerSecond": {
        //		 		"audio": 42.200000000000003,
        //				"video": 14.733333333333333,
        //				"data": 0.066666666666666666
        //		 }
        // }
    }
});
```

#### Generate RTMP publish URL

```javascript
var publishUrl = stream.rtmpPublishUrl();
console.log(publishUrl);
// rtmp://scv02k.publish.z1.pili.qiniup.com/coding/55d7f934e3ba5723280000cb?key=new_secret_words
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

#### Get Stream segments

```javascript
var options = {
   startTime : null,	// optional, in second, unix timestamp
   endTime   : null,	// optional, in second, unix timestamp
   limit     : null	// optional
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
var start = 1440196065; // required, in second, unix timestamp
var end   = 1440196105; // required, in second, unix timestamp

var urls = stream.hlsPlaybackUrls(start, end);
console.log(urls);
// {
//     ORIGIN: 'http://scv02k.playback1.z1.pili.qiniucdn.com/coding/55d7fa0ee3ba5723280000cc.m3u8?start=1440196065&end=1440196105'
// }
```

#### Save Stream as a file

```javascript
var name   = 'videoName.mp4';	// required
var format = 'mp4';		// required
var start  = 1440196065;	// required, in second, unix timestamp
var end    = 1440196105;	// required, in second, unix timestamp

var options = {
	notifyUrl : null	// optional
};

stream.saveAs(name, format, start, end, options, function(err, responseData) {
	console.log(responseData);
	// Log responseData
	// {
	//     "url": "http://scv02k.media1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName.m3u8",
	//     "targetUrl": "http://scv02k.vod1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName.mp4",
	//     "persistentId": "z1.55d7a6e77823de5a49a8899b"
	// }
});
```

While invoking `saveAs()` and `snapshot()`, you can get processing state via Qiniu FOP Service using `persistentId`.  
API: `curl -D GET http://api.qiniu.com/status/get/prefop?id={PersistentId}`  
Doc reference: <http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status>  

#### Snapshot Stream

```javascript
var name   = 'imageName.jpg';	// required
var format = 'jpg';		// required

var options = {
	time		: 1440196100,	// optional, default as now, in second, unix timestamp
	notifyUrl	: null		// optional
};

stream.snapshot(name, format, options, function(err, responseData) {
	console.log(responseData);
	// Log responseData
	// {
	// 	"targetUrl": "http://scv02k.static1.z1.pili.qiniucdn.com/snapshots/z1.coding.55d7faf0e3ba5723280000cd/imageName.jpg",
	// 	"persistentId": "z1.55d7a6e77823de5a49a8899a"
	// }
});
```

#### Delete a Stream

```javascript
hub.deleteStream(streamId, function(err, data) {
    console.log(data);
    // null
});
```

## History

- 1.5.2
   - Update `Stream`'s `hosts`
- 1.5.0
	- Rename `Client` to `Hub`
	- Add `Credentials`
- 1.4.0
	- Update stream struct
	- Add stream.snapshot()
	- Add stream.enable()
	- Add stream.disable()
	- Add stream.httpFlvLiveUrls()
	- Update stream.status()
	- Update stream.toJSONString()
	- Update stream.segments()
	- Update hub.listStreams()
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
