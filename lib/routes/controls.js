'use strict';

const express = require('express');
const utils = require('../utils');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');
const _ = utils._;

route.get('/controls/findplace', function (req, res, next) {
	var config = res.locals.config;
	var q = req.query.q;
	var currentCulture = res.locals.currentCulture;

	utils.maxage(res, 0);

	Data.get({
		places: ['searchPlace', { country: config.country, query: q, limit: req.limit || 8 }]
	}).then(function (result) {
		const places = result.places.map(function (item) {
			return {
				id: item.id,
				name: Data.places.Place.getName(item, currentCulture.language),
				region: {
					name: Data.places.Place.getName(item.admin1, currentCulture.language)
				}
			};
		});
		return res.send(places);
	}, next);
});

route.get('/controls/main_places_weather/:date', function (req, res, next) {
	const config = res.locals.config;
	const country = res.locals.currentCulture.country;
	const viewdata = res.viewdata;

	viewdata.mainPlaces = ['mainPlaces', { country: country, limit: config.mainPlacesCount }];

	Data.get(viewdata).then(function (result) {
		var places = result.mainPlaces.slice(0, 12).map(place => {
			return _.pick(place, 'id', 'latitude', 'longitude');
		});
		return Data.get({
			placesForecast: ['placesForecast', { date: req.params.date, places: JSON.stringify(places) }]
		})
			.then(function (result2) {
				result.placesForecast = result2.placesForecast;

				result.placesForecast.forEach(pf => {
					var place = _.find(result.mainPlaces, { id: pf.place.id });
					pf.place.name = place.name;
					pf.place.names = place.names;
				});

				utils.maxageIndex(res);
				res.render('controls/main_places_weather', result);
			});
	}, next);

});
