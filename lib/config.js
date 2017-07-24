'use strict';

var config = module.exports = {};

config.const = {
  ORIGIN: 'ORIGIN',
  SDK_VERSION: '1.5.0',
  SDK_USER_AGENT: 'pili-sdk-nodejs',
  DEFAULT_API_HOST: 'pili.qiniuapi.com',
  DEFAULT_API_VERSION: 'v2',
  DEFAULT_RTC_HOST: 'rtc.qiniuapi.com'
}

config.API_HOST = config.const.DEFAULT_API_HOST;
config.USE_HTTPS = false;