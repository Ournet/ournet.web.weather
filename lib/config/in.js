module.exports = {
  prefix: 'forecast',
  name: 'Ournet.in',
  language: 'en',
  languages: ['en'],
  country: 'in',
  timezone: 'Asia/New Delhi',
  domain: 'ournet.in',
  host: 'weather.ournet.in',
  hour_format: 'HH:mm',
  email: 'info@ournet-group.com',
  googleAnalyticsId: 'UA-1490399-31',
  placesCount: 39000,
  widgetGoogleAnalyticsId: 'UA-1490399-54',
  projects: {
    news: 'news.ournet.in',
    weather: 'weather.ournet.in',
    //opinia: 'mnenie.ournet.bg'//,
    //exchange: 'curs.ournet.bg'
  },
  shareDataServices: ['facebook', 'twitter', 'google-plus'],
  socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOurNetin%2F238491036247420&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  internationalIds: ['ro', 'cz', 'it', 'md', 'hu', 'ru', 'pl', 'bg'],

  mainPlaces: [{
    id: 1279186,
    en: 'Aizawl'
  }, {
    id: 1277333,
    en: 'Bangalore'
  }, {
    id: 1275841,
    en: 'Bhopal'
  }, {
    id: 1275817 ,
    en: 'Bhubaneswar'
  }, {
    id: 1274746 ,
    en: 'Chandigarh'
  }, {
    id: 1264527,
    en: 'Chennai'
  }, {
    id: 1269843,
    en: 'Hyderabad'
  }, {
    id: 1269771 ,
    en: 'Imphal'
  }, {
    id: 1269515 ,
    en: 'Jaipur'
  }, {
    id: 1275004 ,
    en: 'Kolkata'
  }, {
    id: 1264733 ,
    en: 'Lucknow'
  }, {
    id: 1275339 ,
    en: 'Mumbai'
  }, {
    id: 1261481 ,
    en: 'New Delhi'
  }, {
    id: 1260086 ,
    en: 'Patna'
  }, {
    id: 1259425,
    en: 'Puducherry'
  }, {
    id: 1258526 ,
    en: 'Ranchi'
  }, {
    id: 1255634,
    en: 'Srinagar'
  }, {
    id: 1254163,
    en: 'Thiruvananthapuram'
  }],
  capitalId: 1261481
};
