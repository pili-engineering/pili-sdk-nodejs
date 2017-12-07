/**
 * Created by guhao on 2017/7/24.
 */
'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
// Replace with your keys here
var ACCESS_KEY = 'FMVCRs2-LO1ivRNi4l7mEZE6ZDvPv-519D12kZO';
var SECRET_KEY = 'InOXBls8alaPiRcFn002XsoXKFw1iFJZxcoOveY';

// Replace with your hub name
var HUB = 'qiniu-pili-test'; // The Hub must be exists before use


/**
 * Instantiate a Pili rtc object
 */
var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);
var rtc = new Pili.RTCV2(credentials);

var roomName = "room1";
var ownerID = 'ownerID';
rtc.createRoom(ownerID, roomName, {}, function(err, roomInfo) {
    if (!err) {
        console.log("success")
        console.log(roomInfo)
    } else {
        console.log("oops")
        console.log(err)
    }
})

rtc.getRoom(roomName, function(err, roomInfo) {
    if (!err) {
        console.log("success")
        console.log(roomInfo)
    } else {
        console.log("oops")
        console.log(err)
    }
})

rtc.deleteRoom(roomName, function(err) {
    if (!err) {
        console.log("success")
        console.log("delete OK")
    } else {
        console.log("oops")
        console.log(err)
    }
})


var roomToken = rtc.roomToken({
    "version": "2.0",
    "room_name": roomName,
    "user_id": ownerID,
    "perm": "user"
})
console.log(roomToken);