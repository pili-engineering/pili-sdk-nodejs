/**
 * Created by gugaobai on 2017/4/21.
 */
'use strict'

const util = require('./util')
const fmt = require('util');
const Requset = require('./request');

var request = new Requset(
    "rtc.qiniuapi.com",
    "v1");

function RTC(credentials) {
    this.credentials = credentials;
}

RTC.prototype.createRoom = function (ownerId, roomName, userMax, ret) {
    var path = fmt.format('/rooms');
    var data = {
        "owner_id": ownerId,
        "room_name": roomName,
        "user_max": userMax
    };

    request.post(this.credentials, path, data, ret);
}

RTC.prototype.getRoom = function (roomName, ret) {
    var path = fmt.format('/rooms/%s', roomName);
    request.get(this.credentials, path, null, ret);
}

RTC.prototype.deleteRoom = function (roomName, ret) {
    var path = fmt.format('/rooms/%s', roomName);
    request.delete(this.credentials, path, ret);
}

RTC.prototype.roomToken = function (roomAccess) {
    if (!roomAccess.expire_at) {
        roomAccess.expire_at = Math.floor(Date.now() / 1000) + 3600;
    }
    var str = JSON.stringify(roomAccess);
    var encodedStr = util.urlsafeBase64Encode(str);
    var sign = util.hmacSha1(encodedStr, this.credentials.secretKey);
    var encodedSign = util.base64ToUrlSafe(sign);
    var token = this.credentials.accessKey + ':' + encodedSign + ':' + encodedStr;
    return token;
}

module.exports = exports = RTC;