'use strict';

const utils = require('../utils');
const EmailSubscriber = require('../data/email_subscriber');
const request = require('request');
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
	const oneDaySec = 60 * 60 * 24;

	res.viewdata.mainPlaces = ['places', { ids: config.mainPlaces }];
	res.viewdata.holidays = ['holidays', { country: country, lang: language, start: currentDate.valueOf() - oneDaySec, end: currentDate.valueOf() + oneDaySec * 10 }];
	res.viewdata.capitalCity = ['placeCurrentForecast', { placeId: config.capitalId }];
	if (config.projects.exchange) {
		const rateKeys = [];

		for (var i = 0; i < 2; i++) {
			rateKeys.push([country, date, config.exchange.currencies[i], config.exchange.source].join('').toUpperCase());
		}

		res.viewdata.mainExchangeRates = ['mainExchangeRates', { keys: rateKeys }];
		res.viewdata.mainExchangeSource = ['exchangeSource', { country: country, sourceId: config.exchange.source }];
	}

	utils.Promise.props({
		totalSubscribers: EmailSubscriber.count({ where: { group: 'weather-' + country, subscribed: true } }),
		headCss: getHeadCss(config)
	}).then(props => {
		res.locals.totalSubscribers = props.totalSubscribers;
		res.locals.site.head.headCss = props.headCss;
		next();
	}, next);
};

let headCss;

function getHeadCss(config) {
	if (headCss) {
		return utils.Promise.resolve(headCss);
	}
	return new utils.Promise((resolve, reject) => {
		const url = 'http://' + (process.env.NODE_ENV === 'production' ? ('assets.ournetcdn.net/ournet/css/weather/main-head-' + config.assets.css.mainHead + '.min.css') : 'localhost:8044/css/weather/main-head.css');
		request({ url: url, gzip: true, timeout: 1000 * 3 }, (error, response, body) => {
			if (error) {
				return reject(error);
			}
			headCss = body;
			resolve(body);
		});
	});
}