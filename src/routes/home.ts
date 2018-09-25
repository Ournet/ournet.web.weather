
import { Router } from 'express';
import { indexHandler } from '../controllers/index-controller';
import { placeHandler } from '../controllers/place-controller';
import { placesHandler, placesDailyForecastHandler } from '../controllers/places-controller';
import { GLOBAL_CONFIG_LIST_IDS } from '../config';

const route: Router = Router();

export default route;

//index
route.get('/', (req, res, next) =>
    indexHandler({ req, res }, next));

route.get(`/:id(${GLOBAL_CONFIG_LIST_IDS.join('|')})`, (req, res, next) => {
    indexHandler({ req, res, listId: req.params.id }, next)
});

route.get('/:id(\\d+)', (req, res, next) => {
    placeHandler({ req, res, id: req.params.id }, next)
});

route.get('/places', (req, res, next) =>
    placesHandler({ req, res, q: req.query.q }, next));

route.get('/places/:admin1', (req, res, next) =>
    placesHandler({ req, res, admin1Code: req.params.admin1 }, next));

route.get('/controls/places-daily-forecast/:date(\\d{4}-\\d{2}-\\d{2})/:ids', (req, res, next) =>
    placesDailyForecastHandler({ req, res, date: req.params.date, ids: req.params.ids.split(',') }, next));
