#!/usr/bin/env node
'use strict';

const http = require('http'),
      https = require('https'),
      cli = require('./cli'),
      path = require('path'),
      express = require('express'),
      yargs = require('yargs'),
      refig = require('refig'),

app = express();

// Arguments
let args = yargs
.help('help')
.usage('app [commands]')
.options(cli)
.argv;

let conf = refig
.set('async', false)
.read(path.resolve(args.config));

let opts = Object.assign(args, conf);

// Static files
if (opts.static) {
  if (typeof opts.static === 'string')
    opts.static = [{url: '/' + path.basename(opts.static), dir: opts.static}];
  else if (!Array.isArray(opts.static))
    opts.static = [{
      url: opts.static.url ? '/' + path.basename(opts.static.url) : '/static',
      dir: opts.static.dir ? opts.static.dir : 'static',
      options: opts.static
    }];
  else
    throw new Error('static must be a object or array of objects');

  opts.static.forEach(function(serve){
    if (typeof serve !== 'object')
      throw new Error('static must be a object or array of objects');

    console.log(opts);
    app.use(serve.url, express.static(path.resolve(serve.dir), serve.options));
  });
}

// Bower
if (opts.bower) app.use('/bower/:component/:file', (req, res) => {
  let u = req.params;
  res.sendFile(path.resolve(opts.bower, u.component, 'dist', u.file), (e) => {
    if (e) res.sendStatus(404);
  });
});

// App
if (opts.app) app.get('*', (req, res) => {
  res.sendFile(path.resolve(opts.app), (e) => {
    if (e) res.sendStatus(500);
  });
});

// 404 for other requests
app.all('*', (req, res) => {
  res.sendStatus(404);
});

// Deploy.
(function(listener, listenError, app, certs){
  if (opts.http) http.Server(app).listen(
    opts.port, opts.host,
    () => listener('http')
  ).on('error', listenError);

  if (opts.https) https.Server(certs, app).listen(
    opts.sport, opts.host,
    () => listener('https')
  ).on('error', listenError);

})(function(server){
  console.log(server + '://' + opts.host + ':' + opts.port + '/');
}, function(e){
  if (e.code === 'EADDRINUSE') console.log('That port ('+e.port+') is in use.');
  else if (e.code === 'EACCES') console.log('You need to run as root (sudo).');
  else throw e;
}, app, {
  // TODO: Get SSL certs.
});
