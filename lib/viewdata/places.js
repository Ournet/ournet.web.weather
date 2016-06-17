'use strict';

var data = require('../data');

exports.place = function(locals, params) {
	return data.places.cacheAccess.getPlace(params);
};

exports.places = function(locals, params) {
	return data.places.cacheAccess.getPlaces(params);
};

exports.regions = function(locals, params) {
	return data.places.cacheAccess.queryRegions(params);
};

exports.region = function(locals, params) {
	return data.places.cacheAccess.getRegionByAdmin1(params);
};

exports.placesByAdm1 = function(locals, params) {
	return data.places.access.queryPlacesByAdm1Key(params);
};
