'use strict';

const express = require('express');
const utils = require('../utils');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');
const _ = require('../utils')._;

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
					name: Data.places.Place.getName(item, currentCulture.language),
					region: {
						name: Data.places.Place.getName(item.region, currentCulture.language)
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

	const viewdata = res.viewdata;

	viewdata.mainPlaces = ['places', { ids: config.mainPlaces }];

	Data.get(viewdata).then(function(result) {
		var places = result.mainPlaces.map(place => {
			return _.pick(place, 'id', 'latitude', 'longitude');
		});
		return Data.get({
				placesForecast: ['placesForecast', { date: req.params.date, places: JSON.stringify(places) }]
			})
			.then(function(result2) {
				result.placesForecast = result2.placesForecast;

				result.placesForecast.forEach(pf => {
					var place = _.find(result.mainPlaces, { id: pf.place.id });
					pf.place.name = place.name;
					pf.place.alternatenames = place.alternatenames;
				});

				utils.maxageIndex(res);
				res.render('controls/main_places_weather', result);
			});
	}, next);

});
