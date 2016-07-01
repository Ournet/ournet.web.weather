'use strict';

var data = require('../data');

exports.place = function(locals, params) {
	return data.places.access.place(params.key, params.options);
};

exports.places = function(locals, params) {
	return data.places.access.places(params.keys, params.options);
};

exports.regions = function(locals, params) {
	return data.places.access.placesByTypeAdm1(params.country, params.options);
};

exports.region = function(locals, params) {
	return data.places.access.adm1(params);
};

exports.placesByAdm1 = function(locals, params) {
	return data.places.access.placesByAdm1Key(params.key, params.options);
};
