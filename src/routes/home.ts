
import { Router } from 'express';
import { indexHandler } from '../controllers/index-controller';
import { placeHandler } from '../controllers/place-controller';
import { placesHandler } from '../controllers/places-controller';

const route: Router = Router();

export default route;

//index
route.get('/', (req, res, next) =>
    indexHandler({ req, res }, next));

route.get('/:id(\\d+)', (req, res, next) =>
    placeHandler({ req, res, id: req.params.id }, next));

route.get('/places', (req, res, next) =>
    placesHandler({ req, res, q: req.query.q }, next));

route.get('/places/:admin1', (req, res, next) =>
    placesHandler({ req, res, admin1Code: req.params.admin1 }, next));
