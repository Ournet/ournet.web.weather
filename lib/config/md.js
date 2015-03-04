module.exports = {
  prefix: 'vremea',
  name: 'Click.md',
  language: 'ro',
  languages: ['ro', 'ru'],
  country: 'md',
  timezone: 'Europe/Bucharest',
  domain: 'click.md',
  host: 'localhost:4101',
  hour_format: 'HH:mm',
  email: 'info@click.md',
  googleAnalyticsId: 'UA-1490399-23',
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/click-icon-16.png',
  placesCount: 1700,
  widgetGoogleAnalyticsId: 'UA-1490399-49',
  projects: {
    news: 'news.click.md',
    weather: 'meteo.click.md',
    opinia: 'opinia.click.md',
    exchange: 'curs.click.md'
  },
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus'],
  socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FClickmd%2F144591008926117&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['ro', 'ru', 'it', 'bg', 'hu', 'cz', 'pl', 'in'],
  mainPlaces: [{
    id: 617702,
    ro: 'Anenii Noi',
    ru: 'Новые Анены'
  }, {
    id: 618605,
    ro: 'Bălți',
    ru: 'Бельцы'
  }, {
    id: 618594,
    ro: 'Basarabeasca',
    ru: 'Басарабяска'
  }, {
    id: 618456,
    ro: 'Cahul',
    ru: 'Кахул'
  }, {
    id: 618452,
    ro: 'Cantemir',
    ru: 'Кантемир'
  }, {
    id: 618120,
    ro: 'Căușeni',
    ru: 'Каушаны'
  }, {
    id: 618426,
    ro: 'Chișinău',
    ru: 'Кишинёв'
  }, {
    id: 618406,
    ro: 'Cimișlia',
    ru: 'Чимишлия'
  }, {
    id: 618405,
    ro: 'Comrat',
    ru: 'Комрат'
  }, {
    id: 618403,
    ro: 'Criuleni',
    ru: 'Криуляны'
  }, {
    id: 618365,
    ro: 'Dubăsari',
    ru: 'Дубоссары'
  }, {
    id: 617076,
    ro: 'Edineț',
    ru: 'Единцы'
  }, {
    id: 617993,
    ro: 'Hîncești',
    ru: 'Хынчешты'
  }, {
    id: 618196,
    ro: 'Ialoveni',
    ru: 'Яловены'
  }, {
    id: 617638,
    ro: 'Orhei',
    ru: 'Оргеев'
  }, {
    id: 617367,
    ro: 'Soroca',
    ru: 'Сороки'
  }, {
    id: 617239,
    ro: 'Tiraspol',
    ru: 'Тирасполь'
  }, {
    id: 617180,
    ro: 'Ungheni',
    ru: 'Унгень'
  }],
  capitalId: 618426
};
