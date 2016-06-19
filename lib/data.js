'use strict';

var data = require('ournet.data');
var places = require('ournet.data.places');
var weather = require('ournet.data.weather');
var logger = require('./logger');
var cachify = require('transparentcache');
var accessWeather = weather.AccessService.instance;
var accessPlaces = places.AccessService.instance;

weather.logger.set(logger);

exports.common = data;
exports.places = {
	access: accessPlaces,
	search: places.SearchService.instance,
	Place: places.Place
};
exports.weather = {
	access: accessWeather,
	util: weather.helpers,
	forecast: weather.forecast,
	helpers: weather.helpers
};
exports.news = require('./data/news_service');
exports.forecastImage = require('./data/forecast_image');
exports.holidays = require('./data/holidays');

// cachify places
//

cachify(accessPlaces, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 100 }),
	methods: { placesByTypeAdm1: [0, 1] }
});

cachify(accessPlaces, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 10 }),
	methods: { places: [0, 1] }
});

cachify(accessPlaces, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 100 }),
	methods: { place: [0, 1] }
});

// cachify weather
//

cachify(accessWeather, {
	cachingStrategy: new cachify.strategies.RingBuffer({ size: 100 }),
	methods: { getForecast: [0] }
});
