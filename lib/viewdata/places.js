'use strict';

var data = require('../data');

exports.place = function(locals, options) {
	return data.places.access.getPlace(options);
};

exports.places = function(locals, options) {
	return data.places.cacheAccess.getPlaces(options);
};
