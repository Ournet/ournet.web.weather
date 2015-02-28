module.exports = {
  prefix: 'prognoza',
  name: 'Ournet.bg',
  language: 'bg',
  languages: ['bg'],
  country: 'bg',
  timezone: 'Europe/Sofia',
  domain: 'ournet.bg',
  host: 'vremeto.ournet.bg',
  hour_format: 'HH:mm',
  email: 'info@ournet-group.com',
  googleAnalyticsId: 'UA-1490399-35',
  placesCount: 6000,
  widgetGoogleAnalyticsId: 'UA-1490399-50',
  projects: {
    news: 'news.ournet.bg',
    weather: 'vremeto.ournet.bg',
    opinia: 'mnenie.ournet.bg',
    //exchange: 'curs.ournet.bg'
  },
  shareDataServices: ['facebook', 'twitter', 'google-plus'],
  socialPluginsHtmlCode:'',// '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetro%2F156976714343293&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['ro', 'cz', 'it', 'md', 'hu', 'ru', 'pl', 'in'],
  mainPlaces: [{
    id: 733191,
    bg: 'Благоевград'
  }, {
    id: 732770,
    bg: 'Бургас'
  }, {
    id: 726050,
    bg: 'Варна'
  }, {
    id: 725993,
    bg: 'Велико Търново'
  }, {
    id: 725905,
    bg: 'Видин'
  }, {
    id: 725712,
    bg: 'Враца'
  }, {
    id: 731549,
    bg: 'Габрово'
  }, {
    id: 726418,
    bg: 'Добрич'
  }, {
    id: 729794,
    bg: 'Кърджали'
  }, {
    id: 729730,
    bg: 'Кюстендил'
  }, {
    id: 729559,
    bg: 'Ловеч'
  }, {
    id: 729114,
    bg: 'Монтана'
  }, {
    id: 728378,
    bg: 'Пазарджик'
  }, {
    id: 728330,
    bg: 'Перник'
  }, {
    id: 728203,
    bg: 'Плевен'
  }, {
    id: 728193,
    bg: 'Пловдив'
  }, {
    id: 727696,
    bg: 'Разград'
  }, {
    id: 727523,
    bg: 'Русе'
  }, {
    id: 727221,
    bg: 'Силистра'
  }, {
    id: 727079,
    bg: 'Сливен'
  }, {
    id: 727011,
    bg: 'София'
  }, {
    id: 726848,
    bg: 'Стара Загора'
  }, {
    id: 730435,
    bg: 'Хасково'
  }, {
    id: 727233,
    bg: 'Шумен'
  }, {
    id: 725578,
    bg: 'Ямбол'
  }],
  capitalId: 727011
};
