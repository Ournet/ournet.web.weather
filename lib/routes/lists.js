'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
const _ = utils._;
const logger = require('../logger');
/*eslint new-cap:1*/
const route = express.Router();
const Data = require('../data');
const Lists = require('../weather-lists');
const listsPaths = Lists.getPaths();

console.log(listsPaths)

//index

route.get('/:id(' + listsPaths + ')', function (req, res, next) {
    var config = res.locals.config;
    utils.maxageIndex(res);

    var country = res.locals.currentCulture.country;
    var language = res.locals.currentCulture.language;
    var links = res.locals.links;
    var __ = res.locals.__;
    const listId = req.params.id;

    res.locals.location.pop();

    const list = Lists.getList(country, listId);
    res.locals.listInfo = list;

    if (!list) {
        logger.error('Not found list', {
            placeid: listId,
            url: req.originalUrl
        });
        const data = {
            statusCode: 404,
            title: __('error_title'),
            description: __('error_description')
        };
        return res.render('error', { data });
    }

    res.locals.title = res.locals.site.head.title = list.title[language];
    res.locals.subTitle = res.locals.site.head.description = list.description[language];

    const selflink = links.weather.place(listId, {
        ul: language
    });

    res.locals.site.head.canonical = utils.canonical(country, selflink);

    // console.log(res.locals.util);

    var date = utils.formatDate(res.locals.currentDate.toDate());
    var viewdata = res.viewdata;

    viewdata.places = ['places', { ids: list.ids }];

    Data.get(viewdata).then(function (result) {
        // console.log(result.holidays);
        var places = result.places.map(place => {
            return _.pick(place, 'id', 'latitude', 'longitude');
        });
        return Data.get({
            placesForecast: ['placesForecast', { date: date, places: JSON.stringify(places) }]
        })
            .then(function (result2) {
                result.placesForecast = result2.placesForecast;

                result.placesForecast.forEach(pf => {
                    var place = _.find(result.places, { id: pf.place.id });
                    pf.place.name = place.name;
                    pf.place.names = place.names;
                });

                res.render(utils.getRenderName(res, 'list'), result);
            });
    }, next);
});

module.exports = route;
