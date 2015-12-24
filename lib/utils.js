'use strict';

var core = require('ournet.core');
var entipicUrl = require('entipic.url');

exports.windDirectionCss = function(code) {
	var s = code.length == 3 ? code.substring(1) : code;
	return "wind-img wind-img-" + s;
};

exports.route_prefix = ':prefix(prognoza|pogoda|vremea|forecast|tempo|pocasi|elorejelzes|mot)';

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function(res, maxage) {
	//maxage=0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
		//res.set('Expires', new Date(Date.now() + (maxage * 60 * 1000)).toUTCString());
	}
	res.set(CACHE_CONTROL, cache);
};

exports.maxageRedirect = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxagePlaces = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxagePlace = function(res) {
	exports.maxage(res, 60 * 4);
};

exports.maxageIndex = function(res) {
	exports.maxage(res, 60 * 2);
};

exports.routePrefix = function(req, res, next, prefix) {
	var config = res.locals.config;
	if (config.prefix != prefix) {
		core.logger.warn('Param :prefix is not correct: ' + prefix, {
			country: config.country
		});
		return res.redirect('/' + config.prefix + req.originalUrl.substr(prefix.length + 1));
	}
	next();
}

exports.entipicUrl = function(name, size, lang, country) {
	return entipicUrl(name, size, lang, country);
};

exports.getPlatform = function getPlatform(req) {
	var name = 'desktop';
	// if (req.headers['cloudfront-is-mobile-viewer'] === 'true') {
	// 	name = 'mobile';
	// }
	return name;
};

exports.getRenderName = function(req, name) {
	if (req.locals.site.platform === 'mobile') {
		name += '-mobile';
	}
	return name;
}
