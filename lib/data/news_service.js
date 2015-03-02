var request = require('request'),
  core = require('ournet.core'),
  config = require('../config'),
  extern = module.exports,
  internal = {},
  cache = new core.MemoryCache({
    ttl: 60 * 30
  });


extern.getStories = function(lang) {
  lang = lang || config.language;
  var key = 'stories-' + lang;
  var result = cache.get(key);
  if (result) return core.Promise.resolve(result);
  var date = Date.now();
  return new core.Promise(function(resolve, reject) {
    request('http://' + config.projects.news + '/json/weatherstories.json?ul=' + lang, function(error, response, body) {
      if (error) return reject(error);
      if (response.statusCode < 200 || response.statusCode > 399)
        return reject(new Error('News response error: ' + response.statusCode));
      if (!core._.isString(body)) return resolve([]);
      body = JSON.parse(body);
      if (!Array.isArray(body)) return resolve([]);
      cache.set(key, body);
      //console.log('got stories in ', (Date.now() - date), 'ms');
      resolve(body);
    });
  });
};
