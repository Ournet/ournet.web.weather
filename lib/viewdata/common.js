'use strict';

var data = require('../data');

exports.weatherWidget = function(locals) {
	var config = locals.config;
	var culture = locals.currentCulture;

	return data.common.widgets.getWeatherWidget({
			country: config.country,
			lang: culture.language,
			host: config.projects.weather,
			id: config.capitalId
		})
		.catch(function() {});
};

exports.exchangeWidget = function(locals) {
	var config = locals.config;
	var culture = locals.currentCulture;

	return data.common.widgets.getExchangeWidget({
			country: config.country,
			lang: culture.language,
			host: config.projects.exchange
		})
		.catch(function() {});
};

exports.latestStories = function(locals) {
	return data.news.stories(locals.config, locals.currentCulture.language);
};

exports.holidays = function(locals) {
	return data.holidays(locals.currentCulture, locals.config.timezone);
};
