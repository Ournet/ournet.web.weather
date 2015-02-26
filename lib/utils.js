var extern = module.exports;

extern.windDirectionCss = function(code) {
  var s = code.length == 3 ? code.substring(1) : code;
  return "wind-img wind-img-" + s;
};

/**
* Set response Cache-Control
* @maxage integet in minutes
*/
extern.maxage = function(res, maxage) {
  var cache = 'private, max-age=0, no-cache';
  if (maxage > 0)
    cache = 'public, max-age=' + (maxage * 60);
  res.set('Cache-Control', cache);
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
  extern.maxage(res, 60 * 1);
};

/**
* Set response Cache-Control
* @maxage integet in minutes
*/
extern.catchError = function(req, res, error) {
  var cache = 'private, max-age=0, no-cache';
  if (maxage > 0)
    cache = 'public, max-age=' + maxage + 60;
  res.set('Cache-Control', cache);
};
