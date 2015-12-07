#!/usr/bin/env node
'use strict';

const http = require('http'),
      https = require('https'),
      cli = require('./cli'),
      path = require('path'),
      express = require('express'),
      serve = express.static,
      yargs = require('yargs'),

app = express();

// Arguments
let args = yargs
.help('help')
.usage('app [commands]')
.options(cli)
.config('config')
.argv;

let defaults = {
  url: '/static',
  dir: 'static',
  options: {
    maxAge: '6h',
    index: [ 'index.html' ],
    dotfiles: 'deny',
    extensions: [ 'html', 'htm', 'php', 'css', 'js', 'png', 'jpg' ]
  }
};

// Static files
if (args.static) {
  if (typeof args.static === 'string')
    args.static = [{url: '/' + args.static, dir: args.static}];
  else if (!Array.isArray(args.static)) args.static = [args.static];
  else
    throw new Error('static must be a object or array of objects');

  console.log(args);

  args.static.forEach(function(serve){
    if (typeof serve !== 'object')
      throw new Error('static must be a object or array of objects');

    serve = Object.assign(serve, defaults);
    app.use(serve.url, express.static(path.resolve(serve.dir), serve.options));
  });
}

// Bower
if (args.bower) app.use('/bower/:component/:file', (req, res) => {
  let u = req.params;
  res.sendFile(path.resolve(args.bower, u.component, 'dist', u.file), (e) => {
    if (e) res.sendStatus(404);
  });
});

// App
if (args.app) app.get('*', (req, res) => {
  res.sendFile(path.resolve(args.app), (e) => {
    if (e) res.sendStatus(500);
  });
});

// 404 for other requests
app.all('*', (req, res) => {
  res.sendStatus(404);
});

// Deploy.
(function(listener, listenError, app, certs){
  if (args.http) http.Server(app).listen(
    args.port, args.host,
    () => listener('http')
  ).on('error', listenError);

  if (args.https) https.Server(certs, app).listen(
    args.sport, args.host,
    () => listener('https')
  ).on('error', listenError);

})(function(server){
  console.log(server + '://' + args.host + ':' + args.port + '/');
}, function(e){
  if (e.code === 'EADDRINUSE') console.log('That port ('+e.port+') is in use.');
  else if (e.code === 'EACCES') console.log('You need to run as root (sudo).');
  else throw e;
}, app, {
  // TODO: Get SSL certs.
});
