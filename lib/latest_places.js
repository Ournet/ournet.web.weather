var extern = module.exports,
  core = require('ournet.core'),
  _ = core._,
  list = [],
  ids = [],
  limit = 20;


extern.get = function() {
  return list;
};

extern.put = function(place) {
  if (ids.indexOf(place.id) > -1) return;
  if (ids.length >= limit) {
    ids.pop();
    list.pop();
  }
  ids.push(place.id);
  list.splice(0, 0, _.pick(place, 'id', 'name', 'alternatenames', 'getName'));
};
