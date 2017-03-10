'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
// Replace with your keys here
var ACCESS_KEY  = 'QiniuAccessKey';
var SECRET_KEY  = 'QiniuSecretKey';
var credentials = new Pili.Credentials(ACCESS_KEY, SECRET_KEY);


// Replace with your hub name
var HUB = 'PiliHubName'; // The Hub must be exists before use

// Change API host as necessary
//
// pili.qiniuapi.com as default
// pili-lte.qiniuapi.com is the latest RC version
//
Pili.config.API_HOST = 'pili.qiniuapi.com'; // default

// ========================== Hub ============================


var streamKey = 'streamkey';

/**
 * URLs
 */

var pu = Pili.publishURL(credentials,'publish-rtmp.test.com', 'PiliSDKTest', 'streamkey', 60);
var rtmpURL = Pili.rtmpPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
var hdlURL = Pili.hdlPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
var hlsURL = Pili.hlsPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
var snapURL = Pili.snapshotPlayURL('live-rtmp.test.com', 'PiliSDKTest', 'streamkey');
console.log(pu, rtmpURL, hdlURL, hlsURL, snapURL);

/**
 * Instantiate a Pili hub object
 */

var hub = new Pili.Hub(credentials, HUB);

/**
 * Create a new Stream
 */

hub.createStream(streamKey, function(err, stream) {

  if (!err) {
      console.log(stream);
  } else {
    // Log error
    console.log(err, err.errorCode, err.httpCode);
  }
});

/**
 * List Streams
 */

var listOptions = {
	'liveonly': false,
	'prefix': 'lin',
	'limit': 2,
};

var listCallBack = function(err, marker, streams) {
	if (!err) {
		streams.forEach(function(stream) {
			console.log(stream);
		});
		if (marker) {
			listOptions.marker = marker;
			hub.listStreams(listOptions, listCallBack);
		}
	} else {
    console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
}

hub.listStreams(listOptions, listCallBack);


/**
 * Get Streams Live Info
 */
hub.batchLiveStreamsInfo([streamKey], function (err, items) {
    if (!err) {
        console.log('live streams: ');
        items.forEach(function(item) {
            console.log(item);
        });
    }
    else {
        console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
    }
});

/**
 * Get Stream Info
 */
var stream = hub.newStream(streamKey);

stream.loadInfo(function(err) {
	if (!err) {
		console.log(stream);
	} else {
    console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
})

// * Disable a Stream
// */
stream.disable(-1, function(err) {
    console.log(stream.disabledTill);
});


/**
 * Enable a Stream
 */
stream.enable(function(err) {
    console.log(stream.disabledTill);
});


/**
 * Get Stream Live Info
 */
stream.liveInfo(function(err, status) {
    if (!err) {
			console.log(status);
		} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
		}
});

/**
 * Get Stream segments
 */
var savePlaybackOptions = {
    fname: streamKey,   // optional, file name
    start : null,       // optional, in second, unix timestamp
    end   : null        // optional, in second, unix timestamp
};

stream.savePlayback(savePlaybackOptions, function(err, m3u8Name) {

    if (!err) {
			console.log(m3u8Name);
		} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
		}
});

/**
 * Get Stream snapshot
 */
var saveSnapshotOptions = {
    fname: streamKey    // optional, file name
};

stream.saveSnapshot(saveSnapshotOptions, function(err, snapshotName) {
    if (!err) {
        console.log(snapshotName);
    } else {
        console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
    }
});

/**
 * Update Stream Converts
 */
stream.updateConverts(['480p', '720p'], function (err) {
    if (!err) {
        console.log('update converts success');
    }
    else {
        console.log('update converts error: ' + err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
    }
})

/**
 *  Get Stream history activity
 */

var publishHistoryOptions = {
   start : null,    // optional, in second, unix timestamp
   end   : null,    // optional, in second, unix timestamp
};
stream.publishHistory(publishHistoryOptions, function(err, history) {
	if (!err) {
		console.log(history);
	} else {
			console.log(err + 'error code: ' + err.errorCode + 'http code: ' + err.httpCode);
	}
})
