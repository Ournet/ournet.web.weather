var extern = module.exports;

extern.windDirectionCss = function(code) {
  var s = code.length == 3 ? code.substring(1) : code;
  return "wind-img wind-img-" + s;
};

extern.route_prefix = ':prefix(prognoza|pogoda|vremea|forecast|tempo)';

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
extern.maxage = function(res, maxage) {
  var cache = NO_CACHE;
  if (maxage > 0) {
    cache = PUBLIC_CACHE + (maxage * 60);
    //res.set('Expires', new Date(Date.now() + (maxage * 60 * 1000)).toUTCString());
  }
  res.set(CACHE_CONTROL, cache);
};

extern.maxageRedirect = function(res) {
  extern.maxage(res, 60 * 12);
};

extern.maxagePlaces = function(res) {
  extern.maxage(res, 60 * 12);
};

extern.maxagePlace = function(res) {
  extern.maxage(res, 60 * 4);
};

extern.maxageIndex = function(res) {
  extern.maxage(res, 60 * 2);
};
