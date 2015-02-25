var _package = require('../../package.json'),
  i18n = require('i18n'),
  config = require('../config'),
  core = require('ournet.core'),
  utils = require('../utils.js'),
  util = {
    moment: require('moment'),
    format: require('util').format,
    startWithUpperCase: core.util.startWithUpperCase
  };

module.exports = function(req, res, next) {
  var culture = res.locals.currentCulture = {
    language: i18n.getLocale(),
    country: config.country
  };
  culture.languageName = res.locals.__('language_' + culture.language);
  culture.countryName = res.locals.__('country_' + culture.country);

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

  //res.locals.noGoogleAds = true;

  res.locals.util = util;

  res.locals.topBarMenu = [];
  res.locals.showTopPageBar = true;

  for (var project in config.projects) {
    var host = config.projects[project];
    var item = {
      id: project,
      text: i18n.__(project),
      href: 'http://' + host + req.app.locals.links.home({
        ul: culture.language
      })
    };
    if (host == config.host)
      item.cssClass = 'active';
    res.locals.topBarMenu.push(item);
  }

  utils.maxage(res, 60 * 1);

  next();
};
