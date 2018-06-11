
import { Router } from 'express';
import HomePage from '../views/home-page';
import PlacePage from '../views/place-page';

const route: Router = Router();

export default route;

//index
route.get('/', HomePage.render);
route.get('/:id(\\d+)', (req, res, next) => {
    PlacePage.render(req, res, next, req.params.id);
});
