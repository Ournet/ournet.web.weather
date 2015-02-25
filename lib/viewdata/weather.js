var core = require('ournet.core'),
  md5 = core.util.md5,
  Promise = core.Promise,
  webutil = require('../util.js'),
  latestPlaces = require('../latest_places.js'),
  weather = require('ournet.data.weather'),
  newsService = require('../data/news_service.js');

module.exports = function(req, res, next) {
  var lang = res.locals.currentCulture.language;
  res.locals.util.weather = {
    symbolName: function(symbol, lang) {
      return weather.util.symbolName(symbol, lang);
    },
    windDirectionCss: webutil.windDirectionCss
  };
  res.locals.location = [{
    href: res.app.locals.links.home({
      ul: lang
    }),
    text: res.locals.__('home')
  }];

  res.locals.latestPlaces = latestPlaces.get();

  newsService.getStories(lang).then(function(stories) {
    //core.logger.info(stories);
    res.locals.stories = stories;
  }).error(function(error) {
    core.logger.error(error);
  }).finally(next);
};
