module.exports = {
  prefix: 'vremea',
  name: 'Click.md',
  language: 'ro',
  languages: ['ro', 'ru'],
  country: 'md',
  timezone: 'Europe/Bucharest',
  domain: 'click.md',
  host: 'localhost:3737',
  hour_format: 'HH:mm',
  email: 'info@ournet-group.com',
  googleAnalyticsId: 'UA-1490399-23',
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/click-icon-16.png',
  placesCount: 1700,
  widgetGoogleAnalyticsId: 'UA-1490399-49',
  projects: [{
    name: 'news',
    host: 'news.click.md'
  }, {
    name: 'weather',
    host: 'meteo.click.md'
  }, {
    name: 'opinia',
    host: 'opinia.click.md'
  }, {
    name: 'exchange',
    host: 'curs.click.md'
  }],
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus'],
  socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FClickmd%2F144591008926117&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  mainPlaces: [{
    id: 617702,
    ro: 'Anenii Noi'
  }, {
    id: 618605,
    ro: 'Bălți'
  }, {
    id: 618594,
    ro: 'Basarabeasca'
  }, {
    id: 618456,
    ro: 'Cahul'
  }, {
    id: 618452,
    ro: 'Cantemir'
  }, {
    id: 618120,
    ro: 'Căușeni'
  }, {
    id: 618426,
    ro: 'Chișinău'
  }, {
    id: 618406,
    ro: 'Cimișlia'
  }, {
    id: 618405,
    ro: 'Comrat'
  }, {
    id: 618403,
    ro: 'Criuleni'
  }, {
    id: 618365,
    ro: 'Dubăsari'
  }, {
    id: 617076,
    ro: 'Edineț'
  }, {
    id: 617993,
    ro: 'Hîncești'
  }, {
    id: 618196,
    ro: 'Ialoveni'
  }, {
    id: 617638,
    ro: 'Orhei'
  }, {
    id: 617367,
    ro: 'Soroca'
  }, {
    id: 617239,
    ro: 'Tiraspol'
  }, {
    id: 617180,
    ro: 'Ungheni'
  }],
  capitalId: 618426
};
