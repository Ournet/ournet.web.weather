'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var widgetData = require('../data/widget');
var Data = require('../data');


route.get('/widget', function(req, res, next) {
	var config = res.locals.config;
	var __ = res.locals.__,
		currentCulture = res.locals.currentCulture,
		links = res.locals.links;

	res.locals.site.pageLayoutCss = 'form-layout';
	res.locals.site.head.title = util.format('%s - %s', __('weather_on_your_site'), config.name);
	res.locals.site.head.description = util.format(__('weather_on_your_site_info'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));

	res.locals.site.head.canonical = 'http://' + config.host + links.weather.widget({
		ul: currentCulture.language
	});

	Data.places.access.place(config.capitalId, { getRegion: true })
		.then(function(place) {
			res.render('widget/' + utils.getRenderName(res, 'index'), {
				place: place
			});
		}, next);

});

route.get('/widget/widget_html_script', function(req, res) {
	var config = res.locals.config;
	var days = req.query.days && parseInt(req.query.days) || 5,
		height = 29 + days * 42 + days - 1,
		width = req.query.w;

	var params = [];

	// req.query.height = height;

	for (var prop in req.query) {
		if (!utils.isNullOrEmpty(req.query[prop])) {
			params.push(prop + '=' + req.query[prop]);
		}
	}

	params = params.join(';');

	var data = ['<!-- ' + config.name + ' Weather Widget -->',
		'<ins class="ournetweather" style="display:block;max-width:' + width + 'px;height:' + height + 'px" data-type="widget" data-cn="' + config.country + '" data-params="' + params + '" data-h="' + height + '"></ins>',
		'<noscript><p><a href="http://' + config.host + '">' + config.name + '</a></p></noscript>',
		'<script>(ournetweather=window.ournetweather||[]).push({})</script>',
		'<script async src="http://assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>'
	].join('\n');

	res.send(data);
});

route.get('/widget/widget_frame', function(req, res, next) {
	var links = res.locals.links;
	var config = res.locals.config;

	req.query.bcolor = req.query.bcolor || 'CA0000';
	req.query.bkcolor = req.query.bkcolor || 'FFF';
	req.query.hbkcolor = req.query.hbkcolor || 'CA0000';
	req.query.htcolor = req.query.htcolor || 'FFF';
	req.query.lcolor = req.query.lcolor || 'DDD';

	// var days = parseInt(req.query.days);
	// var height = 29 + days * 42 + days - 1;
	widgetData.format(config, req.query, links, res.locals.__, res.locals.currentCulture.language)
		.then(function(data) {
			res.render('widget/frame', {
				widget: data,
				query: req.query
			});
		}).catch(next);
});
