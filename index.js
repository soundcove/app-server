'use strict';

const http = require('http'),
      https = require('https'),
      lib = require('./lib'),
      path = require('path'),
      swig = require('swig'),
      express = require('express'),

app = express();

// Templating engine
app
.engine('html', swig.renderFile)
.set('view engine', 'html')
.set('views', path.join(__dirname, 'views'));

// Static files
app
.use('/static', express.static('/static', {dotfiles:'deny', maxAge:'6h'}));

// Routes
app
.get(['/', '/home', '/index'], lib.home)
.get(['/me', '/you'], lib.me)
.get(['/settings', '/account'], lib.settings)
.get('*', lib.groups);

// Deploy.
(function(listener, app, certs){
  http.Server(app).listen(80, () => listener('HTTP'));
  https.Server(certs, app).listen(443, () => listener('HTTPS'));
})(function(server){
  console.log(server + ' server is online.');
}, app, {
  // TODO: Get SSL certs.
});
