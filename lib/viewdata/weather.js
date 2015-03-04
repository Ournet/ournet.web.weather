var core = require('ournet.core'),
  md5 = core.util.md5,
  Promise = core.Promise,
  utils = require('../utils.js'),
  latestPlaces = require('../latest_places.js'),
  weather = require('ournet.data.weather'),
  newsService = require('../data/news_service.js');

module.exports = function(req, res, next) {
  var config = res.locals.config;
  var lang = res.locals.currentCulture.language;
  res.locals.util.weather = {
    symbolName: function(symbol, lang) {
      return weather.util.symbolName(symbol, lang);
    },
    windDirectionCss: utils.windDirectionCss
  };
  res.locals.location = [{
    href: res.locals.links.home({
      ul: lang
    }),
    text: res.locals.__('home')
  }];

  utils.maxage(res, 60 * 4);

  res.locals.latestPlaces = latestPlaces.get(config.country);

  newsService.getStories(config, lang).then(function(stories) {
    res.locals.stories = stories;
  }).error(function(error) {
    core.logger.error(error.message, error);
  }).finally(next);
};
