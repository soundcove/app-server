#!/usr/bin/env node
'use strict';

const http = require('http'),
      https = require('https'),
      lib = require('./lib'),
      path = require('path'),
      express = require('express'),
      args = lib.args(process.argv.slice(2)),

app = express();

const opts = global.opts = {
  views: path.resolve(args.views ? args.views : process.cwd() + '/views'),
  static: path.resolve(args.static ? args.static : process.cwd() + '/static'),
  age: args.age || '6h',
  http: typeof args.http === 'undefined' || args.http,
  https: args.https || false,
  host: args.host || '0.0.0.0',
  port: args.port || 80,
  sport: args.sport || 443
};

// Static files
app.use('/static', lib.static());

// App
app.get('*', lib.app);

// 404 for other requests
app.all('*', (x, r) => r.status(404).send({ 'error': 'not found' }));

// Deploy.
(function(listener, app, certs){
  if (opts.http)
  http.Server(app).listen(
    opts.port, opts.host,
    () => listener('http')
  );

  if (opts.https)
  https.Server(certs, app).listen(
    opts.sport, opts.host,
    () => listener('https')
  );

})(function(server){
  console.log(server + '://' + opts.host + ':' + opts.port + '/');
}, app, {
  // TODO: Get SSL certs.
});
