# PILI直播 NodeJs服务端SDK 使用指南

## 功能列表

- 直播流的创建、获取和列举
    - [x] hub.createStream()  // 创建流
    - [x] hub.getStream()  // 获取流
    - [x] hub.listStreams()  // 列举流
- 直播流的其他功能
    - [x] stream.toJsonString()  // 流信息转为json
    - [x] stream.update()      // 更新流
    - [x] stream.disable()      // 禁用流
    - [x] stream.enable()    // 启用流
    - [x] stream.status()     // 获取流状态
    - [x] stream.rtmpPublishUrl()   // 生成推流地址
    - [x] stream.rtmpLiveUrls()    // 生成rtmp播放地址
    - [x] stream.hlsLiveUrls()   // 生成hls播放地址
    - [x] stream.httpFlvLiveUrls()   // 生成flv播放地址
    - [x] stream.segments()      // 获取流片段
    - [x] stream.hlsPlaybackUrls()  // 生成hls回看地址
    - [x] stream.saveAs()        // 流另存为文件
    - [x] stream.snapshot()      // 获取快照
    - [x] stream.delete()    // 删除流


## 目录

- [安装](#installation)
- [用法](#usage)
    - [配置](#configuration)
    - [Hub](#hub)
        - [实例化hub对象](#instantiate-a-pili-hub-object)
        - [创建流](#create-a-new-stream)
        - [获取流](#get-an-exist-stream)
        - [列举流](#list-streams)
    - [直播流](#stream)
        - [流信息转为json](#to-json-string)
        - [更新流](#update-a-stream)
        - [禁用流](#disable-a-stream)
        - [启用流](#enable-a-stream)
        - [获取流状态](#get-stream-status)
        - [生成推流地址](#generate-rtmp-publish-url)
        - [生成rtmp播放地址](#generate-rtmp-live-play-urls)
        - [生成hls播放地址](#generate-hls-play-urls)
        - [生成flv播放地址](#generate-http-flv-live-play-urls)
        - [获取流片段](#get-stream-segments)
        - [生成hls回看地址](#generate-hls-playback-urls)
        - [流另存为文件](#save-stream-as-a-file)
        - [获取快照](#snapshot-stream)
        - [删除流](#delete-a-stream)
- [History](#history)


<a id="installation"></a>
## 安装

```shell
// 安装最新版本
npm install pili --save
```

<a id="usage"></a>
## 用法:

<a id="configuration"></a>
### 配置

```javascript
var Pili = require('pili');

var ACCESS_KEY  = 'QiniuAccessKey';
var SECRET_KEY  = 'QiniuSecretKey';

var HUB = 'PiliHubName'; // 使用前必须需要先要获得HUB

# 如有需要可以更改API host
# 
# 默认为 pili.qiniuapi.com
# pili-lte.qiniuapi.com 为最近更新版本
# 
# conf.API_HOST = 'pili.qiniuapi.com' # 默认
```

### Hub

<a id="instantiate-a-pili-hub-object"></a>
#### 实例化hub对象

```javascript
var credentials = new Pili.Credentials(ACCESS_KEY, SECRETE_KEY);
var hub = new Pili.Hub(credentials, HUB);
```

<a id="create-a-new-stream"></a>
#### 创建流

```javascript
var options = {
  title          : null,    // 选填，默认自动生成
  publishKey     : null,    // 选填，默认自动生成
  publishSecrity : "static" // 选填, 可以为 "dynamic" 或 "static", 默认为 "dynamic"
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


<a id="get-an-exist-stream"></a>
#### 获取流

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

<a id="list-streams"></a>
#### 列举流

```javascript
var options = {
    marker : null,    // 选填
    limit  : null,    // 选填
    title  : null     // 选填
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

<a id="stream"></a>
### 直播流

<a id="to-json-string"></a>
#### 流信息转为json

```javascript
var result = stream.toJSONString();
console.log(result);
// {"id":"z1.coding.55d7f30ce3ba5723280000c5","createdAt":"2015-08-22T03:57:00.064Z","updatedAt":"2015-08-22T03:57:00.064Z","title":"55d7f30ce3ba5723280000c5","hub":"coding","publishKey":"131be2572c682413","publishSecurity":"dynamic","disabled":false,"profiles":null,"hosts":{"publish":{"rtmp":"scv02k.publish.z1.pili.qiniup.com"},"live":{"http":"scv02k.live1-http.z1.pili.qiniucdn.com","rtmp":"scv02k.live1-rtmp.z1.pili.qiniucdn.com"},"playback":{"http":"scv02k.playback1.z1.pili.qiniucdn.com"}}}
```

<a id="update-a-stream"></a>
#### 更新流

```javascript
var options = {
  publishKey     : 'new_secret_words',  // 选填
  publishSecrity : 'static',            // 选填, 可以为 "dynamic" 或 "static", 默认为 "dynamic"
  disabled       : false                // 选填, 可以为 true 或 false
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

<a id="disable-a-stream"></a>
#### 禁用流

```javascript
stream.disable(function(err, stream) {
	console.log(stream.disabled);
	// true
});
```

<a id="enable-a-stream"></a>
#### 启用流

```javascript
stream.enable(function(err, stream) {
	console.log(stream.disabled);
	// false
});
```

<a id="get-stream-status"></a>
#### 获取流状态

```javascript
stream.status(function(err, status) {
    if (!err) {
        console.log(status);
        // Log stream status
        // {
        //     "addr": "222.73.202.226:2572",
        //     "startFrom": "2015-09-10T05:58:10.289+08:00",
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

<a id="generate-rtmp-publish-url"></a>
#### 生成推流地址

```javascript
var publishUrl = stream.rtmpPublishUrl();
console.log(publishUrl);
// rtmp://scv02k.publish.z1.pili.qiniup.com/coding/55d7f934e3ba5723280000cb?key=new_secret_words
```

<a id="generate-rtmp-live-play-urls"></a>
#### 生成rtmp播放地址

```javascript
var urls = stream.rtmpLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'rtmp://scv02k.live1-rtmp.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb'
// }
```

<a id="generate-hls-play-urls"></a>
#### 生成hls播放地址

```javascript
var urls = stream.hlsLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.m3u8'
// }
```

<a id="generate-http-flv-live-play-urls"></a>
#### 生成flv播放地址

```javascript
var urls = stream.httpFlvLiveUrls();
console.log(urls);
// {
//     'ORIGIN': 'http://scv02k.live1-http.z1.pili.qiniucdn.com/coding/55d7f934e3ba5723280000cb.flv'
// }
```

<a id="get-stream-segments"></a>
#### 获取流片段

```javascript
var options = {
   startTime : null,	// 选填, 单位为秒, 为UNIX时间戳
   endTime   : null,	// 选填, 单位为秒, 为UNIX时间戳
   limit     : null	// 选填
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

<a id="generate-hls-playback-urls"></a>
#### 生成hls回看地址

```javascript
var start = 1440196065; // 必填, 单位为秒, 为UNIX时间戳
var end   = 1440196105; // 必填, 单位为秒, 为UNIX时间戳

var urls = stream.hlsPlaybackUrls(start, end);
console.log(urls);
// {
//     ORIGIN: 'http://scv02k.playback1.z1.pili.qiniucdn.com/coding/55d7fa0ee3ba5723280000cc.m3u8?start=1440196065&end=1440196105'
// }
```

<a id="save-stream-as-a-file"></a>
#### 流另存为文件

```javascript
var name   = 'videoName.mp4';	// 必填
var format = 'mp4';		// 必填
var start  = 1440196065;	// 必填, 单位为秒, 为UNIX时间戳
var end    = 1440196105;	// 必填, 单位为秒, 为UNIX时间戳

var options = {
	notifyUrl : null	// 选填
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

当使用 `saveAs()` 和 `snapshot()` 的时候, 由于是异步处理， 你可以在七牛的FOP接口上使用 `persistentId`来获取处理进度.参考如下：   
API: `curl -D GET http://api.qiniu.com/status/get/prefop?id={persistentId}`  
文档说明: <http://developer.qiniu.com/docs/v6/api/overview/fop/persistent-fop.html#pfop-status> 

<a id="snapshot-stream"></a>
#### 获取快照

```javascript
var name   = 'imageName.jpg';	// 必填
var format = 'jpg';		// 必填

var options = {
	time		: 1440196100,	// 选填, 单位为秒, 为UNIX时间戳
	notifyUrl	: null		// 选填
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

<a id="delete-a-stream"></a>
#### 删除流

```javascript
hub.deleteStream(streamId, function(err, data) {
    console.log(data);
    // null
});
```

## History

- 1.5.2
   - Update `Stream`'s `hosts`
   - Add `startFrom` in `Stream status`
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
