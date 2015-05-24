var 
  core = require('ournet.core'),
  request = require('request'),
  extern = module.exports,
  internal = {},
  cache = new core.MemoryCache({
    ttl: 60 * 30
  });


extern.getStories = function(config, lang) {
  lang = lang || config.language;
  var key = 'stories-' + config.country + '-' + lang;
  var result = cache.get(key);
  if (result) return core.Promise.resolve(result);
  var date = Date.now();
  return new core.Promise(function(resolve, reject) {
    request('http://' + config.projects.news + '/json/weatherstories.json?ul=' + lang, function(error, response, body) {
      if (error) return reject(error);
      if (response.statusCode < 200 || response.statusCode > 399)
        return reject(new Error('News response error: ' + response.statusCode));
      if (!core._.isString(body)) return resolve([]);
      try {
        body = JSON.parse(body);
      } catch (e) {
        reject(e);
      }
      if (!Array.isArray(body)) return resolve([]);
      cache.set(key, body);
      //console.log('got stories in ', (Date.now() - date), 'ms');
      resolve(body);
    });
  });
};
