require('dotenv').load();
var
  core = require('ournet.core');

core.Logger.init({
  tags: ['weather'],
  json: true
});

if (process.env.MODE != 'dev')
  core.logger.warn('Starting app...', {
    maintenance: 'start'
  });

require('time')(Date);

var
  express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Promise = core.Promise,
  routes = require('./routes'),
  i18n = require('./i18n'),
  utils = require('./utils.js'),
  boot = require('./boot.js'),
  places = require('ournet.data.places'),
  weather = require('ournet.data.weather'),
  app,
  startDate = Date.now();

function createApp() {
  if (app) return;
  app = express();

  app.disable('x-powered-by');
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  //app.set('utils', utils);
  app.disable('etag');
  //app.set(require('./etag'));

  app.use(bodyParser.json()); // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
  }));
  app.use(methodOverride());
  //app.use(responseTime());
  if (process.env.MODE == 'dev') {
    app.use(require('morgan')('dev'));
  }

  app.use(boot);

  if (process.env.MODE != 'dev') {
    app.use(function(req, res, next) {
      if (!req.headers['x-amz-cf-id']) {
        var config = res.locals.config;
        //console.log('Erorr: ', req.headers);
        return res.redirect('http://' + config.host + req.originalUrl);
      }
      next();
    });
  }
  app.use(express.static(__dirname + '/public', {
    maxAge: process.env.MODE == 'dev' ? 0 : (1000 * 60 * 15)
  }));

  // app.use(function(req, res, next) {
  //   console.log(req.hostname);
  //   console.log('headers: ', req.headers);
  //   next();
  // });

  app.use(i18n);
  routes(app);

  app.use(function(err, req, res, next) {
    core.logger.error(err.message || 'errorHandler', {
      error: err,
      url: req.originalUrl,
      stack: err.stack
    });

    utils.maxage(res, 0);

    res.status(err.code || 500).send('Error!');
  });

  //app.use(router);
  app.listen(process.env.PORT || 4101);
  //console.log('server started');
}

createApp();

process.on('uncaughtException', function(err) {
  core.logger.error('uncaughtException: ' + err.message, {
    trace: err.trace
  });
});

if (process.env.MODE == 'dev1') {

  var heapdump = require('heapdump');
  setInterval(function() {
    heapdump.writeSnapshot();
    console.log(process.memoryUsage());
    return;
    var memMB = process.memoryUsage().rss / 1048576;
    if (memMB > nextMBThreshold) {
      heapdump.writeSnapshot();
      nextMBThreshold += 100
    }
  }, 6000 * 2);

}


function testProcess() {
  var memory = parseInt(process.memoryUsage().rss / 1048576);
  var time = (Date.now() - startDate) / 1000 / 60;
  time = parseInt(time);
  if (memory > 500) {
    core.logger.error('Memory overload', {
      memory: memory,
      runtime: time,
      maintenance: 'stop'
    });
    setTimeout(function() {
      return process.kill(process.pid);
    }, 1000 * 10);
    return;
  }

  core.logger.warn('Memory usage', {
    memory: memory,
    runtime: time
  });
}

setInterval(testProcess, 1000 * 60 * 5);
