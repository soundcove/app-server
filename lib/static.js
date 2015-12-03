'use strict';

const serve = require('express').static;

module.exports = serve(opts.static, {
  dotfiles:'deny',
  maxAge: opts.maxAge
});
