var _package = require('../../package.json'),
  i18n = require('i18n'),
  config = require('../config.js'),
  core = require('ournet.core'),
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

  res.locals.noGoogleAds = true;

  res.locals.util = util;

  res.locals.topBarMenu = [];
  res.locals.showTopPageBar = true;

  config.projects.forEach(function(project) {
    var item = {
      id: project.name,
      text: i18n.__(project.name),
      href: 'http://' + project.host + req.app.locals.links.home()
    };
    if (project.host == config.host)
      item.cssClass = 'active';
    res.locals.topBarMenu.push(item);
  });

  next();
};
