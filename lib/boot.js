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
	'www.moti2.al': 'al',
	'hava.one': 'tr'
};

function getCountry(req) {
	return hosts[req.hostname] || process.env.COUNTRY;
}

const links = {};

function getLinks(language) {
	if (!links[language]) {
		links[language] = Links.sitemap(language);
	}
	return links[language];
}

module.exports = function (req, res, next) {
	var country = getCountry(req);
	if (!country) {
		return next(new Error('Invalid hostname', {
			hostname: req.hostname
		}));
	}
	var conf = config(country);
	res.locals.config = conf;
	res.locals.links = getLinks(conf.language);
	next();
};
