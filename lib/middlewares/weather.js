'use strict';

const utils = require('../utils');
const EmailSubscriber = require('../data/email_subscriber');
const Data = require('../data');
// var _ = utils._;

module.exports = function (req, res, next) {
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

	const currentDate = res.locals.currentDate;

	res.locals.showBottomAd = true;
	const date = utils.formatDate(currentDate.toDate());
	const oneDayMS = 60 * 60 * 24 * 1000;

	// const tasks = [
	// 	EmailSubscriber.count({ where: { group: 'weather-' + country, subscribed: true } }).then(count => { res.locals.totalSubscribers = count; next() }),
	// 	Data.get({ mainPlaces: ['mainPlaces', { country: country, limit: 10 }] }).then(result => res.locals.mainPlaces = result.mainPlaces)
	// ];

	// Promise.all(tasks)
	// 	.then(() => {

	// 	})

	res.viewdata.mainPlaces = ['mainPlaces', { country: country, limit: config.mainPlacesCount }];
	res.viewdata.holidays = ['holidays', { country: country, lang: language, start: dayMS(currentDate.valueOf() - oneDayMS), end: dayMS(currentDate.valueOf() + oneDayMS * 10) }];
	res.viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const rateKeys = [];

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		res.viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		res.viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}

	if (config.lists) {
		config.lists.forEach(list => {
			res.viewdata['places_' + list.id.replace(/-/g, '_')] = ['places', { ids: list.ids }];
		});
	}

	EmailSubscriber.count({ where: { group: 'weather-' + country, subscribed: true } }).then(count => { res.locals.totalSubscribers = count; next() }, next);
};

function dayMS(ms) {
	ms = ms.toString();
	return parseInt(ms.substr(0, ms.length - 8) + '00000000');
}
