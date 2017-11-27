'use strict';

var express = require('express');
var utils = require('../utils');
const _ = utils._;
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var internal = {};
var Data = require('../data');
var logger = require('../logger');

internal.route = function (req, res, next) {
	utils.maxagePlace(res);

	var id = parseInt(req.params.id);
	// var config = res.locals.config;
	var lang = res.locals.currentCulture.language;
	var country = res.locals.currentCulture.country;
	var links = res.locals.links;

	res.locals.reportDays = req.params.days || 5;

	var viewdata = res.viewdata;

	viewdata.place = ['placeForecast', { placeId: id }];
	if (res.locals.config.projects.news) {
		viewdata.latestStories = ['latestStories', { country: country, lang: lang, limit: 4 }];
	}

	Data.get(viewdata)
		.then(function (result) {
			if (!result.place) {
				logger.error('Not found place', {
					placeid: id,
					url: req.originalUrl
				});
				return res.redirect(links.weather.home({
					ul: lang
				}));
			}

			_.assign(res.locals, result);

			res.locals.forecast = result.place.forecast;

			// console.log(result.place.forecast.days[0].times);
			// console.log(res.locals.holidays['2017-11-04']);

			internal.renderPlace(req, res, next);
		}, next);
};

internal.renderPlace = function (req, res) {
	var config = res.locals.config;
	var place = res.locals.place;
	// var report = res.locals.report;
	var links = res.locals.links;
	const currentCulture = res.locals.currentCulture;
	var lang = res.locals.currentCulture.language;
	var reportDays = res.locals.reportDays;
	var selflink = links.weather.place(place.id, {
		ul: lang
	});

	if (reportDays !== 5) {
		selflink = links.weather.placeDays(place.id, reportDays, {
			ul: lang
		});
	}
	// displayname = data.places.util.inPlaceName(place, lang),
	var __ = res.locals.__;

	// res.locals.showBottomAd = false;

	res.locals.site.head.canonical = utils.canonical(currentCulture.country, selflink);

	var info = internal.formatPageInfo(place, res);
	res.locals.site.head.title = info.pageTitle;
	res.locals.site.head.description = info.description;
	res.locals.site.head.keywords = info.keywords;

	res.locals.location.push({
		href: links.weather.places({
			ul: lang
		}),
		text: __('places')
	});

	if (place.admin1) {
		res.locals.location.push({
			href: links.weather.places.byAdm1(place.admin1.admin1Code, {
				ul: lang
			}),
			text: Data.places.Place.getName(place.admin1, lang)
		});

		// latestPlaces.put(place);
	}
	res.locals.location.push({
		href: links.weather.place(place.id, {
			ul: lang
		}),
		text: Data.places.Place.getName(place, lang)
	});

	if (!place.forecast) {
		utils.maxage(res, 0);
		logger.warn('No weather report', {
			place: {
				id: place.id,
				name: place.name,
				asciiname: place.asciiname
			}
		});
		res.locals._events.push({
			category: 'report',
			action: 'empty',
			label: place.name.replace(/'/gi, ' '),
			value: -1
		});
	}

	res.render(utils.getRenderName(res, 'place'), {
		place: place,
		title: info.title,
		subTitle: info.subTitle
	});
};

internal.formatPageInfo = function (place, res) {
	var info = {
		title: null,
		subTitle: null,
		description: null,
		keywords: null
	},
		lang = res.locals.currentCulture.language,
		currentCulture = res.locals.currentCulture,
		displayname = Data.places.Place.getName(place, lang),
		inname = Data.places.Place.inPlaceName(place, lang),
		adm1 = place.admin1,
		__ = res.locals.__;
	var reportDays = res.locals.reportDays;
	var daysSuffix = '';
	if (reportDays !== 5) {
		daysSuffix = '_' + reportDays + 'days';
	}

	//if is adm1
	if (!adm1) {
		info.pageTitle = util.format(__('weather_item_head_title_format' + daysSuffix), inname, displayname);

		info.description =
			util.format(__('weather_item_head_description_format'), inname + util.format(' (%s)', place.name), place.asciiname);

		info.title = util.format(__('weather_title_format'), inname);
		info.keywords = util.format('%s, %s, %s, %s', displayname, __('weather'),
			__('weather2'), currentCulture.countryName);
	} else {

		var shortadmname = Data.places.Place.shortAdm1Name(place.admin1, lang);

		var longname = inname;

		if (!Data.places.Place.isBigCity(place, 10000)) {
			longname = (place.name !== adm1.name && !adm1.name.indexOf(place.name) > -1) ? util.format('%s, %s', longname, shortadmname) : longname;
		}

		info.pageTitle = util.format(__('weather_item_head_title_format' + daysSuffix), longname, displayname);

		if (info.pageTitle.length > 80) {
			info.pageTitle = util.format(__('weather_item_head_title_format' + daysSuffix), longname, displayname);
		}

		info.description =
			util.format(__('weather_item_head_description_format'),
				longname + util.format(' (%s, %s)', place.asciiname, adm1.asciiname), place.name);

		info.subTitle = util.format(__('place_weather_details_info'), longname, util.format('%s, %s', place.asciiname, adm1.asciiname), displayname);

		info.title = util.format(__('weather_title_format'), longname);

		info.keywords = util.format('%s, %s, %s, %s', longname, __('weather'), __('weather2'), currentCulture.countryName);
	}
	if (lang === 'ro') {
		info.pageTitle = utils.atonic(info.pageTitle);
	}

	return info;
};


// route.param('prefix', utils.routePrefix);
// place: /786654
route.get('/:id(\\d+)', internal.route);
// place: /786654/10days
route.get('/:id(\\d+)/10days', function (req, res, next) {
	req.params.days = 10;
	internal.route(req, res, next);
});
// place: /786654/7days
route.get('/:id(\\d+)/7days', function (req, res, next) {
	req.params.days = 7;
	internal.route(req, res, next);
});
// place: /786654/3days
route.get('/:id(\\d+)/3days', function (req, res, next) {
	req.params.days = 3;
	internal.route(req, res, next);
});
