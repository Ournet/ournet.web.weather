'use strict';

var express = require('express');
var util = require('util');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = express.Router();
var data = require('../data');

//index

route.get('/', function(req, res, next) {
	var config = res.locals.config;
	utils.maxageIndex(res);

	var currentCulture = res.locals.currentCulture;
	var links = res.locals.links;
	var __ = res.locals.__;

	res.locals.location.pop();

	res.locals.title = res.locals.site.head.title = util.format(__('home_title_format'), data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	res.locals.subTitle = res.locals.site.head.description = util.format(__('weather_in_cn_summary'), data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	res.locals.site.head.keywords = util.format('%s, %s, %s', __('weather'), __('weather2'), currentCulture.countryName);

	res.locals.site.head.canonical = 'http://' + config.host + links.home({
		ul: currentCulture.language
	});

	// console.log(res.locals.util);

	var date = utils.formatDate(new Date());
	var viewdata = res.viewdata;

	viewdata.set({
		placesForecast: {
			params: function(locals) {
				return {
					country_code: config.country,
					date: date,
					places: locals.mainPlaces
				};
			}
		}
	}, 1);

	viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		return res.render(utils.getRenderName(res, 'index'));
	});
});

exports = module.exports = route;
