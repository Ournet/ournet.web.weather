var config = require('./config'),
  urlset = require('urlset');

module.exports = function(req, res, next) {
  var conf = config(getCountry(req));
  res.locals.config = conf;
  res.locals.links = getLinks(conf.country, conf.language);
  next();
}

var hosts = {
  'o-meteo.click.md': 'md',
  'o-meteo.ournet.ro': 'ro',
  'o-pogoda.zborg.ru': 'ru',
  'o-vremeto.ournet.bg': 'bg',
  'o-idojaras.ournet.hu': 'hu',
  'o-pogoda.diez.pl': 'pl',
  'o-weather.ournet.in': 'in',
  'o-pocasi.ournet.cz': 'cz',
  'o-meteo.ournet.it': 'it',
};

function getCountry(req) {
  return hosts[req.hostname];
}

var links = {};

function getLinks(country, language) {
  if (!links[country]) {
    var l = new urlset.Provider();
    l.load(__dirname + '/sitemap/' + country + '.json');
    l.setParam({
      name: 'ul',
      value: language,
      type: 'q'
    });
    links[country] = l.url;
  }
  return links[country];
}
