'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var Data = require('../data');

route.get('/controls/findplace', function(req, res, next) {
	var config = res.locals.config;
	var q = req.query.q;
	var currentCulture = res.locals.currentCulture;

	utils.maxage(res, 0);

	Data.places.search.suggest({
		query: q,
		country: config.country
	}).then(function(places) {
		var list = [];
		if (places) {
			places.forEach(function(item) {
				var place = {
					id: item.id,
					name: item.getName(currentCulture.language),
					region: {
						name: item.region.getName(currentCulture.language)
					}
				};
				list.push(place);
			});
		}

		return res.send(list);
	}, next);
});

route.get('/controls/main_places_weather/:date', function(req, res, next) {
	var config = res.locals.config;
	Data.places.cacheAccess.getPlaces({
		ids: config.mainPlaces,
		getRegon: true,
		sort: true
	}).then(function(places) {
		return Data.weather.cacheAccess.getPlacesForecast({
				country_code: config.country,
				date: req.params.date,
				places: places
			})
			.then(function(result) {
				utils.maxagePlaces(res);
				res.render('controls/main_places_weather', {
					placesWeather: result
				});
			});
	}, next);
});
