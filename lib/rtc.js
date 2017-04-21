/**
 * Created by gugaobai on 2017/4/21.
 */
'use strict'

const Credentials = require('./credentials');
const util = require('./util')
const fmt = require('util');
const Requset = require('./request');

var request = new Requset({
    host: "rtc.qiniuapi.com",
    apiVersion: "v1"
});

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
    request.post(this.credentials, ownerId, roomName, userMax, ret);
}


module.exports = exports = RTC;