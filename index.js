#!/usr/bin/env node
'use strict';

const http = require('http'),
      https = require('https'),
      lib = require('./lib'),
      path = require('path'),
      swig = require('swig'),
      express = require('express'),
      args = lib.args(process.argv.slice(2)),

app = express();

const opts = global.opts = {
  views: path.resolve(args.views ? args.views : __dirname + '/views'),
  static: path.resolve(args.static ? args.static : __dirname + '/static'),
  maxAge: args.maxAge || '6h',
  http: typeof args.http === 'undefined' || args.http,
  https: typeof args.https === 'undefined' || args.https
};

// Templating engine
app
.engine('html', swig.renderFile)
.set('view engine', 'html')
.set('views', opts.views);

// Static files
app.use('/static', lib.static());

// App
app.get(['/'], lib.app);

// Redirect to main app for any other requests.
app.get('*', (x, r) => r.redirect('/'));

// 404 for other requests
app.all('*', (x, r) => r.status(404).send({ 'error': 'not found' }));

// Deploy.
(function(listener, app, certs){
  if (opts.http) http.Server(app).listen(80, () => listener('HTTP'));
  if (opts.https) https.Server(certs, app).listen(443, () => listener('HTTPS'));
})(function(server){
  console.log(server + ' server is online.');
}, app, {
  // TODO: Get SSL certs.
});
