'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var widgetData = require('../widgets/widget1');
var Data = require('../data');


route.get('/widget', function (req, res, next) {
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

	const viewdata = res.viewdata;

	viewdata.place = ['placeForecast', { placeId: config.capitalId }];

	Data.get(viewdata)
		.then(function (result) {
			res.render('widget/' + utils.getRenderName(res, 'index'), result);
		}, next);

});

route.get('/widget/widget_html_script', function (req, res) {
	const config = res.locals.config;
	const links = res.locals.links;
	const days = req.query.days && parseInt(req.query.days) || 5,
		height = 29 + days * 42 + days - 1,
		width = req.query.w;
	const scripttype = req.query.scripttype;

	delete req.query.scripttype;

	const data = ['<!-- ' + config.name + ' Weather Widget -->'];

	if (scripttype === 'iframe') {
		data.push('<iframe src="' + res.locals.util.canonical(links.weather.widget.widgetFrame(req.query)) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + height + 'px;width:' + width + 'px;" allowTransparency="true"></iframe>');
		data.push('<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>');
	} else {

		let params = [];

		// req.query.height = height;

		for (var prop in req.query) {
			if (!utils.isNullOrEmpty(req.query[prop])) {
				params.push(prop + '=' + req.query[prop]);
			}
		}

		params = params.join(';');

		data.push('<ins class="ournetweather" style="display:block;max-width:' + width + 'px;height:' + height + 'px" data-type="widget" data-cn="' + config.country + '" data-params="' + params + '" data-h="' + height + '"></ins>');
		data.push('<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>');
		data.push('<script>(ournetweather=window.ournetweather||[]).push({})</script>');
		data.push('<script async src="//assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>');
	}

	res.send(data.join('\n'));
});

route.get('/widget/widget_frame', function (req, res, next) {
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
		.then(function (data) {
			res.render('widget/frame', {
				widget: data,
				query: req.query
			});
		}).catch(next);
});
