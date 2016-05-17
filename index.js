var Server = require('http').Server;
var fs = require('fs');
var path = require('path');
var each = require('async-each');

var htmlHeader = {'Content-Type': 'text/html'};
var jsHeader = {'Content-Type': 'application/javascript'};
var cssHeader = {'Content-Type': 'text/css'};
var faviconHeader = {'Content-Type': 'image/png'};

var app = module.exports = function server(opts) {
  // Create configuration and server with input options and defaults.
  var config = Object.assign({}, app.defaults, opts);
  var server = config.server || new Server();

  // Resolve files.
  var html;
  var js;
  var css;
  var errors = {
    500: '<html><head><title>500</title></head><body>' +
           '<h1 style="text-align:center;">500<hr/>Internal Server Error</h1>' +
           '</body></html>',

    404: '<html><head><title>404</title></head><body>' +
           '<h1 style="text-align:center;">404<hr/>Resource Not Found</h1>' +
           '</body></html>'
  };
  each([
    path.resolve(config.html),
    path.resolve(config.js),
    path.resolve(config.css),
    path.resolve(config['404'])
  ], fs.readFile, function(err, files) {
    if (err) {
      throw err;
    }
    html = files[0];
    js = files[1];
    css = files[2];
    errors['404'] = files[3];
    server.emit('resources ready');
  });

  // Silently fail with favicon if invalid
  var favicon = new Buffer([]);
  fs.readFile(path.resolve(config.favicon), function(err, data) {
    if (err) {
      console.log(err);
    } else {
      favicon = data;
    }
  });

  var url = {
    html: '/' + path.basename(config.html),
    js: '/' + path.basename(config.js),
    css: '/' + path.basename(config.css)
  };
  server.on('request', function request(req, res) {
    if (!html || !css || !js) {
      res.writeHead(500, htmlHeader);
      res.write(errors['500']);
      return;
    }

    var current = req.url;
    if (current === '/' || current === url.html) {
      res.writeHead(200, htmlHeader);
      res.write(html);
    } else if (current === url.js) {
      res.writeHead(200, jsHeader);
      res.write(js);
    } else if (current === url.css) {
      res.writeHead(200, cssHeader);
      res.write(css);
    } else if (current === '/favicon.ico') {
      res.writeHead(200, faviconHeader);
      res.write(favicon);
    } else {
      res.writeHead(404, htmlHeader);
      res.write(errors['404']);
    }
  });

  return server;
};

app.defaults = {
  html: 'index.html',
  js: 'index.js',
  css: 'index.css',
  favicon: 'favicon.png',
  404: '404.html'
};
