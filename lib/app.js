require('dotenv').load();
var config = require('./config');

require('time')(Date);

var core = require('ournet.core'),
  express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  logger = require('morgan'),
  //responseTime = require('response-time'),
  Promise = core.Promise,
  routes = require('./routes'),
  urlset = require('urlset'),
  i18n = require('./i18n'),
  utils = require('./utils.js'),
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather'),
  app;

function createApp() {
  if (app) return;
  app = express();

  app.disable('x-powered-by');
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  //app.set('utils', utils);
  //app.disable('etag');
  //app.set(require('./etag'));
  urlset.load(__dirname + '/sitemap/' + config.country + '.json');
  urlset.setParam({
    name: 'ul',
    value: config.language,
    type: 'q'
  });
  app.locals.links = urlset.url;

  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }));
  app.use(methodOverride());
  //app.use(responseTime());
  app.use(logger('dev'));
  app.use(express.static(__dirname + '/public', {
    maxAge: process.env.MODE == 'dev' ? 0 : (1000 * 60 * 15)
  }));

  app.use(i18n);
  routes(app);

  app.use(function(err, req, res, next) {
    //console.error(err.stack);
    core.logger.error(err.message || 'errorHandler', {
      error: err
    });

    utils.maxage(res, 0);

    res.status(err.code || 500).send('Something broke!');
  });

  //app.use(router);
  app.listen(process.env.PORT);
  console.log('server started');
}

createApp();
