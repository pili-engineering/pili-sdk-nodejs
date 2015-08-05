'use strict';

var Pili = require('../index.js');

// ======================== Configurations =========================
var ACCESS_KEY = '9WYbJLbbeiOfO3ajB2xx02cshU5MJZ61SL72AN9m';
var SECRETE_KEY = 'FYwiyvlG7d5ge3XBO5LkPyM80wU9NNFThNJD8u-q';

var HUB = 'dayzhtest';

// ========================== Client ============================

/**
 * Create a Pili client
 */
var client = new Pili.Client(ACCESS_KEY, SECRETE_KEY, HUB);

/**
 * Create a new streamPublishKey
 */
var options = {
  title          : 'hello-pili',   // optional
  publishSecrity : 'dynamic'        // optional
};

client.createStream(options, function(err, stream) {
  // Log stream
  // {
  //    "id": "STREAM_ID",
  //    "createdAt": "CREATED_AT",
  //    "updatedAt": "UPDATED_AT",
  //    "title": "TITLE",
  //    "hub": "HUB_NAME",
  //    "publishKey": "PUBLISH_KEY",
  //    "publishSecurity": "dynamic", // or static
  //    "disabled": false,
  //    "profiles": null, // or ["480p", 720p] ...
  //    "hosts": {
  //        "publish": {
  //            "rtmp": "RTMP_PUBLISH_HOST"
  //        },
  //        "play": {
  //            "hls": "HLS_PLAY_HOST",
  //            "rtmp": "RTMP_PLAY_HOST"
  //        }
  //    }
  // }
  if (err) {
    console.log('Create Stream Error: ' + err + '.');
    return;
  }

  var options = {
    marker : '0',
    limit : 1000
  };
  client.listStreams(options, function(err, marker, streams) {
    if (err) {
      console.log('List Streams Error: ' + err);
      return;
    }
    console.log('List Streams');
    console.log('Marker: ' + marker);
    console.log(streams);

    streams.forEach(function(stream, index, array){
      console.log('Save ' + stream.id + ' begin');
      stream.saveAs(stream.title, 'mp4', 1429862565, 1437706807, null, function(err, responseData) {
        console.log(responseData);
        console.log('Save ' + stream.id + ' end');
      });
    });
  });

  console.log('Create Stream Success.');
  console.log(stream);

  client.getStream(stream.id, function(err, stream1) {
    if (err) {
      console.log('Get Stream Error: ' + err + '.');
      return;
    }

    console.log('Get Stream Success.');
    console.log(stream1.toJSONString());

    stream1.segments(null, function(err, segments) {
      if (err) {
        console.log('Get Stream Segments Error: ' + err);
        return;
      }
      console.log(segments);
    });
    stream1.status(function(err, status) {
      if (err) {
        console.log('Get Stream Status Error: ' + err + '.');
        return;
      }

      console.log('Get Stream Status Success.');
      console.log(status);

      var options = {
        publishKey: '123'
      };
      stream1.update(options, function(err, stream2) {
        if (err) {
          console.log('Update Stream Error: ' + err + '.');
          return;
        }

        console.log('Update Stream Success.');
        console.log(stream2);

        console.log(stream2.toJSONString());

        console.log('RTMP publish URL: ' + stream2.rtmpPublishUrl());

        console.log('RTMP live URLs:');
        var urls = stream2.rtmpLiveUrls();
        Object.keys(urls).forEach(function(key) {
          var val = urls[key];
          console.log(key + ': ' + val);
        });

        console.log('HLS live URLs:');
        urls = stream2.hlsLiveUrls();
        Object.keys(urls).forEach(function(key) {
          var val = urls[key];
          console.log(key + ': ' + val);
        });

        console.log('HLS playback URLs:');
        urls = stream2.hlsPlaybackUrls(0, 233);
        Object.keys(urls).forEach(function(key) {
          var val = urls[key];
          console.log(key + ': ' + val);
        });

        stream2.delete(function(err) {
          if (err) {
            console.log('Delete Stream Error: ' + err);
            return;
          }

          console.log('Delete Stream Success.');
        });
      });
    });
  });
});
