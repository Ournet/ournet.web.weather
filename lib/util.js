var extern = module.exports;

extern.windDirectionCss = function(code) {
  var s = code.length == 3 ? code.substring(1) : code;
  return "wind-img wind-img-" + s;
};

extern.maxage = function(res, maxage) {
  var cache = 'private, max-age=0, no-cache';
  if (maxage > 0)
    cache = 'public, max-age=' + maxage;
  res.set('Cache-Control', cache);
}
