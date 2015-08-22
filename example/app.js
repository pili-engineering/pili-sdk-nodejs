'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
// Replace with your keys here
var ACCESS_KEY = 'QiniuAccessKey';
var SECRETE_KEY = 'QiniuSecretKey';

// Replace with your hub name
var HUB = 'PiliHubName';

// Change API host if necessary
Pili.config.API_HOST = 'pili-lte.qiniuapi.com';

// ========================== Client ============================

/**
 * Instantiate a Pili client
 */
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY, HUB);

/**
 * Create a new Stream
 */
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

/**
 * Get a Stream
 */
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

/**
 * List streams
 */
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

// ========================== Stream ============================

/**
 * To JSON String
 */
var result = stream.toJSONString();
console.log(result);
// {"id":"z1.coding.55d7f30ce3ba5723280000c5","createdAt":"2015-08-22T03:57:00.064Z","updatedAt":"2015-08-22T03:57:00.064Z","title":"55d7f30ce3ba5723280000c5","hub":"coding","publishKey":"131be2572c682413","publishSecurity":"dynamic","disabled":false,"profiles":null,"hosts":{"publish":{"rtmp":"scv02k.pub.z1.pili.qiniup.com"},"live":{"http":"scv02k.live1-http.z1.pili.qiniucdn.com","rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"},"playback":{"http":"scv02k.hls.z1.pili.qiniucdn.com"}}}

/**
 * Update a Stream
 */
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

/**
 * Disable a Stream
 */
stream.disable(function(err, stream) {
	console.log(stream.disabled);
	// true
});

/**
 * Enable a Stream
 */
stream.enable(function(err, stream) {
	console.log(stream.disabled);
	// false
});

/**
 * Get Stream status
 */
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

/**
 * Generate RTMP publish URL
 */
var publishUrl = stream.rtmpPublishUrl();
console.log(publishUrl);
// rtmp://scv02k.pub.z1.pili.qiniup.com/coding/55d7f934e3ba5723280000cb?key=new_secret_words

/**
 * Generate RTMP live play URLs
 */
var urls = stream.rtmpLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'rtmp://scv02k.live1-rtmp.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb'
// }

/**
 * Generate HLS live play URL
 */
var urls = stream.hlsLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.m3u8'
// }

/**
 * Generate Http-Flv live play URLs
 */
var urls = stream.httpFlvLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.flv'
// }

/**
 * Get Stream segments
 */
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

/**
 * Generate HLS playback URL
 */
var start = 1440196065;
var end = 1440196105;

var urls = stream.hlsPlaybackUrls(start, end);
console.log(urls);
// {
//     ORIGIN: 'http://scv02k.hls.z1.pili.qiniucdn.com/coding/55d7fa0ee3ba5723280000cc.m3u8?start=1440196065&end=1440196105'
// }

/**
 * Snapshot Stream
 */
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
	//
	// You can get saving state via Qiniu fop service using persistentId.
	// API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
	// Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`
});

/**
 * Save Stream as a file
 */
var name = 'videoName';	// required
var format = 'mp4';		// required
var start = 1440196065;	// required, in second, unix timestamp
var end = 1440196105;	// required, in second, unix timestamp

var options = {
	notifyUrl : null	// optional
};

stream.saveAs(name, format, start, end, options, function(err, responseData) {
	// Log responseData
	// {
	//     "url": "http://scv02k.media1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName.m3u8",
	//     "targetUrl": "http://scv02k.vod1.z1.pili.qiniucdn.com/recordings/z1.coding.55d7faf0e3ba5723280000cd/videoName",
	//     "persistentId": "z1.55d7a6e77823de5a49a8899b"
	// }
	//
	// You can get saving state via Qiniu fop service using persistentId.
	// API: `curl -D GET http://api.qiniu.com/status/get/prefop?id=<PersistentId>`
	// Doc reference: `http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status`
	console.log(responseData);
});

/**
 * Delete a stream
 */
client.deleteStream(streamId, function(err, data) {
    console.log(data);
    // null
});
