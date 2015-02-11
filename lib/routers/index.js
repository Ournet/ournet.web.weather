var home = require('./home');
//var explore = require('./explore');

exports = module.exports = function(app) {
  app.use(home);
  //app.use(explore);
};
