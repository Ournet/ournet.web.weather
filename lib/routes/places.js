'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var internal = {};
var Data = require('../data');
// var viewdata = require('../viewdata');
var logger = require('../logger');

route.param('prefix', utils.routePrefix);

// places: /vremea/places
route.get('/' + utils.route_prefix + '/places', function(req, res, next) {
	// var date = Date.now();
	var config = res.locals.config;

	utils.maxagePlaces(res);

	if (req.query.q) {
		return internal.renderSearch(req, res, req.query.q, next);
	}

	res.viewdata.set({
		regions: {
			params: {
				key: res.locals.currentCulture.country,
				limit: 90
			}
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}

		var links = res.locals.links,
			currentCulture = res.locals.currentCulture,
			lang = currentCulture.language,
			__ = res.locals.__;

		res.locals.site.head.canonical = 'http://' + config.host + links.weather.places();

		res.locals.location.push({
			href: links.weather.places(),
			text: __('places')
		});

		res.locals.title = util.format(__('search_place_in_cn'), Data.places.util.inCountryName(currentCulture.countryName, lang));

		res.locals.site.head.title = res.locals.title;

		res.render(utils.getRenderName(res, 'regions'));
	});
});

// places: /vremea/places/92
route.get('/' + utils.route_prefix + '/places/:adm1', function(req, res, next) {
	var config = res.locals.config;

	var adm1 = req.params.adm1;
	var links = res.locals.links;

	utils.maxagePlaces(res);

	res.viewdata.set({
		places: {
			source: 'placesByAdm1',
			params: {
				key: [config.country, adm1].join('-'),
				limit: 90
			}
		},
		region: {
			params: {
				country_code: config.country,
				admin1_code: adm1
			}
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		var region = res.locals.region;
		if (!region) {
			logger.error('Not found region ' + adm1 + '-' + config.country);
			return res.redirect(links.weather.home());
		}

		var
			currentCulture = res.locals.currentCulture,
			lang = currentCulture.language,
			__ = res.locals.__;

		res.locals.site.head.canonical = 'http://' + config.host + links.weather.places.byAdm1(adm1);

		res.locals.location.push({
			href: links.weather.places({
				ul: lang
			}),
			text: __('places')
		});

		res.locals.title = util.format(__('search_place_in_cn_format'), region.getName(lang), currentCulture.countryName);

		res.locals.site.head.title = res.locals.title;
		//return res.send(placeslist);
		res.render(utils.getRenderName(res, 'places'));
	});
});

internal.renderSearch = function(req, res, query, next) {
	var links = res.locals.links,
		currentCulture = res.locals.currentCulture,
		date = Date.now(),
		diff,
		__ = res.locals.__;

	utils.maxage(res, 0);

	Data.places.search.search({
		query: query,
		country: currentCulture.country
	}).then(function(places) {
		diff = Date.now() - date;
		if (diff > 200) {
			logger.warn('Search too long time: ' + diff, {
				time: diff,
				query: query
			});
		}
		if (places.length === 1 || (req.query.mode === 'one' && places.length > 0)) {
			logger.warn('Redirect: found place', {
				query: req.query,
				country: currentCulture.country
			});
			return res.redirect(links.weather.place(places[0].id, {
				ul: currentCulture.language
			}));
		}

		if (places.length === 0) {
			if (req.query.mode === 'one') {
				logger.warn('Redirect: NOT found place', {
					query: req.query,
					country: currentCulture.country
				});
				return res.redirect(links.weather.home({
					ul: currentCulture.language
				}));
			} else {
				logger.warn('NOT found place', {
					query: req.query,
					country: currentCulture.country
				});
			}
		}

		res.locals.location.push({
			href: links.weather.places({
				ul: currentCulture.language
			}),
			text: __('places')
		});

		res.locals.title = util.format(__('search_place_format'), query);

		res.locals.site.head.title = res.locals.title;

		res.viewdata.get(res.locals, function(error) {
			if (error) {
				return next(error);
			}
			res.render(utils.getRenderName(res, 'places'), {
				places: places
			});
		});
	}).catch(next);
};
