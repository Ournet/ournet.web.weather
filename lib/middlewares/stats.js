'use strict';

var logger = require('../logger');

function getDate(per) {
	if (per === 'minute') {
		return parseInt(Date.now() / (1000 * 60));
	} else if (per === 'hour') {
		return parseInt(Date.now() / (1000 * 60 * 60));
	}
	throw new Error('Invalid per');
}

function Stats(per) {
	this.per = per;
	this.hits = 0;
	this.date = getDate(per);
}

Stats.prototype.hit = function(config) {
	var per = this.per;
	var currentDate = getDate(per);
	var date = this.date;
	var hits = this.hits;

	if (currentDate !== date) {
		if (hits > 0) {
			logger.warn('Stats per ' + per, {
				type: 'stats',
				hits: hits,
				date: date,
				country: config.country,
				host: config.host
			});
		}
		this.hits = 0;
		this.date = currentDate;
	}

	this.hits++;
};

var statsPerMinute = new Stats('minute');
var statsPerHour = new Stats('hour');

module.exports = function(req, res, next) {

	var config = res.locals.config;

	statsPerMinute.hit(config);
	statsPerHour.hit(config);

	next();
};
