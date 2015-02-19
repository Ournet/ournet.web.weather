var i18n = require('i18n'),
  config = require('./config.js'),
  moment = require('moment');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'ro', 'ru', 'hu', 'cs', 'bg'],

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',

  defaultLocale: config.language,

  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  //cookie: 'lang',
});

module.exports = function(req, res, next) {
  //console.log('initing i18n');
  if (req.query.ul && config.languagesNames[req.query.ul])
    i18n.setLocale(req.query.ul);
  else i18n.setLocale(config.language);
  i18n.init(req, res);
  res.locals.locale = res.locale = i18n.getLocale();
  i18n.setLocale(req, res.locale);
  moment.locale(res.locale);

  //console.log('initing i18n: ', (Date.now() - date));
  //res.locals.__ = res.__;

  return next();
};
