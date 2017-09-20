'use strict';

const utils = require('ournet.utils');
const _ = require('lodash');
const Promise = require('bluebird');
const entipicUrl = require('entipic.url');
const crypto = require('crypto');
const logger = require('./logger');
const atonic = require('atonic');
const moment = require('moment-timezone');
const Isemail = require('isemail');
const Links = require('ournet.links');

exports.isemail = function (email) {
	return Isemail.validate(email);
};

exports.pressureTommHg = function (hpa) {
	return parseInt(hpa * 0.7500616827);
};

exports.windDirectionCss = function (code) {
	var s = code.length === 3 ? code.substring(1) : code;
	return 'wind-img wind-img-' + s;
};

exports.startWithUpperCase = function (name) {
	if (name) {
		return name.substr(0, 1).toUpperCase() + name.substr(1);
	}
	return name;
};

exports.endsWith = function (target, end) {
	if (!target || !end || target.length < end.length) {
		return false;
	}
	return target.substr(target.length - end.length) === end;
};

exports.md5 = function (value) {
	return crypto.createHash('md5').update(value).digest('hex');
};

exports.route_prefix = ':prefix(prognoza|pogoda|vremea|forecast|tempo|pocasi|elorejelzes|mot)';

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function (res, maxage) {
	// maxage = 0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
		//res.set('Expires', new Date(Date.now() + (maxage * 60 * 1000)).toUTCString());
	}
	res.set(CACHE_CONTROL, cache);
};

exports.maxageRedirect = function (res) {
	exports.maxage(res, 60 * 12);
};

exports.maxagePlaces = function (res) {
	exports.maxage(res, 60 * 12);
};

exports.maxagePlace = function (res) {
	exports.maxage(res, 60 * 4);
};

exports.maxageIndex = function (res) {
	// res.set(CACHE_CONTROL, 'private, max-age=' + (2 * 60 * 60));
	exports.maxage(res, 60 * 2);
};

exports.routePrefix = function (req, res, next, prefix) {
	var config = res.locals.config;
	if (config.prefix !== prefix) {
		logger.warn('Param :prefix is not correct: ' + prefix, {
			country: config.country
		});
		return res.redirect('/' + config.prefix + req.originalUrl.substr(prefix.length + 1));
	}
	next();
};

exports.entipicUrl = function (name, size, lang, country) {
	return entipicUrl(name, size, lang, country);
};

exports.isNullOrEmpty = function (data) {
	return utils.isNull(data) || data === '';
};

exports.getPlatform = function getPlatform() {
	var name = 'desktop';
	return name;
	// if (req.headers['cloudfront-is-mobile-viewer'] === 'true') {
	// 	name = 'mobile';
	// }
	// // name = 'mobile';
	// return name;
};

exports.getRenderName = function (req, name) {
	if (req.locals.site.platform === 'mobile') {
		name += '_mobile';
	}
	return name;
};

exports.randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

exports.canonical = function (country, url, project) {
	project = project || 'weather';
	const host = Links.getHost(project, country);
	const schema = Links.getSchema(project, country)
	// if (config.host !== host) {
	// 	throw new Error('Invalid links host: ' + host + '!=' + config.host);
	// }
	// console.log(schema, project, country, host);
	// country = country || config.country;
	return [schema, '//', host, url].join('');
}

module.exports = exports = _.assign({
	_: _,
	Promise: Promise,
	atonic: atonic,
	moment: moment
}, exports, utils);
