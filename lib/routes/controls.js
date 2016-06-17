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

	res.viewdata.set({
		places: {
			params: {
				ids: config.mainPlaces,
				getRegon: true,
				sort: true
			}
		}
	});

	res.viewdata.set({
		placesForecast: {
			params: function(locals) {
				return {
					country_code: config.country,
					date: req.params.date,
					places: locals.places
				};
			}
		}
	}, 1);

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		utils.maxageIndex(res);
		res.render('controls/main_places_weather');
	});
});
