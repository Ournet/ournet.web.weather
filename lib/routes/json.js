'use strict';

var express = require('express');
var utils = require('../utils');
var _ = utils._;
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var internal = {};
var data = require('../data');
var logger = require('../logger');


route.get('/json/today/:id.json', function(req, res, next) {
	var config = res.locals.config;

	utils.maxagePlace(res);

	var date = new Date(),
		id = parseInt(req.params.id),
		links = res.locals.links,
		lang = res.locals.currentCulture.language,
		__ = res.locals.__;

	internal.getPlace(id).then(function(place) {
		if (!place) {
			logger.error('Not found place', {
				placeid: id,
				url: req.originalUrl
			});
			return res.send(null);
		}
		return internal.getWeather(place)
			.then(function(report) {
				if (!report || !report.days) {
					return res.send(null);
				}

				var day = _.find(report.days, {
					date: utils.formatDate(date)
				});

				if (!day) {
					date.setHours(date.getHours() + 12);
					day = _.find(report.days, {
						date: utils.formatDate(date)
					});
				}

				if (!day) {
					return res.send(null);
				}

				var time = day.times[parseInt(day.times.length / 2)];

				res.send({
					place: {
						name: place.getName(lang),
						title: util.format(__('weather_in_format'), data.places.util.inPlaceName(place, lang)),
						id: place.id,
						url: 'http://' + config.host + links.weather.place(place.id, {
							ul: lang
						})
					},
					forecast: {
						temperature: time.t.value,
						symbol: {
							id: time.symbol.number,
							name: data.weather.util.symbolName(time.symbol, lang)
						}
					}
				});
			});
	}).catch(next);
});

route.get('/json/alarms-:date.json', function(req, res, next) {
	utils.maxagePlace(res);

	var country = res.locals.currentCulture.country;

	var key = data.weather.helpers.formatAlarmKey(country, req.params.date);

	data.weather.access.getAlarms(key, { limit: 10 })
		.then(function(alarms) {
			res.send(alarms);
		}, next);

});

internal.getPlace = function(id) {
	return data.places.access.getPlace({
		id: id,
		getRegion: true
	});
};

internal.getWeather = function(place) {
	return data.weather.access.getForecast(data.weather.forecast.formatSelector(place));
};
