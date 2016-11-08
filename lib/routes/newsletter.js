'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
var logger = require('../logger');
var EmailSubscriber = require('../data').EmailSubscriber;
/*eslint new-cap:1*/
var route = module.exports = express.Router();

function sendData(res, data, statusCode) {
	utils.maxage(res, 0);
	statusCode = statusCode || 200;

	res.status(statusCode).send(data);
}

//index

route.post('/newsletter/subscribe', function(req, res) {
	var placeId = req.body.placeId;
	if (!placeId || !/^\d+$/.test(placeId)) {
		return sendData(res, { message: 'Error!' }, 400);
	}
	var email = req.body.email;
	if (!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
		return sendData(res, { message: 'Invalid email!' }, 400);
	}

	var currentCulture = res.locals.currentCulture;

	var data = {
		group: 'weather',
		target: placeId,
		email: email,
		ip: req.ip,
		referer: req.get('Referer'),
		lang: currentCulture.lang,
		country: currentCulture.country
	};

	var subscriberId = EmailSubscriber.createId(data);

	EmailSubscriber.one({ where: { _id: subscriberId } })
		.then(function(subscriber) {
			if (subscriber) {
				logger.warn('Newsleter: subscriber exists:', subscriber);
				return sendData(res, { message: 'You are subscribed!' });
			}

			return EmailSubscriber.subscribe(data)
				.then(function() {
					logger.warn('Newsleter: new subscriber:', data);
					return sendData(res, { message: 'Done!' });
				});
		})
		.catch(function(error) {
			logger.error('Newsleter: error:' + error.message, data);
			sendData(res, error, 500);
		});

});

route.post('/newsletter/unsubscribe/:id', function(req, res) {
	var ids = req.params.id.split(/[,;]/g);

	Promise.map(ids, function(id) {
			return EmailSubscriber.unsubscribe({ id: id });
		})
		.then(function() {
			logger.warn('Newsleter: unsubscriber:', ids);
			return sendData(res, { message: 'Done!' });
		})
		.catch(function(error) {
			logger.error('Newsleter unsubscribe: error:' + error.message, ids);
			sendData(res, error, 500);
		});
});
