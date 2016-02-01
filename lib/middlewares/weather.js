'use strict';

var utils = require('../utils');
var latestPlaces = require('../latest_places');
var data = require('../data');
var viewdata = require('../viewdata');

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var language = res.locals.currentCulture.language;

	res.locals.util.weather = {
		symbolName: function(symbol, lang) {
			return data.weather.util.symbolName(symbol, lang);
		},
		windDirectionCss: utils.windDirectionCss
	};
	res.locals.location = [{
		href: res.locals.links.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	res.locals.sightImage = data.forecastImage.get({
		season: 'winter'
	});

	res.locals.latestPlaces = latestPlaces.get(config.country);

	viewdata({
			exchangeWidget: !!config.projects.exchange,
			weatherWidget: true,
			places: {
				name: 'mainPlaces',
				options: {
					ids: config.mainPlaces,
					getRegion: true,
					sort: true
				}
			}
		}, req, res)
		.then(function() {
			next();
		}, next);
};
