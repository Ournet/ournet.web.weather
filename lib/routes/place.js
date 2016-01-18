'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var internal = {};
var data = require('../data');
var logger = require('../logger');
var latestPlaces = require('../latest_places');
var viewdata = require('../viewdata');

route.param('prefix', utils.routePrefix);
// place: /vremea/786654
route.get('/' + utils.route_prefix + '/:id(\\d+)', function(req, res, next) {
	utils.maxagePlace(res);

	var id = parseInt(req.params.id);
	var config = res.locals.config;

	viewdata([{
			place: {
				options: {
					id: id,
					getRegion: true
				},
				required: true
			}
		}, {
			latestStories: !!config.projects.news,
			forecast: {
				name: 'report',
				options: function(locals) {
					return data.weather.forecast.formatSelector(locals.place);
				}
			}
		}], req, res)
		.then(function() {
			var place = res.locals.place;
			if (!place) {
				logger.error('Not found place', {
					placeid: id,
					url: req.originalUrl
				});
				return res.redirect(res.locals.links.weather.home());
			}
			return internal.renderPlace(req, res, next);
		}, next);
});

internal.renderPlace = function(req, res) {
	var config = res.locals.config;
	var place = res.locals.place;
	var report = res.locals.report;
	var links = res.locals.links;
	var lang = res.locals.currentCulture.language;
	var selflink = links.weather.place(place.id, {
		ul: lang
	});
	// displayname = data.places.util.inPlaceName(place, lang),
	var __ = res.locals.__;

	res.locals.affix = config.country !== 'in';

	res.locals.site.head.canonical = 'http://' + config.host + selflink;

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

	if (place.region) {
		res.locals.location.push({
			href: links.weather.place(place.region.id, {
				ul: lang
			}),
			text: place.region.getName(lang)
		});

		latestPlaces.put(place);
	}
	res.locals.location.push({
		href: links.weather.place(place.id, {
			ul: lang
		}),
		text: place.getName(lang)
	});

	if (!report) {
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
		report: report,
		title: info.title,
		subTitle: info.subTitle
	});
};

internal.formatPageInfo = function(place, res) {
	var info = {
			title: null,
			subTitle: null,
			description: null,
			keywords: null
		},
		lang = res.locals.currentCulture.language,
		currentCulture = res.locals.currentCulture,
		displayname = place.getName(lang),
		inname = data.places.util.inPlaceName(place, lang),
		adm1 = place.region,
		__ = res.locals.__;

	//if is adm1
	if (!adm1) {
		info.pageTitle = util.format(__('weather_item_head_title_format'), inname, displayname);

		info.description =
			util.format(__('weather_item_head_description_format'), inname + util.format(' (%s)', place.name), place.asciiname);

		info.title = util.format(__('weather_title_format'), inname);
		info.keywords = util.format('%s, %s, %s, %s', displayname, __('weather'),
			__('weather2'), currentCulture.countryName);
	} else {

		var shortadmname = data.places.util.shortAdm1Name(place.region, lang);

		var longname = inname;

		if (!data.places.util.isTown(place) && !data.places.util.isCity(place)) {
			longname = (place.name !== adm1.name && !adm1.name.indexOf(place.name) > -1) ? util.format('%s, %s', longname, shortadmname) : longname;
		}

		info.pageTitle = util.format(__('weather_item_head_title_format'), longname, displayname);

		if (info.pageTitle.length > 80) {
			info.pageTitle = util.format(__('weather_item_head_title_format'), longname, displayname);
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
