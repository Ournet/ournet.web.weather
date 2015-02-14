var express = require('express'),
  route = module.exports = express.Router(),
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather'),
  config = require('../config.js'),
  internal = {};


// place: /vremea/786654
route.get('/' + config.prefix + '/:id(\\d+)', function(req, res, next) {
  var date = Date.now(),
    id = parseInt(req.params.id);

  internal.renderPlace(req, res, id);
});

// old place: /ro/vremea/Ciosescu/686675
route.get('/' + [config.prefix, config.country, ':name', ':id(\\d+)'].join('/'), function(req, res, next) {
  var date = Date.now(),
    id = parseInt(req.params.id);

  internal.renderOldId(req, res, id);
});

internal.renderPlace = function(req, res, id) {
  var date = Date.now();
  places.cacheAccess.getPlace(id).then(function(place) {
    console.log('got place in ', (Date.now() - date) + ' ms');
    date = Date.now();
    return places.cacheAccess.getRegionByAdmin1(place.country_code, place.admin1_code).then(function(region) {
      console.log('got region in ', (Date.now() - date) + ' ms');
      place.region = region;
      return internal.getWeather(place).then(function(report) {
        res.render('place', {
          place: place,
          report: report
        });
        //res.send(report);
      });
    });
  }).error(function(error) {
    res.send(error);
  });
};

internal.renderOldId = function(req, res, id) {
  var date = Date.now();
  places.access.getOldId(id).then(function(oldid) {
    console.log('got id in ', (Date.now() - date) + ' ms');
    res.redirect(301, '/' + config.prefix + '/' + oldid.geonameid);
  });
};

internal.getWeather = function(place) {
  return weather.access.getForecast(weather.forecast.formatSelector(place));
};
