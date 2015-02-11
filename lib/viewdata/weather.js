var core = require('ournet.core'),
  md5 = core.util.md5,
  Promise = core.Promise;

module.exports = function(req, res, next) {
  next();
};
