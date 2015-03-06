var _ = require('ournet.core')._;


var config = {
  languagesNames: {
    ro: 'Română',
    ru: 'Русский',
    bg: 'Български'
  },
  favicon: 'http://assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
  international: {
    md: {
      it: 'Moldova',
      en: 'Moldova',
      ro: 'Moldova',
      ru: 'Молдова',
      bg: 'Молдова',
      cs: 'Moldavsko',
      hu: 'Moldova',
      url: 'http://meteo.click.md'
    },
    ro: {
      it: 'Romania',
      en: 'Romania',
      ro: 'România',
      ru: 'Румыния',
      bg: 'Румъния',
      cs: 'Rumunsko',
      hu: 'Románia',
      url: 'http://meteo.ournet.ro'
    },
    ru: {
      it: 'Russia',
      en: 'Russia',
      ro: 'Rusia',
      ru: 'Россия',
      bg: 'Руска федерация',
      cs: 'Rusko',
      hu: 'Oroszországi Föderáció',
      url: 'http://pogoda.zborg.ru'
    },
    it: {
      it: 'Italia',
      en: 'Italy',
      ro: 'Italia',
      ru: 'Италия',
      bg: 'Италия',
      cs: 'Itálie',
      hu: 'Olaszország',
      url: 'http://meteo.ournet.it'
    },
    bg: {
      it: 'Bulgaria',
      en: 'Bulgaria',
      ro: 'Bulgaria',
      ru: 'Болгария',
      cs: 'Bulharsko',
      hu: 'Bulgária',
      url: 'http://vremeto.ournet.bg'
    },
    hu: {
      it: 'Hungary',
      en: 'Hungary',
      ro: 'Ungaria',
      ru: 'Венгрия',
      bg: 'Унгария',
      cs: 'Maďarsko',
      url: 'http://idojaras.ournet.hu'
    },
    cz: {
      it: 'Cehia',
      en: 'Czech Republic',
      ro: 'Cehia',
      ru: 'Чехия',
      bg: 'Чешка република',
      hu: 'Csehország',
      url: 'http://pocasi.ournet.cz'
    },
    pl: {
      it: 'Poland',
      en: 'Poland',
      ro: 'Polonia',
      ru: 'Польша',
      bg: 'Полша',
      cs: 'Polsko',
      hu: 'Lengyelország',
      url: 'http://pogoda.diez.pl'
    },
    'in': {
      it: 'India',
      en: 'India',
      ro: 'India',
      ru: 'Индия',
      bg: 'Индия',
      cs: 'Indie',
      hu: 'India',
      url: 'http://weather.ournet.in'
    }
  },
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus']
};

var data = {};

module.exports = function(country) {
  if (!data[country])
    data[country] = _.assign({}, config, require('./' + country + '.js'));

  return data[country];
}

process.env.TZ = module.exports.timezone;
