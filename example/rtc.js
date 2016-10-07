'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
// Replace with your keys here
var ACCESS_KEY = 'ak';
var SECRET_KEY = 'sk';

// Replace with your hub name
var HUB = 'livelive'; // The Hub must be exists before use


/**
 * Instantiate a Pili rtc object
 */
var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);
var rtc = new Pili.RTC(credentials);

var roomName = 'roomName1';
var ownerID = 'ownerID';
rtc.createRoom(ownerID, roomName, {}, function(err, roomInfo) {
  if (!err) {
    console.log(roomInfo);
    rtc.getRoom(roomInfo.room_name, function(err, info) {
      if (!err) {
        console.log(info);
        rtc.deleteRoom(roomInfo.room_name, function(err) {
          if (!err) {
            console.log("delete ok");
          } else {
            console.log(err);
          }
        })
      } else {
        console.log(err);
      }
    })
  } else {
    console.log(err);
    rtc.deleteRoom(roomName, function(err) {});
  }
})

var roomToken = rtc.roomToken({
  "room_name": roomName,
  "user_id": ownerID,
  "perm": "user"
})
console.log(roomToken);