'use strict';

var express = require('express');
var Data = require('../data');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var url = require('url');
var logger = require('../logger');

route.get('/favicon.ico', function(req, res) {
	var config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.getFavicon());
});

route.get('/apple-touch-icon.png', function(req, res) {
	var config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.getAppleFavicon());
});

// /vremea/places -> /places
route.get('/:prefix/places', function(req, res) {
	const links = res.locals.links;
	const lang = res.locals.currentCulture.language;

	utils.maxageRedirect(res);

	res.redirect(301, links.weather.places({
		ul: lang
	}));
});

// /vremea/places/23 -> /places/23
route.get('/:prefix/places/:adm1', function(req, res) {
	const links = res.locals.links;
	const lang = res.locals.currentCulture.language;

	utils.maxageRedirect(res);

	res.redirect(301, links.weather.places.byAdm1(req.params.adm1, {
		ul: lang
	}));
});

// /vremea/12133 -> /12133
route.get('/:prefix/:id(\\d+)', function(req, res) {
	const links = res.locals.links;
	const lang = res.locals.currentCulture.language;

	utils.maxageRedirect(res);

	res.redirect(301, links.weather.place(req.params.id, {
		ul: lang
	}));
});

// old place: /vremea/ro/Ciosescu/686675
route.get('/' + [utils.route_prefix, ':country', ':name', ':id(\\d+)'].join('/'), function(req, res, next) {

	const id = parseInt(req.params.id);
	const links = res.locals.links;
	const lang = res.locals.currentCulture.language;

	Data.get({
			oldid: ['placeoldid', { id: id }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.redirect(links.weather.home({
					ul: lang
				}));
			}
			utils.maxageRedirect(res);
			res.redirect(301, links.weather.place(oldid.geonameid, {
				ul: lang
			}));
		}, next);
});

route.get('/widget/WidgetScript', function(req, res, next) {
	const links = res.locals.links;

	if (!req.query.id) {
		logger.error('Invalid widgetframe params', {
			url: req.originalUrl
		});
		return res.send('Invalid params!');
	}

	const id = parseInt(req.query.id);

	Data.get({
			oldid: ['placeoldid', { id: id }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.send('');
			}
			req.query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetScript(req.query));
		}).catch(next);
});

route.get('/widget/WidgetFrame', function(req, res, next) {
	var links = res.locals.links;
	var id = req.query.id;
	var query = req.query;

	if (!id) {
		var u = req.originalUrl.replace(/&amp;/g, '&');
		u = url.parse(u, true);
		query = u.query;
	}
	if (!query.id) {
		logger.error('Invalid widgetframe params', {
			url: req.originalUrl
		});
		return res.send('Invalid params!');
	}

	Data.get({
			oldid: ['placeoldid', { id: parseInt(query.id) }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.send('');
			}
			query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetFrame(query));
		}).catch(next);
});

route.get('/widget2/WidgetFrame', function(req, res, next) {
	var links = res.locals.links;
	var id = req.query.id;
	var query = req.query;

	if (!id) {
		var u = req.originalUrl.replace(/&amp;/g, '&');
		u = url.parse(u, true);
		query = u.query;
	}

	if (!query.id) {
		logger.error('Invalid widgetframe params', {
			url: req.originalUrl
		});
		return res.send('Invalid params!');
	}

	Data.get({
			oldid: ['placeoldid', { id: parseInt(query.id) }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.send('');
			}
			query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget2.widgetFrame(query));
		}).catch(next);
});

route.get('/:prefix2/:namepath/widgetframe', function(req, res, next) {
	var links = res.locals.links;
	var id = req.query.id;
	var query = req.query;

	if (!id) {
		var u = req.originalUrl.replace(/&amp;/g, '&');
		u = url.parse(u, true);
		query = u.query;
	}

	if (!query.id) {
		logger.error('Invalid widgetframe params', {
			url: req.originalUrl,
			ref: req.get('referrer')
		});
		return res.send('Invalid params!');
	}

	Data.get({
			oldid: ['placeoldid', { id: parseInt(query.id) }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.send('');
			}
			query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetFrame(query));
		})
		.catch(next);
});

route.get('/:namepath/widget', function(req, res) {
	var links = res.locals.links;
	utils.maxageRedirect(res);
	return res.redirect(301, links.weather.widget(req.query));
});

route.get('/resources/widgetframe', function(req, res, next) {
	var links = res.locals.links;
	var id = req.query.id;
	var query = req.query;

	if (!id) {
		var u = req.originalUrl.replace(/&amp;/g, '&');
		u = url.parse(u, true);
		query = u.query;
	}
	if (!query.id) {
		logger.error('Invalid widgetframe params', {
			url: req.originalUrl
		});
		return res.send('Invalid params!');
	}
	Data.get({
			oldid: ['placeoldid', { id: parseInt(query.id) }]
		})
		.then(function(result) {
			const oldid = result.oldid;
			if (!oldid) {
				return res.send('');
			}
			query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetFrame(query));
		})
		.catch(next);
});
