'use strict';

var data = require('../data');

exports.placesForecast = function(locals, params) {
	return data.weather.access.getPlacesForecast(params)
		.timeout(1000 * 2);
};

exports.forecast = function(locals, params) {
	return data.weather.access.getForecast(params.key, params)
		.timeout(1000 * 2);
};
