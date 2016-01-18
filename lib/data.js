'use strict';

var data = require('ournet.data');
var places = require('ournet.data.places');
var weather = require('ournet.data.weather');

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
	forecast: weather.forecast
};
exports.news = require('./data/news_service');
