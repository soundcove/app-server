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

console.log(args);

// Static files
if (args.static) app.use('/static', serve(path.resolve(process.cwd(), args.static), args.serve));
if (args.styles) app.use('/styles', serve(path.resolve(process.cwd(), args.styles), args.serve));
if (args.scripts) app.use('/scripts', serve(path.resolve(process.cwd(), args.scripts), args.serve));

// Bower
if (args.bower) app.use('/bower/:component/:file', (req, res) => {
  let u = req.params;
  res.sendFile(path.resolve(args.bower, u.component, 'dist', u.file), () => {
    res.sendStatus(404);
  });
});

// App
if (args.app) app.get('*', (req, res) => {
  res.sendFile(path.resolve(args.app), () => {
    res.sendStatus(500);
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
