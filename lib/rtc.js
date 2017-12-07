'use strict';

const API = require('./api');

function RTC(credentials) {
    this.credentials = credentials;

    API.init();
}

RTC.prototype.createRoom = function(ownerID, roomName, options, fn) {

    return API.createRtcRoom(this.credentials, ownerID, roomName, options, fn);
}

RTC.prototype.getRoom = function(roomName, fn) {

    return API.getRtcRoom(this.credentials, roomName, fn);
}

RTC.prototype.deleteRoom = function(roomName, fn) {

    return API.deleteRtcRoom(this.credentials, roomName, fn);
}

RTC.prototype.getRoomMember = function (roomName, fn) {

    return API.getRoomMember(this.credentials, roomName, fn);
}

RTC.prototype.deleteRoomMember = function (roomName, userId, fn) {
    return API.deleteRoomMember(this.credentials, roomName, userId, fn);
}

RTC.prototype.roomToken = function(roomAccess) {

    /*
     roomAccess = {
     "room_name": "<RoomName>",
     "user_id": "<UserID>",
     "perm": "<Permission>",
     "expire_at": <ExpireAt>
     }
     */

    if (!roomAccess.expire_at) {
        roomAccess.expire_at = Math.floor(Date.now() / 1000) + 1800;
    }

    return this.credentials.signJson(roomAccess);
}

module.exports = exports = RTC;