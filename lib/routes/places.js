'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var internal = {};
var Data = require('../data');
// var viewdata = require('../viewdata');
var logger = require('../logger');

// places: /places
route.get('/places', function (req, res, next) {
	// var date = Date.now();
	var config = res.locals.config;
	const culture = res.locals.currentCulture;

	utils.maxagePlaces(res);

	if (req.query.q) {
		return internal.renderSearch(req, res, req.query.q, next);
	}

	const viewdata = res.viewdata;
	viewdata.regions = ['regions', { limit: 93, country: culture.country }];

	Data.get(viewdata)
		.then(function (result) {
			var links = res.locals.links,
				currentCulture = res.locals.currentCulture,
				lang = currentCulture.language,
				__ = res.locals.__;

			res.locals.site.head.canonical = utils.canonical(culture.country, links.weather.places({ ul: culture.language }));

			res.locals.location.push({
				href: links.weather.places({ ul: culture.language }),
				text: __('places')
			});

			res.locals.title = util.format(__('search_place_in_cn'), Data.places.Place.inCountryName(currentCulture.countryName, lang));

			res.locals.site.head.title = res.locals.title;

			res.render(utils.getRenderName(res, 'regions'), result);
		}, next);
});

// places: /places/92
route.get('/places/:adm1', function (req, res, next) {
	var config = res.locals.config;
	const culture = res.locals.currentCulture;
	var adm1 = req.params.adm1;
	var links = res.locals.links;

	utils.maxagePlaces(res);

	const viewdata = res.viewdata;

	viewdata.places = ['regionPlaces', { regionKey: culture.country + '-' + adm1, limit: 90 }];
	viewdata.region = ['region', { country: culture.country, admin1: adm1 }];

	Data.get(viewdata)
		.then(function (result) {
			const region = result.region;
			if (!region) {
				logger.error('Not found region ' + adm1 + '-' + config.country);
				return res.redirect(links.weather.home());
			}

			var
				currentCulture = res.locals.currentCulture,
				lang = currentCulture.language,
				__ = res.locals.__;

			res.locals.site.head.canonical = utils.canonical(culture.country, links.weather.places.byAdm1(adm1));

			res.locals.location.push({
				href: links.weather.places({
					ul: lang
				}),
				text: __('places')
			});

			res.locals.title = util.format(__('search_place_in_cn_format'), Data.places.Place.getName(region, lang), currentCulture.countryName);

			res.locals.site.head.title = res.locals.title;
			//return res.send(placeslist);
			res.render(utils.getRenderName(res, 'places'), result);
		}, next);

});

internal.renderSearch = function (req, res, query, next) {
	var links = res.locals.links,
		currentCulture = res.locals.currentCulture,
		date = Date.now(),
		diff,
		__ = res.locals.__;

	utils.maxage(res, 0);

	const viewdata = res.viewdata;
	viewdata.places = ['searchPlace', { country: currentCulture.country, query: query, limit: 18 }];

	Data.get(viewdata)
		.then(result => {
			const places = result.places || [];
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

			res.render(utils.getRenderName(res, 'places'), result);
		}, next);
};
