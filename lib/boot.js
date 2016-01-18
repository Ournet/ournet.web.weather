'use strict';

var config = require('./config');
var urlset = require('urlset');
var path = require('path');

var hosts = {
	'meteo.click.md': 'md',
	'meteo.ournet.ro': 'ro',
	'pogoda.zborg.ru': 'ru',
	'vremeto.ournet.bg': 'bg',
	'idojaras.ournet.hu': 'hu',
	'pogoda.diez.pl': 'pl',
	'weather.ournet.in': 'in',
	'pocasi.ournet.cz': 'cz',
	'meteo.ournet.it': 'it',
	'www.moti2.al': 'al'
};

function getCountry(req) {
	return hosts[req.hostname] || process.env.COUNTRY;
}

var links = {};

function getLinks(country, language) {
	if (!links[country]) {
		var l = new urlset.Provider({
			params: []
		});
		l.load(path.join(__dirname, 'sitemap', country + '.json'));
		l.setParam({
			name: 'ul',
			value: language,
			type: 'q'
		});
		links[country] = l.url;
	}
	return links[country];
}

module.exports = function(req, res, next) {
	if (req.hostname === 'moti2.al') {
		return res.redirect(301, 'http://www.moti2.al').end();
	}
	var country = getCountry(req);
	if (!country) {
		return next(new Error('Invalid hostname', {
			hostname: req.hostname
		}));
	}
	var conf = config(country);
	res.locals.config = conf;
	res.locals.links = getLinks(conf.country, conf.language);
	next();
};
