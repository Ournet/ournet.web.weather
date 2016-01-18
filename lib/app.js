'use strict';

require('dotenv').load();

var logger = require('./logger');

var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	logger.warn('Starting app...', {
		maintenance: 'start'
	});
}

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./routes');
var i18n = require('./i18n');
var utils = require('./utils');
var boot = require('./boot');
var path = require('path');

function catchError(req, res, error) {
	logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		stack: error.stack
	});

	utils.maxage(res, 0);
	res.status(error.code || error.statusCode || 500).send('Error');
}

function createApp() {
	var app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'jade');
	app.set('views', path.join(__dirname, 'views'));
	//app.set('utils', utils);
	app.disable('etag');
	//app.set(require('./etag'));

	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));
	app.use(methodOverride());
	// app.use(responseTime());
	if (!isProduction) {
		app.use(require('morgan')('dev'));
	}

	app.use(boot);

	if (isProduction) {
		app.use(function(req, res, next) {
			// console.log(req.headers);
			if (!req.headers['x-amz-cf-id']) {
				var config = res.locals.config;
				//console.log('Erorr: ', req.headers);
				return res.redirect('http://' + config.host + req.originalUrl);
			}
			next();
		});
	}
	app.use(express.static(path.join(__dirname, 'public'), {
		maxAge: isProduction ? (1000 * 60 * 15) : 0
	}));

	app.use(i18n);
	routes(app);

	app.all('*', function(req, res) {
		res.status(404).end();
	});

	/*eslint no-unused-vars:1*/
	app.use(function(err, req, res, next) {
		catchError(req, res, err);
	});

	app.on('uncaughtException', function(req, res, route, error) {
		catchError(req, res, error);
	});

	//app.use(router);
	app.listen(process.env.PORT);
	console.log('Server started on port', process.env.PORT);
}

createApp();

process.on('uncaughtException', function(err) {
	console.trace(err);
	// logger.error('uncaughtException: ' + err.message, {
	// 	trace: err.trace
	// });
});
