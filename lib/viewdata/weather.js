var core = require('ournet.core'),
  md5 = core.util.md5,
  Promise = core.Promise,
  webutil = require('../util.js'),
  weather = require('ournet.data.weather');

module.exports = function(req, res, next) {
  res.locals.util.weather = {
    symbolName: function(symbol, lang) {
      return weather.util.symbolName(symbol, lang);
    },
    windDirectionCss: webutil.windDirectionCss
  };
  res.locals.location = [{
    href: res.app.locals.links.home({
      ul: res.locals.currentCulture.language
    }),
    text: res.locals.__('home')
  }];
  next();
};