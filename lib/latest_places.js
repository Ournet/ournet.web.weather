'use strict';

var utils = require('./utils');
var _ = utils._;
var list = {};
var ids = {};
var limit = 20;


exports.get = function(country) {
	return list[country] || [];
};

exports.put = function(place) {
	if (!ids[place.country_code]) {
		ids[place.country_code] = [];
		list[place.country_code] = [];
	}
	if (~ids[place.country_code].indexOf(place.id)) {
		return;
	}
	if (ids[place.country_code].length >= limit) {
		ids[place.country_code].pop();
		list[place.country_code].pop();
		if (ids[place.country_code].length > limit) {
			ids[place.country_code] = list[place.country_code] = [];
		}
	}
	ids[place.country_code].push(place.id);
	list[place.country_code].splice(0, 0, _.pick(place, 'id', 'name', 'alternatenames', 'getName'));
};
