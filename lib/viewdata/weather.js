'use strict';

var data = require('../data');

exports.placesForecast = function(locals, options) {
	return data.weather.cacheAccess.getPlacesForecast(options);
};

exports.forecast = function(locals, options) {
	return data.weather.access.getForecast(options);
};
