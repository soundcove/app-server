'use strict';

const fs = require('fs'),
      path = require('path'),

read = function(rawdir, lib){
  let dir = path.resolve(rawdir),
      items = fs.readdirSync(dir),
      info = {}, loc = '';

  items.forEach((item) => {
    if (item !== 'index.js') {
      info = path.parse(item);
      lib[info.name] = {};
      loc = path.join(dir, info.base);
      
      if (info.ext === '.js') lib[info.name] = require(loc);
      else if (info.ext === '') read(loc, lib[info.name]);
    }
  });

  return lib;
};

module.exports = read(__dirname, {});
