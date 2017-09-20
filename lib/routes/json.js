'use strict';

const express = require('express');
const utils = require('../utils');
const _ = utils._;
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const util = require('util');
const internal = {};
const Data = require('../data');
const logger = require('../logger');


route.get('/json/today/:id.json', function (req, res, next) {
	var config = res.locals.config;

	utils.maxagePlace(res);

	var date = res.locals.currentDate.toDate();
	var id = parseInt(req.params.id);
	var links = res.locals.links;
	const currentCulture = res.locals.currentCultureș
	var lang = res.locals.currentCulture.language;
	var __ = res.locals.__;

	internal.getPlace(id)
		.then(function (place) {
			if (!place) {
				logger.error('Not found place', {
					placeid: id,
					url: req.originalUrl
				});
				utils.maxage(res, 0);
				return res.send(null);
			}
			const report = place.forecast;

			if (!report || !report.days) {
				utils.maxage(res, 1);
				return res.send(null);
			}

			var day = _.find(report.days, {
				date: utils.formatDate(date)
			});

			if (!day) {
				date.setDate(date.getDate() + 1);
				day = _.find(report.days, {
					date: utils.formatDate(date)
				});
			}

			if (!day) {
				utils.maxage(res, 1);
				return res.send(null);
			}

			var time = day.times[parseInt(day.times.length / 2)];

			res.send({
				place: {
					name: Data.places.Place.getName(place, lang),
					title: util.format(__('weather_in_format'), Data.places.Place.inPlaceName(place, lang)),
					id: place.id,
					url: utils.canonical(currentCulture.country, links.weather.place(place.id, {
						ul: lang
					}))
				},
				forecast: {
					temperature: time.t.value,
					symbol: {
						id: time.symbol.number,
						name: Data.weather.symbolName(time.symbol, lang)
					}
				}
			});
		}).catch(next);
});

internal.getPlace = function (id) {
	return Data.get({
		place: ['placeForecast', { placeId: id }]
	}).then(data => {
		return data.place;
	});
};
