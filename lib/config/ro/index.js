'use strict';

module.exports = {
	prefix: 'vremea',
	name: 'Ournet.ro',
	language: 'ro',
	languages: ['ro'],
	country: 'ro',
	timezone: 'Europe/Bucharest',
	domain: 'ournet.ro',
	host: 'meteo.ournet.ro',
	hour_format: 'HH:mm',
	email: 'info@ournet.ro',
	googleAnalyticsId: 'UA-1490399-11',
	favicon: '//assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
	placesCount: 18000,
	widgetGoogleAnalyticsId: 'UA-1490399-48',
	projects: {
		news: 'news.ournet.ro',
		weather: 'meteo.ournet.ro',
		//opinia: 'opinia.ournet.ro',
		exchange: 'curs.ournet.ro',
		horoscope: 'horoscop.ournet.ro'
	},
	shareDataServices: ['facebook', 'plusone', 'twitter'],
	socialPluginsHtmlCode: '<iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetro%2F156976714343293&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
	internationalIds: ['md', 'cz', 'it', 'bg', 'hu', 'ru', 'pl', 'al', 'in', 'tr'],
	mainPlaces: [665004, 665087, 665850, 667268, 667873, 668872, 670474, 670609, 671768, 677697, 680332, 680963, 681290, 683123, 683506, 683844, 683902, 684039, 685826, 685948, 686254],
	capitalId: 683506,
	fbId: '120256281349646',
	exchange: {
		currency: 'RON',
		currencies: ['EUR', 'USD', 'GBP', 'CHF', 'RUB', 'MDL', 'UAH', 'CAD', 'RSD', 'AUD', 'CZK', 'PLN'],
		source: 3
	},
	protocol: 'https:',

	lists: [
		{
			id: 'vremea-la-munte',
			name: {
				ro: 'Vremea la munte'
			},
			title: {
				ro: 'Vremea la munte în România'
			},
			description: {
				ro: 'Vremea la cele mai importante stațiuni turistice montane din România'
			},
			image: 'https://c2.staticflickr.com/8/7642/16993770149_919c401fdf_c.jpg',
			ids: [686167, 686003, 683890, 683844, 683760, 683179, 681862, 682219, 681005, 678499, 6693026, 669704, 668828, 667091, 672907, 671818, 663100]
		},
		{
			id: 'vremea-la-mare',
			name: {
				ro: 'Vremea la mare'
			},
			title: {
				ro: 'Vremea la mare în România'
			},
			description: {
				ro: 'Vremea la cele mai importante stațiuni turistice la mare în România'
			},
			image: 'https://c1.staticflickr.com/5/4319/35978891245_2a0c09a48d_c.jpg',
			ids: [679035, 686626, 680963, 680546, 678589, 678588, 675135, 673957, 673921, 673334, 672486, 7287702, 7287703, 7283137, 667305, 665790, 663216, 7283138]
		}
	],
	oneSignal: {
		appId: '2dcf3c29-b621-452f-88e9-f2ffbcbe7b81',
		safari_web_id: 'web.onesignal.auto.37a647a2-1bdc-46a8-a505-4f4cc6400a46'
	},
};
