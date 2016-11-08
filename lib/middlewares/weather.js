'use strict';

var utils = require('../utils');
// var _ = utils._;
var latestPlaces = require('../latest_places');

module.exports = function(req, res, next) {
	var config = res.locals.config;
	var language = res.locals.currentCulture.language;

	res.locals.location = [{
		href: res.locals.links.home({
			ul: language
		}),
		text: res.locals.__('home')
	}];

	utils.maxage(res, 60 * 4);

	res.locals.latestPlaces = latestPlaces.get(config.country);

	res.viewdata.set({
		exchangeWidget: !!config.projects.exchange,
		weatherWidget: true,
		holidays: true,
		mainPlaces: {
			source: 'places',
			params: {
				keys: config.mainPlaces,
				options: {
					getRegion: true,
					sort: true
				}
			}
		},
		totalSubscribers: true
	});

	next();
};
