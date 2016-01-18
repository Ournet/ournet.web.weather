'use strict';

var utils = require('../utils');
var latestPlaces = require('../latest_places');
var data = require('../data');

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

	res.locals.latestPlaces = latestPlaces.get(config.country);

	data.places.cacheAccess.getPlaces({
		ids: config.mainPlaces,
		getRegion: true,
		sort: true
	}).then(function(places) {
		res.locals.mainPlaces = places || [];
		next();
	}, next);
};
