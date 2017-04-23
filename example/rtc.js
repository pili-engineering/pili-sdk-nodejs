'use strict'

var Pili = require('../index');

var ACCESS_KEY = 'DWQOcImtTCrnPp1ogwgAHBdIK1mIFrnmtnXb-66-';
var SECRET_KEY = 'cJFhYuaq7Vo35e1XDFUG8Rm8C2VjkpmXO0aGkJGM';

var roomName = 'test1';
var ownerId = 'idfive';
var userMax = 6;

var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);
var rtc = new Pili.RTC(credentials);

rtc.createRoom(ownerId, roomName, userMax, function(err, roomInfo) {
    if (!err) {
        console.log(roomInfo);
    } else {
        console.log(err)
    }
});

rtc.getRoom(roomName, function(err, roomInfo) {
    if (!err) {
        console.log(roomInfo);
    } else {
        console.log(err)
    }
});

rtc.deleteRoom(roomName, function(err, roomInfo) {
    if (!err) {
        console.log(roomInfo);
    } else {
        console.log(err)
    }
});

var roomAccess = {
    "room_name" : "123",
    "user_id" : "456",
    "perm" : "admin",
    "expire_at" : 3600
}

var roomToken = rtc.roomToken(roomAccess);

console.log('roomToken:',roomToken)