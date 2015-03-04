var extern = module.exports,
  core = require('ournet.core'),
  _ = core._,
  list = {},
  ids = {},
  limit = 20;


extern.get = function(country) {
  return list[country] || [];
};

extern.put = function(place) {
  if (!ids[place.country_code]) {
    ids[place.country_code] = [];
    list[place.country_code] = [];
  }
  if (ids[place.country_code].indexOf(place.id) > -1) return;
  if (ids[place.country_code].length >= limit) {
    ids[place.country_code].pop();
    list[place.country_code].pop();
    if (ids[place.country_code].length > limit)
      ids[place.country_code] = list[place.country_code] = [];
  }
  ids[place.country_code].push(place.id);
  list[place.country_code].splice(0, 0, _.pick(place, 'id', 'name', 'alternatenames', 'getName'));
};
