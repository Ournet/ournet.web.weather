var _package = require('../../package.json'),
  i18n = require('i18n'),
  config = require('../config.js'),
  util = {};

module.exports = function(req, res, next) {
  var culture = res.locals.currentCulture = {
    language: i18n.getLocale(),
    country: config.country
  };
  culture.languageName = res.locals.__(culture.language);

  //console.log(culture.language);

  res.locals.site = {
    name: config.name,
    head: {}
  };

  res.locals.config = config;

  res.locals.project = {
    version: _package.version,
    name: 'weather',
    portalsAbroad: []
  };

  next();
};
