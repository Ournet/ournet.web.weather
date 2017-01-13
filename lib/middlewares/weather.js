'use strict';

const utils = require('../utils');
// var _ = utils._;

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var country = res.locals.currentCulture.country;
	var language = res.locals.currentCulture.language;

	res.locals.location = [{
		href: res.locals.links.weather.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	res.locals.showBottomAd = true;
	const date = utils.formatDate(res.locals.currentDate.toDate());

	res.viewdata.mainPlaces = ['places', { ids: config.mainPlaces }];
	res.viewdata.holidays = ['holidays', { country: country, lang: language }];
	res.viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const rateKeys = [];

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		res.viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		res.viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}
	next();
};
