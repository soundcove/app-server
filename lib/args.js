'use strict';

module.exports = function(rawargs){
  let args = {};
  if (rawargs) {
    let matcher = /^\-\-([A-z0-9\-]+)=(?:"?(.+?)"?|'?(.+?)'?|(.+))$/,
        meta = [], name = '', rawdata = '', newdata = '',
        numberTest = /^[0-9.]+$/, booleanTest = /true|false/;

    rawargs.forEach((flag) => {
      meta = flag.match(matcher);
      if (meta) {
        name = meta[1];
        rawdata = meta[2];

        if (numberTest.test(rawdata)) newdata = parseInt(rawdata);
        else if (booleanTest.test(rawdata)) newdata = JSON.parse(rawdata);
        else newdata = rawdata;

        args[name] = newdata;
      }
    });
  }

  return args;
};
