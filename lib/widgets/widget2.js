'use strict';

var internal = {};
var util = require('util');
var moment = require('moment-timezone');
var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var Data = require('../data');
var chroma = require('chroma-js');

exports.formatter = function(query) {
	query.days = parseInt(query.days);
	query.header = query.header && query.header.toLowerCase() === 'true';

	query.pos = query.pos && query.pos.toLowerCase();

	query.w = Array.isArray(query.w) ? parseInt(query.w[0]) : parseInt(query.w);

	var data = {
		HeaderHeight: 40,
		ItemMarginBottom: 3,
		BodyPaddingTop: 5,
		BodyPaddingBottom: 6,
		itemHeight: query.pos === 'h' ? 58 : 178,
		showInfo: query.pos === 'v' || query.w > 250,

		format: function() {
			var self = this;
			var color = chroma(query.color);
			var colorDark = color.darken(10).hex();
			var colorDarker = color.darken(20).hex();
			var colorLight = color.brighten(10).hex();
			var colorLighter = color.brighten(16).hex();
			var textColor = color.darken(22).brighten(90).hex();
			var itemColor = colorDark;
			var itemColorDark = colorDarker;
			var itemColorLighter = colorLighter;
			var itemColorLight = colorLight;
			if (!utils.isNullOrEmpty(query.textcolor)) {
				textColor = '#' + query.textcolor;
			}
			if (!utils.isNullOrEmpty(query.itemcolor)) {
				var ic = chroma(query.itemcolor);
				itemColor = ic.hex();
				itemColorDark = ic.darken(10).hex();
				itemColorLighter = ic.brighten(16).hex();
			}

			self.itemBorderColor = itemColorLighter;

			var showInfo = query.pos === 'v' || query.w > 250;

			var dateWidth = showInfo ? '20%' : '30%';
			var imageWidth = showInfo ? '20%' : '30%';
			var tempWidth = showInfo ? '25%' : '40%';
			var infoWidth = showInfo ? '35%' : '30%';
			if (query.pos === 'v') {
				dateWidth = '22%';
				imageWidth = '30%';
				tempWidth = '23%';
				infoWidth = '25%';
			}

			self.textColor = textColor;
			self.itemColor = itemColor;
			self.itemColorDark = itemColorDark;
			self.itemColorLighter = itemColorLighter;
			self.itemColorLight = itemColorLight;

			self.dateWidth = dateWidth;
			self.imageWidth = imageWidth;
			self.tempWidth = tempWidth;
			self.infoWidth = infoWidth;
		}
	};

	if (query.pos === 'h') {
		data.iframeHeight = ((query.header ? data.HeaderHeight + 1 : 0) + query.days * (data.itemHeight) + query.days - 1 +
			(query.days - 1) * data.ItemMarginBottom +
			data.BodyPaddingBottom + data.BodyPaddingTop);
	} else {
		data.iframeHeight = ((query.header ? data.HeaderHeight + 1 : 0) + (data.itemHeight) + query.days - 1 + data.BodyPaddingBottom + data.BodyPaddingTop);
	}

	return data;
};

exports.format = function(config, formatter, query, links, __, lang) {
	formatter.format();
	var url = links.weather.place(query.id, {
			utm_campaign: 'widget',
			utm_source: 'widget2',
			utm_medium: 'iframe',
			ul: query.ul || config.language
		}),
		id = parseInt(query.id);

	url = url.replace(/&/g, '&amp;');

	query.days = parseInt(query.days);
	query.w = parseInt(query.w);

	return internal.getData(id)
		.then(function(data) {
			var placename = Data.places.Place.getName(data.place, lang);
			var longtitle = util.format(__('weather_in_format'), Data.places.Place.inPlaceName(data.place, lang));
			var title = longtitle;

			if (query.w < 300) {
				title = placename;
			}

			var body = ['<div id="widget" class="position-' + query.pos + '">'];

			if (query.header) {
				body.push('<div id="header"><div class="inner">');
				body.push('<a href="' + url + '" target="_blank" title="' + title + '" onclick="ga(\'send\', \'event\', \'weather-widget2\', \'click-header\', \'id-' + query.id + '\', 1);">');
				body.push('<span class="caret"></span><span class="title">' + title + '</span>');
				body.push('</a></div></div>');
			}

			body.push('<div id="body"><ul class="table">');

			for (var i = 0; i < query.days && i < data.weather.days.length; i++) {
				var day = data.weather.days[i];
				var maxtime = day.times[0];
				var mintime = day.times[0];
				var time = day.times[parseInt((day.times.length - 1) / 2)];
				var symbolName = Data.weather.symbolName(time.symbol, lang);
				day.date = moment(new Date(day.date)).locale(lang);

				if (day.times.length > 1) {
					maxtime = _.maxBy(day.times, 't.value');
					mintime = _.min(day.times, 't.value');
				}
				// console.log(maxtime, mintime, day.times.length);

				body.push('<li class="item" onclick="window.open(\'' + url + '\', \'_blank\');ga(\'send\', \'event\', \'weather-widget2\', \'click-item\', \'id-' + query.id + '\', 1);">');
				body.push('<ul class="in-table"><li class="date"><div class="inner"><span class="day-name">' + day.date.format('ddd') + '</span><span class="day-date">' + day.date.format('D MMM') + '</span></div></li>');
				body.push('<li class="image"><div class="inner"><span title="' + symbolName + '" style="background-image: url(\'http://assets.ournetcdn.net/root/img/icons/weather/48/' + time.symbol.number + '.png\')"></span></div></li>');
				body.push('<li class="temp"><div class="inner"><div class="max">' + __('max') + ' ' + maxtime.t.value + '&deg;</div><div class="min">' + __('min') + ' ' + mintime.t.value + '&deg;</div></div></li>');
				if (formatter.showInfo) {
					body.push('<li class="info"><div class="inner">' + symbolName + '</div></li>');
				}
				body.push('</ul></li>');
			}
			body.push('</ul></div></div>');

			body = body.join('');

			return {
				html: body,
				place: data.place
			};
		});

};

internal.getData = function(id) {
	return Data.get({
			place: ['placeForecast', { placeId: id }]
		})
		.then(function(data) {
			const place = data.place;

			if (!place) {
				return Promise.reject(new Error('Not found place: ' + id));
			}

			if (!place.forecast || !place.forecast.days) {
				return Promise.reject(new Error('No weather report: ' + id));
			}
			return {
				place: place,
				weather: place.forecast
			};
		});
};


internal.structure = '<div id="widget"><div class="head" style="%s">%s</div><div onclick="window.open(\'%s\', \'_blank\');ga(\'send\', \'event\', \'weather-widget\', \'click-item\', \'id-%s\', 1);" class="body" style="%s">%s</div></div>';
