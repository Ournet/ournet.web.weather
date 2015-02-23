var express = require('express'),
  core = require('ournet.core'),
  Promise = core.Promise,
  _ = core._,
  route = module.exports = express.Router(),
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather'),
  config = require('../config.js'),
  util = require('util'),
  internal = {};

route.get('/controls/findplace', function(req, res) {
  var q = req.query.q,
    limit = parseInt(req.query.limit || 10),
    currentCulture = res.locals.currentCulture;

  places.SearchService.instance.suggest({
    query: q,
    country: config.country
  }).then(function(places) {
    var list = [];
    if (places) {
      places.forEach(function(item) {
        var place = {
          id: item.id,
          name: item.getName({
            ul: currentCulture.language
          }),
          region: {
            name: item.region.getName({
              ul: currentCulture.language
            })
          }
        };
        list.push(place);
      });
    }

    return res.send(list);
  });
});

// places: /controls/more_places/82/123222.json
route.get('/controls/more_places/:adm1/:id.json', function(req, res, next) {
  internal.getPlaces(config.country, req.params.adm1, req.params.id)
    .then(function(places) {
      res.setHeader('cache-control', 'public, max-age=' + (86400 * 10));
      return res.send(places);
    })
    .error(function(error) {
      res.send(error);
    });
});

route.get('/controls/main_places_weather/:date', function(req, res) {
  places.CacheAccessService.instance.getPlaces(config.mainPlacesIds(), true).then(function(places) {
    return weather.CacheAccessService.instance.getPlacesForecast(config.country, req.params.date, places)
      .then(function(result) {
        res.render('controls/main_places_weather', {
          placesWeather: result
        });
      });
  });
});

internal.getPlaces = function(country_code, adm1, id) {
  var date = Date.now(),
    key = [country_code, adm1].join('-');
  return places.CacheAccessService.instance.queryPlacesByAdm1Key({
    key: [country_code, adm1].join('-'),
    limit: 30,
    startKey: {
      hashKey: key,
      rangeKey: 0
    }
  }).then(function(result) {
    console.log('got result in ', (Date.now() - date) + ' ms');
    return result;
  });
};
