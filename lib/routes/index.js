var home = require('./home');
var place = require('./place');
var viewdata = require('../viewdata');

exports = module.exports = function(app) {
  app.use(require('./redirects.js'));
  app.use(viewdata.root);
  app.use(viewdata.weather);
  app.use(home);
  app.use(place);
};

function etag(req, res, next){
  next();
}