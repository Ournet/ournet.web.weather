'use strict';

var data = require('../data');

exports.placesForecast = function(locals, params) {
	return data.weather.access.getPlacesForecast(params);
};

exports.forecast = function(locals, params) {
	return data.weather.access.getForecast(params.key, params);
};
