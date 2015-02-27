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
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
  placesCount: 18000,
  widgetGoogleAnalyticsId: 'UA-1490399-48',
  projects: {
    news: 'news.ournet.ro',
    weather: 'meteo.ournet.ro',
    opinia: 'opinia.ournet.ro',
    exchange: 'curs.ournet.ro'
  },
  shareDataServices: ['facebook', 'twitter', 'google-plus'],
  socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetro%2F156976714343293&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['md', 'cz', 'it', 'bg', 'hu', 'ru', 'pl', 'in'],
  mainPlaces: [{
    id: 686254,
    ro: 'Arad'
  }, {
    id: 685948,
    ro: 'Bacău'
  }, {
    id: 685826,
    ro: 'Baia Mare'
  }, {
    id: 684039,
    ro: 'Botoșani'
  }, {
    id: 683902,
    ro: 'Brăila'
  }, {
    id: 683844,
    ro: 'Brașov'
  }, {
    id: 683506,
    ro: 'București'
  }, {
    id: 683123,
    ro: 'Buzău'
  }, {
    id: 681290,
    ro: 'Cluj-Napoca'
  }, {
    id: 680963,
    ro: 'Constanța'
  }, {
    id: 680332,
    ro: 'Craiova'
  }, {
    id: 677697,
    ro: 'Galați'
  }, {
    id: 671768,
    ro: 'Oradea'
  }, {
    id: 670609,
    ro: 'Pitești'
  }, {
    id: 670474,
    ro: 'Ploiești'
  }, {
    id: 668872,
    ro: 'Râmnicu Vâlcea'
  }, {
    id: 667873,
    ro: 'Satu Mare'
  }, {
    id: 667268,
    ro: 'Sibiu'
  }, {
    id: 665850,
    ro: 'Suceava'
  }, {
    id: 665004,
    ro: 'Târgu Mureș'
  }, {
    id: 665087,
    ro: 'Timișoara'
  }],
  capitalId: 683506
};
