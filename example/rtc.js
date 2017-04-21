'use strict'

var Pili = require('../index');

var ACCESS_KEY = 'ak';
var SECRET_KEY = 'sk';

var HUB = '1212';

var roomName = 'test1';
var ownerId = 'idfive';
var userMax = '6';

var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);
var rtc = new Pili.RTC(credentials);

rtc.createRoom(ownerId, roomName, userMax, function(err, roomInfo) {

});

