module.exports = {
  prefix: 'tempo',
  name: 'Ournet.it',
  language: 'it',
  languages: ['it'],
  country: 'it',
  timezone: 'Europe/Rome',
  domain: 'ournet.it',
  host: 'meteo.ournet.it',
  hour_format: 'HH:mm',
  email: 'info@ournet-group.com',
  googleAnalyticsId: 'UA-1490399-35',
  placesCount: 6000,
  widgetGoogleAnalyticsId: 'UA-1490399-50',
  projects: {
    news: 'news.ournet.it',
    weather: 'meteo.ournet.it',
    //opinia: 'mnenie.ournet.bg'//,
    //exchange: 'curs.ournet.bg'
  },
  shareDataServices: ['facebook', 'twitter', 'google-plus'],
  socialPluginsHtmlCode: '', // '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetro%2F156976714343293&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['bg', 'cz', 'ro', 'md', 'hu', 'ru', 'pl', 'in'],

  mainPlaces: [{
    id: 3183178,
    it: 'Altamura'
  }, {
    id: 3181355,
    it: 'Busto Arsizio'
  }, {
    id: 3180423,
    it: 'Carrara'
  }, {
    id: 3179806,
    it: 'Casoria'
  }, {
    id: 3179661,
    it: 'Castellammare di Stabia'
  }, {
    id: 3178957,
    it: 'Cesena'
  }, {
    id: 3178671,
    it: 'Cinisello Balsamo'
  }, {
    id: 2524653,
    it: 'Gela'
  }, {
    id: 3175678,
    it: 'Guidonia'
  }, {
    id: 6534228,
    it: 'Guidonia Montecelio'
  }, {
    id: 3175537,
    it: 'Imola'
  }, {
    id: 3174741,
    it: 'Lido di Ostia'
  }, {
    id: 2524245,
    it: 'Marsala'
  }, {
    id: 3173529,
    it: 'Mestre'
  }, {
    id: 2524013,
    it: 'Nicastro'
  }, {
    id: 3169984,
    it: 'Pozzuoli'
  }, {
    id: 2523665,
    it: 'Quartu Sant\'Elena'
  }, {
    id: 3169070,
    it: 'Roma'
  }, {
    id: 3166598,
    it: 'Sesto San Giovanni'
  }, {
    id: 3165456,
    it: 'Torre del Greco'
  }],
  capitalId: 3169070
};
