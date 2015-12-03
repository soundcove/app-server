'use strict';

const serve = require('express').static;

module.exports = function(){
  return serve(opts.static, {
    dotfiles:'deny',
    maxAge: opts.maxAge
  });
};
