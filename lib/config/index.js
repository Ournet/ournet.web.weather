var _ = require('ournet.core')._;


var config = {
  languagesNames: {
    ro: 'Română',
    ru: 'Русский'
  },
  international: [{
    ro: 'România',
    ru: 'Румыния',
    url: 'http://meteo.ournet.ro',
    id: 'ro'
  }, {
    ro: 'Rusia',
    ru: 'Россия',
    url: 'http://pogoda.zborg.ru',
    id: 'ru'
  }, {
    ro: 'Italia',
    ru: 'Италия',
    url: 'http://meteo.ournet.it',
    id: 'it'
  }, {
    ro: 'Bulgaria',
    ru: 'Болгария',
    url: 'http://vremeto.ournet.bg',
    id: 'bg'
  }, {
    ro: 'Ungaria',
    ru: 'Венгрия',
    url: 'http://idojaras.ournet.hu',
    id: 'hu'
  }, {
    ro: 'Cehia',
    ru: 'Чехия',
    url: 'http://pocasi.ournet.cz',
    id: 'cz'
  }, {
    ro: 'Polonia',
    ru: 'Польша',
    url: 'http://pogoda.diez.pl',
    id: 'pl'
  }, {
    ro: 'India',
    ru: 'Индия',
    url: 'http://weather.ournet.in',
    id: 'in'
  }],
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
