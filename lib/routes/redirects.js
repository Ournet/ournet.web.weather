var express = require('express'),
  config = require('../config.js'),
  route = module.exports = express.Router();

route.get('/favicon.ico', function(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=' + (86400 * 14));
  return res.redirect(301, config.favicon);
});
