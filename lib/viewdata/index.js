'use strict';

var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;

var NAMES = ['common', 'places', 'weather'];
var MAP = {};

function loadModules() {
	NAMES.forEach(function(name) {
		var m = require('./' + name);
		for (var prop in m) {
			if (MAP[prop]) {
				throw new Error('Property `' + prop + '` already exists!');
			}
			MAP[prop] = m;
		}
	});
}

loadModules();

function loadViewdataProperty(locals, name, options) {
	var source = MAP[name];
	return source[name](locals, options);
}

function formatSegmentResult(data, required) {
	var result = {
		results: data,
		ok: true
	};
	for (var prop in required) {
		if (~[undefined, null].indexOf(data[prop])) {
			result.ok = false;
			break;
		}
	}
	return result;
}

function loadViewdataSegment(locals, segment) {
	var props = {};
	var options;
	var item;
	var required = {};
	var name;

	if (typeof segment === 'string') {
		props[segment] = loadViewdataProperty(locals, segment);
	} else {
		for (var prop in segment) {
			item = segment[prop];
			if (item !== false) {
				name = item.name || prop;
				options = item.options;
				if (typeof options === 'function') {
					options = options(locals);
				}
				if (item.required) {
					required[name] = true;
				}
				props[name] = loadViewdataProperty(locals, prop, options);
			}
		}
	}

	return Promise.props(props)
		.then(function(result) {
			_.assign(locals, result);
			return formatSegmentResult(result, required);
		});
}

module.exports = function loadViewdata(segments, req, res) {
	segments = Array.isArray(segments) ? segments : [segments];
	var stopped = false;

	return Promise.mapSeries(segments, function(segment) {
		if (!stopped) {
			return loadViewdataSegment(res.locals, segment)
				.then(function(segmentResult) {
					stopped = !segmentResult.ok;
					return segmentResult.results;
				});
		}
	}).then(function(results) {
		return _.assign.apply(null, results);
	});
};
