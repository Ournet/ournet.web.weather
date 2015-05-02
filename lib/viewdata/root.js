var _package = require('../../package.json'),
  i18n = require('i18n'),
  core = require('ournet.core'),
  utils = require('../utils.js'),
  util = {
    moment: require('moment'),
    format: require('util').format,
    startWithUpperCase: core.util.startWithUpperCase,
    numberFormat: core.util.numberFormat
  },
  data = require('ournet.data');

module.exports = function(req, res, next) {
  var config = res.locals.config;
  var culture = res.locals.currentCulture = {
    language: res.locale,
    country: config.country
  };
  culture.languageName = res.locals.__('language_' + culture.language);
  culture.countryName = res.locals.__('country_' + culture.country);

  //console.log(culture.language);

  res.locals.currentDate = core.date(config.timezone);
  res.locals.currentDateNoTime = core.date(config.timezone);
  res.locals.currentDateNoTime.setHours(0, 0, 0, 0);

  //console.log(currentDate)

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
      text: res.locals.__(project),
      href: 'http://' + host + res.locals.links.home({
        ul: culture.language
      })
    };
    if (host == config.host)
      item.cssClass = 'active';
    res.locals.topBarMenu.push(item);
  }

  res.locals._events = [];

  utils.maxage(res, 60 * 1);
  if (config.projects['exchange']) {
    data.widgets.getExchangeWidget({
      country: culture.country,
      lang: culture.language
    }).then(function(widget) {
      res.locals.exchangeWidget = widget;
    }).finally(next);
  } else {
    next();
  }
};
