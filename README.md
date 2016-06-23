<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Pili Streaming Cloud server-side library for NodeJS](#pili-streaming-cloud-server-side-library-for-nodejs)
  - [Features](#features)
  - [Installaion](#installaion)
  - [Usage](#usage)
    - [Configuration](#configuration)
    - [URL](#url)
      - [Generate RTMP publish URL](#generate-rtmp-publish-url)
      - [Generate RTMP play URL](#generate-rtmp-play-url)
      - [Generate HLS play URL](#generate-hls-play-url)
      - [Generate HDL play URL](#generate-hdl-play-url)
      - [Generate Snapshot play URL](#generate-snapshot-play-url)
    - [Hub](#hub)
      - [Instantiate a Pili Hub object](#instantiate-a-pili-hub-object)
      - [Create a new Stream](#create-a-new-stream)
      - [Get a Stream](#get-a-stream)
      - [LiveInfo](#liveinfo)
      - [List Stream](#list-stream)
    - [Stream](#stream)
      - [Disable a Stream](#disable-a-stream)
      - [Enable a Stream](#enable-a-stream)
      - [Get Stream live status](#get-stream-live-status)
      - [Get Stream history activity](#get-stream-history-activity)
      - [Save Stream live playback](#save-stream-live-playback)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Pili Streaming Cloud server-side library for NodeJS

## Features

- URL
	- [x] RTMP推流地址: RTMPPublishURL(domain, hub, streamKey, mac, expireAfterSeconds)
	- [x] RTMP直播地址: RTMPPlayURL(domain, hub, streamKey)
	- [x] HLS直播地址: HLSPlayURL(domain, hub, streamKey)
	- [x] HDL直播地址: HDLPlayURL(domain, hub, streamKey)
	- [x] 截图直播地址: SnapshotPlayURL(domain, hub, streamKey)
- Hub
	- [x] 创建流: hub.Create(streamKey)
	- [x] 获得流: hub.Stream(streamKey)
	- [x] 列出流: hub.List(prefix, limit, marker)
	- [x] 列出正在直播的流: hub.ListLive(prefix, limit, marker)
- Stream
	- [x] 流信息: stream.Info()
	- [x] 禁用流: stream.Disable()
	- [x] 启用流: stream.Enable()
 	- [x] 查询直播状态: stream.LiveStatus()
	- [x] 保存直播回放: stream.Save(start, end)
	- [x] 查询直播历史: stream.HistoryActivity(start, end)

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

var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);
```

### URL

#### Generate RTMP publish URL

```
var url = Pili.publishURL(credentials,'publish-rtmp.test.com', 'PiliSDKTest', 'streamkey', 60);
console.log(url);
// rtmp://publish-rtmp.test.com/PiliSDKTest/streamkey?e=1466652726&token=9roGzeeJkZh4y5gHpzT7Uv1CIw0KiVV8K4dfXRY0:bYZGIdK-tjjAfyIwbShQ5Bb1kBY=
```

#### Generate RTMP play URL

```
var url = Pili.rtmpPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
console.log(url);
// rtmp://live-rtmp.test.com/PiliSDKTest/streamkey
```

#### Generate HLS play URL

```
var url = Pili.hlsPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
console.log(url);
// http://live-rtmp.test.com/PiliSDKTest/streamkey.m3u8
```

#### Generate HDL play URL

```
var url = Pili.hdlPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
console.log(url);
// http://live-rtmp.test.com/PiliSDKTest/streamkey.flv
```

#### Generate Snapshot play URL

```
var url = Pili.snapshotPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
console.log(url);
// http://live-rtmp.test.com/PiliSDKTest/streamkey.jpg
```

### Hub

#### Instantiate a Pili Hub object

```javascript
var hub = new Pili.Hub(credentials, HUB);
```

#### Create a new Stream

```javascript
hub.createStream(streamKey, function(err, stream) {

  if (!err) {
      console.log(stream);
  } else {
    // Log error
    console.log(err, err.errorCode, err.httpCode);
  }
});
```

#### Get a Stream

```javascript
var stream = hub.newStream(streamKey);

stream.loadInfo(function(err) {
	if (!err) {
		console.log(stream);
	} else {
		console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
})
```

#### LiveInfo

```javascript
stream.liveInfo(function(err, status) {
    if (!err) {
			console.log(status);
		} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
		}
});
```

#### List Stream

```javascript
var listOptions = {
	'liveonly': false,
	'prefix': '',
	'limit': 2,
};

var listCallBack = function(err, marker, streams) {
	if (!err) {
		streams.forEach(function(stream) {
			console.log(stream);
		});
		if (marker) {
			listOptions.marker = marker;
			hub.listStreams(listOptions, listCallBack);
		}
	} else {
		 console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
}

hub.listStreams(listOptions, listCallBack);
```

### Stream

#### Disable a Stream

```
stream.disable(-1, function(err) {
    console.log(stream.disabledTill);
});
```

#### Enable a Stream

```
stream.enable(function(err) {
    console.log(stream.disabledTill);
});
```

#### Get Stream live status

```
stream.liveInfo(function(err, status) {
    if (!err) {
			console.log(status);
		} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
		}
});
```

#### Get Stream history activity

```
var publishHistoryOptions = {
   start : null,    // optional, in second, unix timestamp
   end   : null,    // optional, in second, unix timestamp
};
stream.publishHistory(publishHistoryOptions, function(err, history) {
	if (!err) {
		console.log(history);
	} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
})
```

#### Save Stream live playback

```
var savePlaybackOptions = {
   start : null,    // optional, in second, unix timestamp
   end   : null,    // optional, in second, unix timestamp
};

stream.savePlayback(savePlaybackOptions, function(err, m3u8Name) {

    if (!err) {
			console.log(m3u8Name);
		} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
		}
});
```
