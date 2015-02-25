var express = require('express'),
  core = require('ournet.core'),
  _ = core._,
  route = module.exports = express.Router(),
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather'),
  config = require('../config'),
  util = require('util'),
  ShareInfo = require('../share_info.js'),
  internal = {},
  widgetData = require('../data/widget.js');


route.get('/widget', function(req, res, next) {
  var __ = res.locals.__,
    currentCulture = res.locals.currentCulture,
    links = req.app.locals.links;

  res.locals.site.pageLayoutCss = 'form-layout';
  res.locals.site.head.title = util.format('%s - %s', __('weather_on_your_site'), config.name);
  res.locals.site.head.description = util.format(__('weather_on_your_site_info'), places.util.inCountryName(currentCulture.countryName, currentCulture.language));

  res.locals.site.head.canonical = 'http://' + config.host + links.weather.widget({
    ul: currentCulture.language
  });

  res.locals.shareInfo = ShareInfo({
    clientId: 'widget',
    identifier: res.locals.site.head.canonical,
    url: res.locals.site.head.canonical,
    title: res.locals.site.head.title,
    summary: res.locals.site.head.description
  });

  places.CacheAccessService.instance.getPlace(config.capitalId, true).then(function(place) {
    res.render('widget/index', {
      place: place
    });
  }).catch(next);

});

route.get('/widget/widget_script', function(req, res) {
  var days = parseInt(req.query.days),
    height = 29 + days * 42 + days - 1,
    width = req.query.w,
    links = req.app.locals.links;

  var data = '<iframe src="http://' + config.host + links.weather.widget.widgetFrame(req.query).replace(/&/g, '&amp;') + '" scrolling="no" frameborder="0" style="border:none;overflow:hidden;height:' + height + 'px;width:' + width + 'px;" allowTransparency="true"></iframe>\n' +
    '<noscript><a href="http://' + config.host + '">' + config.name + '</a></noscript>';

  res.send(data);
});

route.get('/widget/widget_frame', function(req, res, next) {
  var links = req.app.locals.links;

  widgetData.format(req.query, links, res.locals.__, res.locals.currentCulture.language)
    .then(function(data) {
      res.render('widget/frame', {
        widget: data
      });
    }).catch(next);
});
