'use strict';

var _package = require('../../package.json');
var utils = require('../utils');
var Data = require('../data');
const Links = require('ournet.links');

var util = {
	moment: utils.moment,
	format: require('util').format,
	startWithUpperCase: utils.startWithUpperCase,
	numberFormat: utils.number.format,
	weather: {
		symbolName: function(symbol, lang) {
			return Data.weather.symbolName(symbol, lang);
		},
		windDirectionCss: utils.windDirectionCss,
		pressureTommHg: utils.pressureTommHg
	},
	Place: Data.places.Place
};

module.exports = function(req, res, next) {
	var config = res.locals.config;

	res.locals.Links = Links;

	res.viewdata = {};

	var culture = res.locals.currentCulture = {
		language: res.locale,
		country: config.country
	};

	util.localDate = function(t) {
		t = t || Date.now();
		return utils.moment.tz(t, config.timezone).locale(culture.language);
	};

	culture.languageName = res.locals.__('language_' + culture.language);
	culture.countryName = res.locals.__('country_' + culture.country);

	res.locals.noGoogleAds = culture.country === 'al';
	res.locals.currentDate = util.localDate();

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
			href: 'http://' + host + res.locals.links.weather.home({
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
