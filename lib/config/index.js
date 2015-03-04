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
      url: 'http://meteo.click.md'
    },
    ro: {
      it: 'Romania',
      en: 'Romania',
      ro: 'România',
      ru: 'Румыния',
      bg: 'Румъния',
      url: 'http://meteo.ournet.ro'
    },
    ru: {
      it: 'Russia',
      en: 'Russia',
      ro: 'Rusia',
      ru: 'Россия',
      bg: 'Руска федерация',
      url: 'http://pogoda.zborg.ru'
    },
    it: {
      it: 'Italia',
      en: 'Italy',
      ro: 'Italia',
      ru: 'Италия',
      bg: 'Италия',
      url: 'http://meteo.ournet.it'
    },
    bg: {
      it: 'Bulgaria',
      en: 'Bulgaria',
      ro: 'Bulgaria',
      ru: 'Болгария',
      url: 'http://vremeto.ournet.bg'
    },
    hu: {
      it: 'Hungary',
      en: 'Hungary',
      ro: 'Ungaria',
      ru: 'Венгрия',
      bg: 'Унгария',
      url: 'http://idojaras.ournet.hu'
    },
    cz: {
      it: 'Cehia',
      en: 'Czech Republic',
      ro: 'Cehia',
      ru: 'Чехия',
      bg: 'Чешка република',
      url: 'http://pocasi.ournet.cz'
    },
    pl: {
      it: 'Poland',
      en: 'Poland',
      ro: 'Polonia',
      ru: 'Польша',
      bg: 'Полша',
      url: 'http://pogoda.diez.pl'
    },
    'in': {
      it: 'India',
      en: 'India',
      ro: 'India',
      ru: 'Индия',
      bg: 'Индия',
      url: 'http://weather.ournet.in'
    }
  },
  shareDataServices: ['facebook', 'twitter', 'odnoklassniki', 'google-plus'],
  isOldId: function(id) {
    return 2940283 >= id && id >= 2938018;
  },
  mainPlacesIds: function() {
    if (!this._mainPlacesIds) {
      var self = this;
      this._mainPlacesIds = [];
      this.mainPlaces.forEach(function(item) {
        self._mainPlacesIds.push(item.id);
      });
    }
    return this._mainPlacesIds;
  }
};

var data = {};

module.exports = function(country) {
  country = country || process.env.COUNTRY || 'md';
  if (!data[country])
    data[country] = _.assign(config, require('./' + country + '.js'));
  return data[country];
}

process.env.TZ = module.exports.timezone;
