'use strict';

const API = require('./api');

function Stream(credentials, hub, key) {

  this.credentials = credentials;

  this.key = key;
  this.hub = hub;
}

/**
 * Stream operations
 */
Stream.prototype.loadInfo = function(fn) {

  var self = this;
  API.getStreamInfo(this.credentials, self.hub, self.key, function(err, rst) {
    if (err) {
      fn(err);
    } else {
      // self = this ?
      self.createdAt = rst.createdAt;
      self.updatedAt = rst.updatedAt;
      self.expireAt = rst.expireAt;
      self.disabledTill = rst.disabledTill;
      self.converts = rst.converts;
      fn(null);
    }
  });
}

Stream.prototype.liveInfo = function(fn) {

  API.streamLiveInfo(this.credentials, this.hub, this.key, function(err, jsonData) {
    fn(err, jsonData);
  });
}

Stream.prototype.disable = function(disabledTill, fn) {

  var self = this;
  API.disableStream(this.credentials, this.hub, this.key, disabledTill, function(err, jsonData) {
    if (!err) {
      self.disabledTill = disabledTill;
      fn(null);
    } else {
      fn(err)
    }
  });
}

Stream.prototype.enable = function(fn) {

  var self = this;
  API.disableStream(this.credentials, this.hub, this.key, 0, function(err, jsonData) {
    if (!err) {
      self.disabledTill = 0;
      fn(null);
    } else {
      fn(err)
    }
  });
}

/**
  将指定时间段的直播保存到存储空间
  options 可以带如下参数：
    fname: 保存到存储空间的文件名，可选，不指定系统会随机生成
    start: 整数，可选，Unix 时间戳，要保存的直播的起始时间，不指定或 0 值表示从第一次直播开始
    end: 整数，可选，Unix 时间戳，要保存的直播的结束时间，不指定或 0 值表示当前时间
    format: 保存的文件格式，可选，默认为m3u8，如果指定其他格式，则保存动作为异步模式
    pipeline: 异步模式时，dora的私有队列，可选，不指定则使用公共队列
    notify: 异步模式时，保存成功回调通知地址，可选，不指定则不通知
    expireDays: 更改ts文件的过期时间，可选，默认为永久保存 -1表示不更改ts文件的生命周期，正值表示修改ts文件的生命周期为expireDays
 */
Stream.prototype.savePlayback = function(options, fn) {
  API.savePlayback(this.credentials, this.hub, this.key, options, function(err, jsonData) {
    if (err) {
      fn(err, null);
    } else {
      fn(null, jsonData['fname']);
    }
  });
}

/**
  把指定时间点的直播截图保存到 bucket 里
  options 可以带如下参数：
    fname: 保存到存储空间的文件名，可选，不指定系统会随机生成
    time: 整数，可选，Unix 时间戳，要保存截图的时间点，不指定则为当前时间
    format: 保存的文件格式，可选，默认为jpg
 */
Stream.prototype.saveSnapshot = function(options, fn) {
    API.saveSnapshot(this.credentials, this.hub, this.key, options, function(err, jsonData) {
        if (err) {
            fn(err, null);
        } else {
            fn(null, jsonData['fname']);
        }
    });
}

/**
 修改转码配置
 推流开始时如果有转码配置会触发转码，推流过程中修改转码配置不会立即生效，需要重新推流。
 推流过程中，在直播地址后面添加 @<ProfileName> 即可播放转码流。
 例: 一路流的直播地址是 rtmp://live-rtmp.test.com/PiliSDKTest/streamtitle，<ProfileName> 是 720p，则对应转码流的直播地址是 rtmp://live-rtmp.test.com/PiliSDKTest/streamtitle@720p

 profiles 以数组的形式指定相应的配置即可，如：['480p', '720p']
 */
Stream.prototype.updateConverts = function(profiles, fn) {
    API.updateConverts(this.credentials, this.hub, this.key, profiles, function(err, jsonData) {
        if (err) {
            fn(err);
        } else {
            fn(null);
        }
    });
}

/**
 查询直播的历史时间记录
  options 可以带如下参数：
    start: 整数，可选，Unix 时间戳，起始时间，不指定或 0 表示不限制起始时间。
    end: 整数，可选，Unix 时间戳，结束时间，不指定或 0 值表示当前时间。
 */
Stream.prototype.publishHistory = function(options, fn) {
  API.publishHistory(this.credentials, this.hub, this.key, options, function(err, rst) {
    if (err) {
      fn(err, null);
    } else {
      fn(err, rst.items);
    }
  });
}

module.exports = exports = Stream;