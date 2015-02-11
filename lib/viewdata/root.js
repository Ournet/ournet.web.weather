var _package = require('../../package.json');

module.exports = function(req, res, next) {
  res.locals.bodyCssClass = '';
  res.locals.currentCulture = {
    language: 'en'
  };
  res.locals.site = {
    title: 'TICSTA'
  }
  res.locals.version = _package.version;
  next();
};