'use strict';

var internal = {};
var util = require('util');
var moment = require('moment-timezone');
var utils = require('../utils');
var Promise = utils.Promise;
var _ = utils._;
var Data = require('../data');

exports.format = function(config, query, links, __, lang) {
	var url = links.weather.place(query.id, {
			utm_campaign: 'widget',
			utm_source: 'widget',
			utm_medium: 'iframe',
			ul: query.ul || config.language
		}),
		id = parseInt(query.id);

	url = url.replace(/&/g, '&amp;');

	query.days = parseInt(query.days);
	query.w = parseInt(query.w);

	return internal.getData(id)
		.then(function(data) {
			var placename = Data.places.Place.getName(data.place, lang),
				longtitle = util.format(__('weather_in_format'), placename),
				title = longtitle;

			if (query.w < 190) {
				title = placename;
			}

			var name = '<a target="_blank" onclick="ga(\'send\', \'event\', \'weather-widget\', \'click-header\', \'id-' + query.id + '\', 1);" style="color:#' + query.htcolor + ';" href="' + url + '" title="' + longtitle + '">' + title + '</a>';

			var body = '';

			for (var i = 0; i < query.days && i < data.weather.days.length; i++) {
				var day = data.weather.days[i],
					time = day.times[parseInt(day.times.length / 2)],
					symbolName = Data.weather.symbolName(time.symbol, lang),
					temperature = time.t.value + '&deg;';
				day.date = moment(new Date(day.date)).locale(lang);

				if (day.times.length > 1) {
					var maxtime = _.maxBy(day.times, 't.value');
					var mintime = _.minBy(day.times, 't.value');
					//console.log(maxtime);
					temperature = maxtime.t.value + '&deg; | ' + mintime.t.value + '&deg;';
				}

				//console.log(time);

				var line = '<div class="line"><table width="100%" border="0" cellspacing="0"><tr><td class="day"><div class="name">' + day.date.format('dd') + '</div><div class="date">' + day.date.format('D MMM') + '</div></td><td class="icon"><span class="w-icon wi' + time.symbol.number + '" title="' + symbolName + '"></span></td><td class="details"><div class="temp">' + temperature + '</div><div class="name" title="' + symbolName + '">' + symbolName + '</div></td></tr></table></div>';
				body += line;
			}

			var headstyle = 'border:1px solid #' + query.bcolor + ';background:#' + query.hbkcolor;
			var bodystyle = 'cursor:pointer;border:1px solid #' + query.bcolor + ';border-top:0px;background:#' + query.bkcolor;

			return util.format(internal.structure, headstyle, name, url, id, bodystyle, body);
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
