var configs = {
  md: {
    prefix: 'vremea',
    name: 'Click.md',
    language: 'ro',
    country: 'md',
    domain: 'click.md',
    host: 'meteo.click.md',
    googleAnalyticsId: 'UA-1490399-23',
    isOldId: function(id) {
      return 2940283 >= id && id >= 2938018;
    }
  }
};

module.exports = configs[process.env.COUNTRY];
