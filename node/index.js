var express = require('express'),
    http = require('http'),
    redis = require('redis'),
    process = require('process'),
    sentinel = require('redis-sentinel');

var app = express();

console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

var endpoints = [
    {host:'redis-sentinel1',port:16382},
    {host:'redis-sentinel2',port:16382},
    {host:'redis-sentinel3',port:16382}
]
var opts = {};

var masterName = 'mymaster';

var client = sentinel.createClient(endpoints, masterName, opts);

// var client = redis.createClient('6379', 'redis');


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    res.send('This page has been viewed ' + counter + ' times!'+'process id > '+process.pid);
  });
});

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});
