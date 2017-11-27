'use strict';

const middlewares = require('../middlewares');

exports = module.exports = function(app) {
	app.use(middlewares.root);
	// app.use(middlewares.stats);

	app.use(require('./json'));
	app.use(require('./controls'));
	app.use(require('./newsletter'));

	app.use(middlewares.weather);

	app.use(require('./home'));
	app.use(require('./place'));
	app.use(require('./places'));
	app.use(require('./lists'));
	app.use(require('./widget'));
	app.use(require('./widget2'));
	app.use(require('./hack'));

	app.use(require('./redirects'));
};
