'use strict';

var middlewares = require('../middlewares');

exports = module.exports = function(app) {
	app.use(middlewares.root);

	app.use(require('./redirects'));
	app.use(require('./json'));
	app.use(require('./controls'));

	app.use(middlewares.weather);

	app.use(require('./home'));
	app.use(require('./place'));
	app.use(require('./places'));
	app.use(require('./widget'));
	app.use(require('./widget2'));
};
