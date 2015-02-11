var home = require('./home');
var viewdata = require('../viewdata');
//var explore = require('./explore');

exports = module.exports = function(app) {
  app.use(viewdata.root);
  app.use(home);
  //app.use(explore);
};
