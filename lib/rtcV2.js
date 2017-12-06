'use strict';

const API = require('./api');

function RTCV2(credentials) {
    this.credentials = credentials;

    API.init();
}

RTCV2.prototype.createRoom = function(ownerID, roomName, options, fn) {

    return API.createRtcRoomV2(this.credentials, ownerID, roomName, options, fn);
}

RTCV2.prototype.getRoom = function(roomName, fn) {

    return API.getRtcRoomV2(this.credentials, roomName, fn);
}

RTCV2.prototype.deleteRoom = function(roomName, fn) {

    return API.deleteRtcRoomV2(this.credentials, roomName, fn);
}

RTCV2.prototype.roomToken = function(roomAccess) {

    /*
     roomAccess = {
     "version": "2.0"
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



module.exports = exports = RTCV2;