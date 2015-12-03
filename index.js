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

let opts = {
  views: path.resolve(args.views ? args.views : __dirname + 'views'),
  static: path.resolve(args.static ? args.static : __dirname + 'static'),
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
app
.use('/static', express.static(opts.static, {
  dotfiles:'deny',
  maxAge: opts.maxAge
}));

// Routes
app
.get(['/', '/home', '/index'], lib.home)
.get(['/me', '/you'], lib.me)
.get(['/settings', '/account'], lib.settings)
.get('*', lib.groups);

// Deploy.
(function(listener, app, certs){
  if (opts.http) http.Server(app).listen(80, () => listener('HTTP'));
  if (opts.https) https.Server(certs, app).listen(443, () => listener('HTTPS'));
})(function(server){
  console.log(server + ' server is online.');
}, app, {
  // TODO: Get SSL certs.
});
