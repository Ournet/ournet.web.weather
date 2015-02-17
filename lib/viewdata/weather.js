var core = require('ournet.core'),
  md5 = core.util.md5,
  Promise = core.Promise,
  weather = require('ournet.data.weather');

module.exports = function(req, res, next) {
  res.locals.util.weather = {
    symbolName: function(symbol, lang) {
      return weather.forecast.symbolName(symbol, lang);
    }
  };
  res.locals.mainPlaces = [];
  next();
};
