'use strict';

const config = require('./config');
const Links = require('ournet.links');

const hosts = {
	'meteo.click.md': 'md',
	'meteo.ournet.ro': 'ro',
	'pogoda.zborg.ru': 'ru',
	'vremeto.ournet.bg': 'bg',
	'idojaras.ournet.hu': 'hu',
	// 'pogoda.diez.pl': 'pl',
	'weather.ournet.in': 'in',
	'pocasi.ournet.cz': 'cz',
	'meteo.ournet.it': 'it',
	'www.moti2.al': 'al'
};

function getCountry(req) {
	return hosts[req.hostname] || process.env.COUNTRY;
}

const links = {};

function getLinks(country, language) {
	if (!links[country]) {
		links[country] = Links.country(country, language);
	}
	return links[country];
}

module.exports = function(req, res, next) {
	if (req.hostname === 'moti2.al') {
		return res.redirect(301, 'http://www.moti2.al');
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
