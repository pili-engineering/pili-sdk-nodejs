'use strict';

var Pili = require('../index.js');

var HUB = 'dayzhtest';

var options = {
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY'
};

var client = new Pili(options);

client.listStreams(HUB, null, null, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
    var streams = data.items;
    client.getStreamSegments(streams[0].id, 1429862565, 1430369553, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    });
  }
});

var stream = undefined;
client.createStream(null, HUB, null, null, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Stream Created.');
    stream = data;

    client.getStream(stream.id, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('Stream Got.');
        client.deleteStream(stream.id, function(err, data) {
          if (err) {
            console.error(err);
          } else {
            console.log('Stream Deleted.');
          }
        });
      }
    })
  }
});
