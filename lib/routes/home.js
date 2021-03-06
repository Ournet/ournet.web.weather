'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
const _ = utils._;
/*eslint new-cap:1*/
const route = express.Router();
const Data = require('../data');

//index

route.get('/', function (req, res, next) {
	var config = res.locals.config;
	utils.maxageIndex(res);

	var currentCulture = res.locals.currentCulture;
	var links = res.locals.links;
	var __ = res.locals.__;

	res.locals.location.pop();

	res.locals.title = res.locals.site.head.title = util.format(__('home_title_format'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	res.locals.subTitle = res.locals.site.head.description = util.format(__('weather_in_cn_summary'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));
	res.locals.site.head.keywords = util.format('%s, %s, %s', __('weather'), __('weather2'), currentCulture.countryName);

	res.locals.site.head.canonical = utils.canonical(currentCulture.country, links.weather.home({
		ul: currentCulture.language
	}));

	// console.log(res.locals.util);

	var date = utils.formatDate(res.locals.currentDate.toDate());
	var viewdata = res.viewdata;

	Data.get(viewdata).then(function (result) {
		var places = result.mainPlaces.slice(0, 12).map(place => {
			return _.pick(place, 'id', 'latitude', 'longitude');
		});
		return Data.get({
			placesForecast: ['placesForecast', { date: date, places: JSON.stringify(places) }]
		})
			.then(function (result2) {
				result.placesForecast = result2.placesForecast;

				result.placesForecast.forEach(pf => {
					var place = _.find(result.mainPlaces, { id: pf.place.id });
					pf.place.name = place.name;
					pf.place.names = place.names;
				});

				res.render(utils.getRenderName(res, 'index'), result);
			});
	}, next);
});

route.get('/manifest.json', function (req, res, next) {
	const config = res.locals.config;
	const __ = res.__;

	const manifest = {
		name: config.name,
		short_name: __('weather'),
		// start_url: '/',
		display: 'standalone',
		gcm_sender_id: '482941778795'
	};

	utils.maxage(res, 60 * 12);

	res.send(manifest);
});

module.exports = route;
