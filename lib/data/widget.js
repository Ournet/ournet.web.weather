var extern = module.exports,
  internal = {},
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather');

extern.format = function(query, links, __, lang) {
  var url = links.weather.place(query.id, {
      utm_campaign: 'widget',
      utm_medium: 'iframe',
      utm_content: 'header',
      ul: query.ul
    }),
    id = parseInt(query.id);

  internal.getData(id).then(function(data) {

    var name = '<a target="_blank" onclick="ga(\'send\', \'event\', \'weather-widget\', \'click-header\', \'id-' + query.id + '\', 1);" style="color:#' + query.htcolor + ';" href="' + url + '" title="' + longtitle + '">' + placename + '</a>';
  });

};

internal.getData = function(id) {
  return places.CacheAccessService.instance.getPlace(id, true).then(function(place) {
    return weather.CacheAccessService.instance.getForecast(weather.forecast.formatSelector(place)).then(function(report) {
      return {
        place: place,
        weather: report
      }
    });
  });
};


internal.structure = '<div id="widget"><div class="head style="%s">%s</div><div onclick="window.open(\'%s\', \'_blank\');ga(\'send\', \'event\', \'weather-widget\', \'click-item\', \'id-%s\', 1);" class="body" style="%s">%s</div></div>';
