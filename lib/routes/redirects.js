var express = require('express'),
  config = require('../config'),
  places = require('ournet.data.places'),
  route = module.exports = express.Router();

route.get('/favicon.ico', function(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=' + (86400 * 14));
  return res.redirect(301, config.favicon);
});

// old place: /ro/vremea/Ciosescu/686675
route.get('/' + [config.prefix, ':country', ':name', ':id(\\d+)'].join('/'), function(req, res, next) {
  var date = Date.now(),
    id = parseInt(req.params.id),
    links = res.app.locals.links,
    lang = res.locals.currentCulture.language;

  places.AccessService.instance.getOldId(id).then(function(oldid) {
    if (!oldid) {
      return res.redirect(links.home({
        ul: lang
      }));
    }
    //console.log('got id in ', (Date.now() - date) + ' ms');
    res.redirect(301, links.weather.place(oldid.geonameid, {
      ul: lang
    }));
  });
});

route.get('/widget/WidgetScript', function(req, res) {
  var links = req.app.locals.links;
  places.CacheAccessService.instance.getOldId(parseInt(req.query.id)).then(function(oldid) {
    if (!oldid) return res.send('');
    req.query.id = oldid.geonameid;
    res.setHeader('Cache-Control', 'public, max-age=' + (86400 * 14));
    return res.redirect(301, links.weather.widget.widgetScript(req.query));
  });
});

route.get('/widget/WidgetFrame', function(req, res) {
  var links = req.app.locals.links;
  places.CacheAccessService.instance.getOldId(parseInt(req.query.id)).then(function(oldid) {
    if (!oldid) return res.send('');
    req.query.id = oldid.geonameid;
    res.setHeader('Cache-Control', 'public, max-age=' + (86400 * 14));
    return res.redirect(301, links.weather.widget.widgetFrame(req.query));
  });
});

route.get('/widget2/WidgetFrame', function(req, res) {
  var links = req.app.locals.links;
  places.CacheAccessService.instance.getOldId(parseInt(req.query.id)).then(function(oldid) {
    if (!oldid) return res.send('');
    req.query.id = oldid.geonameid;
    res.setHeader('Cache-Control', 'public, max-age=' + (86400 * 14));
    return res.redirect(301, links.weather.widget2.widgetFrame(req.query));
  });
});
