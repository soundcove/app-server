var test = require('tape');
var path = require('path');
var request = require('http').request;
var server = require('..');

var getData = function getData(url, cb) {
  request('http://localhost:8989/' + url, function(res) {
    res.on('data', function(data) {
      cb(data.toString(), res.statusCode);
    });
  }).end();
};

// Create server
var app = server({
  html: path.resolve(__dirname, 'test.html'),
  js: path.resolve(__dirname, 'test.js'),
  css: path.resolve(__dirname, 'test.css'),
  404: path.resolve(__dirname, '404.html'),
  favicon: path.resolve(__dirname, 'favicon.txt')
});

app.listen(8989);

app.on('resources ready', function() {
  test('404 error', function(t) {
    t.plan(2);
    getData('foobar', function(data, status) {
      t.is(data, '<p>404</p>\n', 'correct contents');
      t.is(status, 404, 'correct status');
      t.end();
    });
  });

  test('html resource', function(t) {
    t.plan(2);
    getData('test.html', function(data, status) {
      t.is(data, '<p>test</p>\n', 'correct contents');
      t.is(status, 200, 'correct status');
      t.end();
    });
  });

  test('css resource', function(t) {
    t.plan(2);
    getData('test.css', function(data, status) {
      t.is(data, '#test {width: 1px;}\n', 'correct contents');
      t.is(status, 200, 'correct status');
      t.end();
    });
  });

  test('js resource', function(t) {
    t.plan(2);
    getData('test.js', function(data, status) {
      t.is(data, '"test";\n', 'correct contents');
      t.is(status, 200, 'correct status');
      t.end();
    });
  });

  test('favicon resource', function(t) {
    t.plan(2);
    getData('favicon.ico', function(data, status) {
      t.is(data, 'Testing\n', 'correct contents');
      t.is(status, 200, 'correct status');
      t.end();
    });
  });

  test('close', function(t) {
    t.end();
    process.exit();
  });
});
