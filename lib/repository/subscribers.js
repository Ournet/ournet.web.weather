'use strict';

var logger = require('../logger');
var EmailSubscriber = require('../data').EmailSubscriber;

exports.totalSubscribers = function(locals) {
	var culture = locals.currentCulture;
	return EmailSubscriber.count({ where: { group: 'weather-' + culture.country } })
		.catch(function(error) {
			logger.error('EmailSubscriber error', error);
			return -1;
		});
};
