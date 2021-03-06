'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:1*/
var route = module.exports = express.Router();
var util = require('util');
var widgetData = require('../widgets/widget2');
var Data = require('../data');


route.get('/widget2', function (req, res, next) {
	var config = res.locals.config;
	var __ = res.locals.__,
		currentCulture = res.locals.currentCulture,
		links = res.locals.links;

	res.locals.site.pageLayoutCss = 'form-layout';
	res.locals.site.head.title = util.format('%s - %s', __('weather_on_your_site'), config.name);
	res.locals.site.head.description = util.format(__('weather_on_your_site_info'), Data.places.Place.inCountryName(currentCulture.countryName, currentCulture.language));

	res.locals.site.head.canonical = utils.canonical(currentCulture.country, links.weather.widget2({
		ul: currentCulture.language
	}));

	const viewdata = res.viewdata;

	viewdata.place = ['placeForecast', { placeId: config.capitalId }];

	Data.get(viewdata)
		.then(function (result) {
			res.render('widget2/' + utils.getRenderName(res, 'index'), result);
		}, next);

});

route.get('/widget2/widget_html_script', function (req, res) {
	var config = res.locals.config;
	const currentCulture=res.locals.currentCulture;
	var links = res.locals.links;
	req.query.days = parseInt(req.query.days);
	var formatter = widgetData.formatter(req.query);
	const scripttype = req.query.scripttype;

	delete req.query.cn;
	delete req.query.scripttype;

	let script;

	if (scripttype === 'iframe') {
		const data = ['<!-- ' + config.name + ' Weather Widget -->'];
		data.push('<iframe src="' + utils.canonical(currentCulture.country, links.weather.widget2.widgetFrame(req.query)) + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + formatter.iframeHeight + 'px;width:' + req.query.w + 'px;" allowTransparency="true"></iframe>');
		data.push('<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>');
		script = data.join('\n');
	} else {
		var params = [];
		for (var prop in req.query) {
			if (!utils.isNullOrEmpty(req.query[prop])) {
				params.push(prop + '=' + req.query[prop]);
			}
		}

		params = params.join(';');

		script = ['<!-- ' + config.name + ' Weather Widget -->',
		'<ins class="ournetweather" style="display:block;max-width:' + req.query.w + 'px;height:' + formatter.iframeHeight + 'px" data-cn="' + config.country + '" data-params="' + params + '" data-h="' + formatter.iframeHeight + '"></ins>',
		'<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>',
			'<script>(ournetweather=window.ournetweather||[]).push({})</script>',
			'<script async src="//assets.ournetcdn.net/ournet/js/weather/widget-ins.js"></script>'
		].join('\n');
	}
	res.send(script);
});

route.get('/widget2/widget_frame', function (req, res, next) {
	var config = res.locals.config;
	var links = res.locals.links;
	var formatter = widgetData.formatter(req.query);

	widgetData.format(config, formatter, req.query, links, res.locals.__, res.locals.currentCulture.language)
		.then(function (data) {
			res.render('widget2/frame', {
				widget: data.html,
				formatter: formatter,
				place: data.place,
				query: req.query
			});
		}).catch(next);
});
