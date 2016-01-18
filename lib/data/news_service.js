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

	return new Promise(function(resolve, reject) {
		request('http://' + config.projects.news + '/json/weatherstories.json?ul=' + lang, function(error, response, body) {
			if (error) {
				return reject(error);
			}
			if (response.statusCode < 200 || response.statusCode > 399) {
				return reject(new Error('News response error: ' + response.statusCode));
			}
			if (!_.isString(body)) {
				return resolve([]);
			}
			try {
				body = JSON.parse(body);
			} catch (e) {
				return reject(e);
			}
			if (!Array.isArray(body)) {
				return resolve([]);
			}
			cache.put(key, body);
			resolve(body);
		});
	});
};
