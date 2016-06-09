'use strict';

var data = require('ournet.data');
var places = require('ournet.data.places');
var weather = require('ournet.data.weather');
var logger = require('./logger');

weather.logger.set(logger);

exports.common = data;
exports.places = {
	access: places.AccessService.instance,
	cacheAccess: places.CacheAccessService.instance,
	search: places.SearchService.instance,
	util: places.helpers
};
exports.weather = {
	access: weather.AccessService.instance,
	cacheAccess: weather.CacheAccessService.instance,
	util: weather.helpers,
	forecast: weather.forecast,
	helpers: weather.helpers
};
exports.news = require('./data/news_service');
exports.forecastImage = require('./data/forecast_image');
exports.holidays = require('./data/holidays');
