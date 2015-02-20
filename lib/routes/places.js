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


// places: /vremea/places
route.get('/' + config.prefix + '/places', function(req, res, next) {
  var date = Date.now();

  function render(regions) {
    var links = res.app.locals.links,
      currentCulture = res.locals.currentCulture,
      lang = currentCulture.language,
      __ = res.locals.__;

    res.locals.location.push({
      href: links.weather.places(),
      text: __('places')
    });

    res.locals.title = util.format(__('weather.search_place_in_cn'), places.util.inCountryName(currentCulture.countryName, lang));

    res.locals.site.head.title = res.locals.title;

    res.render('regions', {
      regions: regions
    });
  }

  internal.getRegions(config.country).then(render)
    .error(function(error) {
      res.send(error);
    });
});

// places: /vremea/places/92
route.get('/' + config.prefix + '/places/:adm1', function(req, res, next) {
  var date = Date.now(),
    adm1 = req.params.adm1,
    links = res.app.locals.links;

  function render(placeslist, region) {

    var
      currentCulture = res.locals.currentCulture,
      lang = currentCulture.language,
      __ = res.locals.__;

    res.locals.location.push({
      href: links.weather.places(),
      text: __('places')
    });

    res.locals.title = util.format(__('weather.search_place_in_cn'), places.util.inCountryName(currentCulture.countryName, lang));

    res.locals.site.head.title = res.locals.title;

    res.render('places', {
      places: placeslist,
      region: region,
      limit: 30
    });
  }

  return res.send(links.weather.controls.places.toString());

  Promise.props({
      places: internal.getPlaces(config.country, adm1),
      region: places.cacheAccess.getRegionByAdmin1(config.country, adm1)
    })
    .then(function(result) {
      render(result.places, result.region);
    }).error(function(error) {
      res.send(error);
    });
});

internal.getRegions = function(country_code) {
  var date = Date.now();
  return places.cacheAccess.queryRegions({
    key: country_code,
    limit: 60
  }).then(function(result) {
    console.log('got result in ', (Date.now() - date) + ' ms');
    return result;
  });
};

internal.getPlaces = function(country_code, adm1) {
  var date = Date.now();
  return places.cacheAccess.queryPlacesByAdm1Key({
    key: [country_code, adm1].join('-'),
    limit: 30
  }).then(function(result) {
    console.log('got result in ', (Date.now() - date) + ' ms');
    return result;
  });
};
