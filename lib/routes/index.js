var home = require('./home');
var place = require('./place');
var viewdata = require('../viewdata');

exports = module.exports = function(app) {
  app.use(viewdata.root);
  app.use(home);
  app.use(place);
};
