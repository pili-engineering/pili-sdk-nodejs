var util = require('./util')
    , API = require('./api')
    , config = require('./config');

function Room(credentials, params) {
    this.credentials = credentials;

    this.name = params.room_name;
    this.status = params.room_status;    //0: NEW; 1: MEETING; 2: FINISHED
    this.ownerId = params.owner_id;
    this.publishKey = credentials.accessKey;
    this.publishSecurity = credentials.secretKey;
}

Room.prototype.createRoom = function(ownerId, roomName, userMax, fn){
    API.createRoom(this.credentials, ownerId, roomName, userMax, fn);
};

Room.prototype.getRoom = function(roomName,fn) {
    API.getRoom(this.credentials, roomName, fn);
};

Room.prototype.deleteRoom = function (roomName,fn) {
    API.deleteRoom(this.credentials, roomName, fn);
};

/**
 * 计算room token
 * @param roomName
 * @param userId
 * @param perm    'admin' or  'user'
 * @param expireAt
 * @returns {string}
 * @private
 */
Room.prototype._token = function(roomName, userId, perm, expireAt){
    var roomAccess = JSON.stringify({"room_name": roomName,"user_id": userId,
        "perm": perm, "expire_at": expireAt});
    var encodedRoomAccess = util.urlsafeBase64Encode(roomAccess);
    var digest = util.hmacSha1(encodedRoomAccess, this.publishSecurity); //this.secretKey
    var encodedSign = util.urlsafeBase64Encode(digest);
    return this.publishKey + ":" + encodedSign + ":" + encodedRoomAccess; //accessKey
};
module.exports = exports = Room;