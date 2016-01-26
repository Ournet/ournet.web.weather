'use strict';

var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var request = require('request');
var cache = require('memory-cache');


exports.stories = function(config, lang) {
	lang = lang || config.language;
	var key = 'stories-' + config.country + '-' + lang;
	var result = cache.get(key);
	if (result) {
		return Promise.resolve(result);
	}

	var ttl = 1000 * 60 * 3;

	return new Promise(function(resolve, reject) {
		request({
			url: 'http://' + config.projects.news + '/json/weatherstories.json?ul=' + lang,
			json: true
		}, function(error, response, body) {
			if (error) {
				return reject(error);
			}
			if (response.statusCode < 200 || response.statusCode > 399) {
				return reject(new Error('News response error: ' + response.statusCode));
			}
			if (!Array.isArray(body)) {
				body = [];
			}
			cache.put(key, body, ttl);
			resolve(body);
		});
	});
};
