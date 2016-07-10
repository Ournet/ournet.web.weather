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
		.timeout(1000 * 2)
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
		.timeout(1000 * 2)
		.catch(function() {});
};

exports.latestStories = function(locals) {
	var config = locals.config;
	var culture = locals.currentCulture;

	return data.news.stories(config, culture.language)
		.timeout(1000 * 2);
};

exports.holidays = function(locals) {
	return data.holidays(locals.currentCulture, locals.config.timezone)
		.timeout(1000 * 2);
};
