'use strict';

var _package = require('../../package.json');
var utils = require('../utils');
var time = require('time');
var Data = require('../data');

var util = {
	moment: require('moment'),
	format: require('util').format,
	startWithUpperCase: utils.startWithUpperCase,
	numberFormat: utils.number.format,
	weather: {
		symbolName: function(symbol, lang) {
			return Data.weather.util.symbolName(symbol, lang);
		},
		windDirectionCss: utils.windDirectionCss
	}
};

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var culture = res.locals.currentCulture = {
		language: res.locale,
		country: config.country
	};
	culture.languageName = res.locals.__('language_' + culture.language);
	culture.countryName = res.locals.__('country_' + culture.country);

	res.locals.noGoogleAds = culture.language === 'al';

	//console.log(culture.language);

	var currentDate = res.locals.currentDate = new time.Date();
	currentDate.setTimezone(config.timezone);

	var currentDateNoTime = res.locals.currentDateNoTime = new time.Date();
	currentDateNoTime.setTimezone(config.timezone);
	res.locals.currentDateNoTime.setHours(0, 0, 0, 0);

	//console.log(currentDate)

	res.locals.site = {
		name: config.name,
		head: {},
		platform: utils.getPlatform(req)
	};

	res.locals.config = config;

	res.locals.project = {
		version: _package.version,
		name: 'weather',
		portalsAbroad: []
	};

	res.locals.util = util;

	res.locals.topBarMenu = [];
	res.locals.showTopPageBar = true;

	for (var project in config.projects) {
		var host = config.projects[project];
		var item = {
			id: project,
			text: res.locals.__(project),
			href: 'http://' + host + res.locals.links.home({
				ul: culture.language
			})
		};
		if (host === config.host) {
			item.cssClass = 'active';
		}
		res.locals.topBarMenu.push(item);
	}

	res.locals._events = [];

	utils.maxage(res, 60 * 1);

	next();
};