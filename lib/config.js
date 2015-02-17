var configs = {
  md: {
    prefix: 'vremea',
    name: 'Click.md',
    language: 'ro',
    country: 'md',
    domain: 'click.md',
    host: 'meteo.click.md',
    hour_format: 'HH:mm',
    googleAnalyticsId: 'UA-1490399-23',
    placesCount:1700,
    socialPluginsHtmlCode: '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FClickmd%2F144591008926117&amp;width=300&amp;colorscheme=light&amp;connections=10&amp;stream=false&amp;header=false&amp;height=255" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:300px; height:255px;" allowTransparency="true"></iframe>',
    isOldId: function(id) {
      return 2940283 >= id && id >= 2938018;
    },
    mainPlaces: [{
      id: 617702,
      ro: 'Anenii Noi'
    }, {
      id: 618594,
      ro: 'Basarabeasca'
    }]
  }
};

module.exports = configs[process.env.COUNTRY];
