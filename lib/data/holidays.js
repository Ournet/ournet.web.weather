'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var ical = Promise.promisifyAll(require('ical'));
var cache = require('memory-cache');
var logger = require('../logger');
var moment = require('moment-timezone');
var COUNTRIES = { ro: 'romanian', ru: 'russian', bg: 'bulgarian', cz: 'czech', 'in': 'indian', it: 'italian', pl: 'polish', hu: 'hungarian' };

function isValidHoliday(holiday, culture) {
	if (culture.country === 'md' && holiday.date === '2016-03-07') {
		return false;
	}
	return true;
}

module.exports = function(culture, timezone) {
	var lang = culture.language;
	var country = culture.country;
	if (country === 'md') {
		lang = 'ro';
	}
	var key = 'holidays-' + country + '-' + lang;
	var result = cache.get(key);
	if (result) {
		return Promise.resolve(result);
	}

	var ttl = 1000 * 60 * 3;
	var url = 'https://calendar.google.com/calendar/ical/' + lang + '.' + (COUNTRIES[country] || country) + '%23holiday%40group.v.calendar.google.com/public/basic.ics';

	return ical.fromURLAsync(url, { timeout: 1000 * 2 })
		.then(function(data) {
			var maxDate = new Date();
			maxDate.setMonth(maxDate.getMonth() + 1);
			var minDate = new Date();
			minDate.setMonth(minDate.getMonth() - 1);

			data = data || {};
			result = {};
			var item;
			for (var prop in data) {
				item = data[prop];
				if (item.start < maxDate && item.start > minDate) {
					item = { date: item.start, name: item.summary };
					// console.log(item);
					item.date = moment.tz(item.date.getTime(), timezone); //.format('YYYY-MM-DD');
					item.date = utils.formatDate(item.date.toDate());
					// console.log(item);
					if (isValidHoliday(item, culture)) {
						result[item.date] = result[item.date] || [];
						result[item.date].push(item);
					}
				}
			}
			cache.put(key, result, ttl);
			return result;
		}, function(error) {
			logger.error('Error on get holidays', { url: url, info: error.message });
			cache.put(key, {}, 1000 * 30);
			return {};
		});
};
