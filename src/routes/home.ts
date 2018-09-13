
import { Router } from 'express';
import { indexHandler } from '../controllers/index-controller';
import { placeHandler } from '../controllers/place-controller';
import { placesHandler } from '../controllers/places-controller';

const route: Router = Router();

export default route;

//index
route.get('/', indexHandler);

route.get('/:id(\\d+)', (req, res, next) => {
    const id = req.params.id;
    placeHandler(req, res, next, { id });
});

route.get('/places', (req, res, next) => {
    placesHandler(req, res, next, { q: req.query.q });
});

route.get('/places/:admin1', (req, res, next) => {
    placesHandler(req, res, next, { admin1Code: req.params.admin1 });
});
