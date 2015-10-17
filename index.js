#!/usr/bin/env node
'use strict';

const http = require('http'),
      https = require('https'),
      lib = require('./lib'),
      path = require('path'),
      swig = require('swig'),
      express = require('express'),
      rawargs = process.argv.slice(2),
      args = lib.args(rawargs),

app = express();

// Templating engine
app
.engine('html', swig.renderFile)
.set('view engine', 'html')
.set('views', args.views ? path.resolve(args.views) : path.join(__dirname, 'views'));

// Static files
app
.use('/static', args.static ? path.resolve(args.static) : express.static(path.join(__dirname, 'static'), {
  dotfiles:'deny',
  maxAge:args.maxAge || '6h'
}));

// Routes
app
.get(['/', '/home', '/index'], lib.home)
.get(['/me', '/you'], lib.me)
.get(['/settings', '/account'], lib.settings)
.get('*', lib.groups);

// Deploy.
(function(listener, app, certs){
  if (typeof args['http'] === 'undefined' || args['http']) {
    http.Server(app).listen(80, () => listener('HTTP'));
  }

  if (typeof args['https'] === 'undefined' || args['https']) {
    https.Server(certs, app).listen(443, () => listener('HTTPS'));
  }
})(function(server){
  console.log(server + ' server is online.');
}, app, {
  // TODO: Get SSL certs.
});
