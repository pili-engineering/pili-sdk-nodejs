var util = require('./util')
  , API = require('./api')
  , config = require('./config');

function Room(credentials, params) {
  this.credentials = credentials;

  this.name = params.room_name;
  this.status = params.room_status;    //0: NEW; 1: MEETING; 2: FINISHED
  this.ownerId = params.owner_id;
  this.publishKey = params.publishKey;
  this.publishSecurity = params.publishSecurity;
}

Room.prototype.createRoom = function(ownerId, roomName, fn){
    API.getRoom(this.credentials, ownerId, roomName, fn);
};

Room.prototype.getRoom = function(roomName){
    API.getRoom(this.credentials, roomName, fn);

Room.prototype.deleteRoom = function(room){
    API.deleteRoom(this.credentials,  roomName, fn);
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
    var encodedRoomAccess = util.base64ToUrlSafe(roomAccess);
    var digest = util.hmacSha1(encodedRoomAccess, this.publishSecurity); //this.secretKey
    var encodedSign = util.base64ToUrlSafe(digest);
    return this.publishKey + ":" + encodedSign + ":" + encodedRoomAccess; //accessKey
};
