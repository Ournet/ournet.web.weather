'use strict';

var _ = require('../utils')._;

var config = {
	assets: require('./assets'),
	mainPlacesCount: 20,
	languagesNames: {
		ro: 'Română',
		ru: 'Русский',
		bg: 'Български'
	},
	monthFormat: 'D MMMM',
	favicon: 'https://assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
	international: {
		md: {
			it: 'Moldova',
			en: 'Moldova',
			ro: 'Moldova',
			ru: 'Молдова',
			bg: 'Молдова',
			cs: 'Moldavsko',
			hu: 'Moldova',
			pl: 'Mołdawia',
			sq: 'Moldavi',
			tr: 'Moldova'
		},
		ro: {
			it: 'Romania',
			en: 'Romania',
			ro: 'România',
			ru: 'Румыния',
			bg: 'Румъния',
			cs: 'Rumunsko',
			hu: 'Románia',
			pl: 'Rumunia',
			sq: 'Rumani',
			tr: 'Romanya'
		},
		ru: {
			it: 'Russia',
			en: 'Russia',
			ro: 'Rusia',
			ru: 'Россия',
			bg: 'Руска федерация',
			cs: 'Rusko',
			hu: 'Oroszországi Föderáció',
			pl: 'Rosja',
			sq: 'Rusi',
			tr: 'Rusya'
		},
		it: {
			it: 'Italia',
			en: 'Italy',
			ro: 'Italia',
			ru: 'Италия',
			bg: 'Италия',
			cs: 'Itálie',
			hu: 'Olaszország',
			pl: 'Włochy',
			sq: 'Itali',
			tr: 'İtalya'
		},
		bg: {
			it: 'Bulgaria',
			en: 'Bulgaria',
			ro: 'Bulgaria',
			ru: 'Болгария',
			cs: 'Bulharsko',
			hu: 'Bulgária',
			pl: 'Bułgaria',
			sq: 'Bulgari',
			tr: 'Bulgaristan'
		},
		hu: {
			it: 'Hungary',
			en: 'Hungary',
			ro: 'Ungaria',
			ru: 'Венгрия',
			bg: 'Унгария',
			cs: 'Maďarsko',
			pl: 'Węgry',
			sq: 'Hungari',
			tr: 'Macaristan'
		},
		cz: {
			it: 'Cehia',
			en: 'Czech Republic',
			ro: 'Cehia',
			ru: 'Чехия',
			bg: 'Чешка република',
			hu: 'Csehország',
			pl: 'Czechy',
			sq: 'Republika Çeke',
			tr: 'Çekya'
		},
		// pl: {
		// 	it: 'Poland',
		// 	en: 'Poland',
		// 	ro: 'Polonia',
		// 	ru: 'Польша',
		// 	bg: 'Полша',
		// 	cs: 'Polsko',
		// 	hu: 'Lengyelország',
		// 	sq: 'Poloni',
		// 	url: 'http://pogoda.diez.pl'
		// },
		'in': {
			it: 'India',
			en: 'India',
			ro: 'India',
			ru: 'Индия',
			bg: 'Индия',
			cs: 'Indie',
			hu: 'India',
			pl: 'Indie',
			sq: 'Indi',
			tr: 'Hindistan'
		},
		al: {
			it: 'Albania',
			en: 'Albania',
			ro: 'Albania',
			ru: 'Албания',
			bg: 'Албания',
			cs: 'Albánie',
			hu: 'Albánia',
			pl: 'Albania',
			sq: 'Shqipëri',
			tr: 'Albanya'
		},
		tr: {
			it: 'Turchia',
			en: 'Turkey',
			ro: 'Turcia',
			ru: 'Турция',
			bg: 'Турция',
			cs: 'Turecko',
			hu: 'Törökország',
			pl: 'Turcja',
			sq: 'Turqia',
			tr: 'Türkiye'
		}
	},
	// fbId: '708512399207216',
	protocol: 'http:',

	getFavicon: function(filename) {
		filename = filename || 'favicon.ico';

		var name = this.domain.split('.')[0];
		name = ['click', 'zborg', 'diez'].indexOf(name) > -1 ? name : 'ournet';

		return 'https://assets.ournetcdn.net/ournet/img/icons/' + name + '/' + filename;
	},
	getAppleFavicon: function() {
		return this.getFavicon('apple-touch-icon.png');
	}
};

var data = {};

module.exports = function(country) {
	if (!country) {
		throw new Error('Loading config for NO country');
	}
	if (!data[country]) {
		data[country] = _.assign({}, config, require('./' + country));
	}

	return data[country];
};
