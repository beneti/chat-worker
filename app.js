var amqp = require('amqp');

function consume() {

  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);

  var exchange = conn.exchange('');
  var queue = conn.queue('queue1', {}, function() {
    queue.subscribe(function(msg) {
      redis.lpush('chat', msg.body);
      console.log(msg.body);
    });
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url});
conn.on('ready', consume);
