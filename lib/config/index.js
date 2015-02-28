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
      ro: 'Moldova',
      ru: 'Молдова',
      bg: 'Молдова',
      url: 'http://meteo.click.md'
    },
    ro: {
      ro: 'România',
      ru: 'Румыния',
      bg: 'Румъния',
      url: 'http://meteo.ournet.ro'
    },
    ru: {
      ro: 'Rusia',
      ru: 'Россия',
      bg: 'Руска федерация',
      url: 'http://pogoda.zborg.ru'
    },
    it: {
      ro: 'Italia',
      ru: 'Италия',
      bg: 'Италия',
      url: 'http://meteo.ournet.it'
    },
    bg: {
      ro: 'Bulgaria',
      ru: 'Болгария',
      url: 'http://vremeto.ournet.bg'
    },
    hu: {
      ro: 'Ungaria',
      ru: 'Венгрия',
      bg: 'Унгария',
      url: 'http://idojaras.ournet.hu'
    },
    cz: {
      ro: 'Cehia',
      ru: 'Чехия',
      bg: 'Чешка република',
      url: 'http://pocasi.ournet.cz'
    },
    pl: {
      ro: 'Polonia',
      ru: 'Польша',
      bg: 'Полша',
      url: 'http://pogoda.diez.pl'
    },
    'in': {
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

var country = process.env.COUNTRY || 'md';

module.exports = _.assign(config, require('./' + country));

process.env.TZ = module.exports.timezone;