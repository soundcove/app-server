'use strict';

module.exports = function(req, res){
  res.render('home', {'foo': 'bar'});
};
