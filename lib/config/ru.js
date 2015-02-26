module.exports = {
  prefix: 'pogoda',
  name: 'Zborg.ru',
  language: 'ru',
  languages: ['ru'],
  country: 'ru',
  timezone: 'Europe/Moscow',
  domain: 'zborg.ru',
  host: 'pogoda.zborg.ru',
  hour_format: 'HH:mm',
  email: 'info@ournet-group.com',
  googleAnalyticsId: 'UA-1490399-23',
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/zborg-icon-16.png',
  placesCount: 150000,
  widgetGoogleAnalyticsId: 'UA-1490399-17',
  projects: {
    news: 'news.zborg.ru',
    weather: 'pogoda.zborg.ru',
    opinia: 'mnenie.zborg.ru',
    exchange: 'kurs.zborg.ru'
  },
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'vkontakte'],
  socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fzborg.ru&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['md', 'bg', 'it', 'ro', 'hu', 'cz', 'pl', 'in'],
  mainPlaces: [{
    id: 1510853,
    ru: 'Барнаул'
  }, {
    id: 1508291,
    ru: 'Челябинск'
  }, {
    id: 554840,
    ru: 'Ижевск'
  }, {
    id: 551487,
    ru: 'Казань'
  }, {
    id: 542420,
    ru: 'Краснодар'
  }, {
    id: 1502026,
    ru: 'Красноярск'
  }, {
    id: 524901,
    ru: 'Москва'
  }, {
    id: 520555,
    ru: 'Нижний Новгород'
  }, {
    id: 1496747,
    ru: 'Новосибирск'
  }, {
    id: 1496153,
    ru: 'Омск'
  }, {
    id: 511196,
    ru: 'Пермь'
  }, {
    id: 501175,
    ru: 'Ростов-на-Дону'
  }, {
    id: 498817,
    ru: 'Санкт-Петербург'
  }, {
    id: 499099,
    ru: 'Самара'
  }, {
    id: 498677,
    ru: 'Саратов'
  }, {
    id: 479561,
    ru: 'Уфа'
  }, {
    id: 479123,
    ru: 'Ульяновск'
  }, {
    id: 472757,
    ru: 'Волгоград'
  }, {
    id: 472045,
    ru: 'Воронеж'
  }],
  capitalId: 524901
};
