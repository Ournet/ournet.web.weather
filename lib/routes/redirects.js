'use strict';

var express = require('express');
var data = require('../data');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

route.get('/favicon.ico', function(req, res) {
	var config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.favicon);
});

// old place: /ro/vremea/Ciosescu/686675
route.get('/' + [utils.route_prefix, ':country', ':name', ':id(\\d+)'].join('/'), function(req, res, next) {

	var id = parseInt(req.params.id);
	var links = res.locals.links;
	var lang = res.locals.currentCulture.language;

	data.places.access.instance.getOldId(id)
		.then(function(oldid) {
			if (!oldid) {
				return res.redirect(links.home({
					ul: lang
				}));
			}
			utils.maxageRedirect(res);
			res.redirect(301, links.weather.place(oldid.geonameid, {
				ul: lang
			}));
		}).catch(next);
});

route.get('/widget/WidgetScript', function(req, res, next) {
	var links = res.locals.links;
	data.places.cacheAccess.instance.getOldId(parseInt(req.query.id))
		.then(function(oldid) {
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
	data.places.cacheAccess.getOldId(parseInt(req.query.id))
		.then(function(oldid) {
			if (!oldid) {
				return res.send('');
			}
			req.query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetFrame(req.query));
		}).catch(next);
});

route.get('/widget2/WidgetFrame', function(req, res, next) {
	var links = res.locals.links;
	data.places.cacheAccess.getOldId(parseInt(req.query.id))
		.then(function(oldid) {
			if (!oldid) {
				return res.send('');
			}
			req.query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget2.widgetFrame(req.query));
		}).catch(next);
});

route.get('/:prefix2/:namepath/widgetframe', function(req, res, next) {
	var links = res.locals.links;
	data.places.cacheAccess.getOldId(parseInt(req.query.id))
		.then(function(oldid) {
			if (!oldid) {
				return res.send('');
			}
			req.query.id = oldid.geonameid;
			utils.maxageRedirect(res);
			return res.redirect(301, links.weather.widget.widgetFrame(req.query));
		}).catch(next);
});

route.get('/:namepath/widget', function(req, res) {
	var links = res.locals.links;
	utils.maxageRedirect(res);
	return res.redirect(301, links.weather.widget(req.query));
});
