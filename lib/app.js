require('dotenv').load();
var
	core = require('ournet.core');

core.Logger.init({
	tags: ['weather'],
	json: true
});

if (process.env.NODE_ENV === 'production') {
	core.logger.remove(core.logger.transports.Console);
}

if (process.env.MODE != 'dev') {
	core.logger.warn('Starting app...', {
		maintenance: 'start'
	});
}

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
	if (app) {
		return;
	}
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

	if (process.env.MODE !== 'dev') {
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

	app.all('*', function(req, res) {
		res.status(404).end();
	});

	app.use(function(error, req, res, next) {
		catchError(req, res, error);
	});

	app.on('uncaughtException', function(req, res, route, error) {
		catchError(req, res, error);
	});

	//app.use(router);
	app.listen(process.env.PORT);
	//console.log('server started');
}

function catchError(req, res, error) {
	core.logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		stack: error.stack
	});

	utils.maxage(res, 0);

	res.status(error.code || error.statusCode || 500).send('Error!');
}

createApp();

process.on('uncaughtException', function(err) {
	core.logger.error('uncaughtException: ' + err.message, {
		trace: err.trace
	});
});
