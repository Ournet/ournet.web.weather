
import { Router } from 'express';
import HomePage from '../views/home-page';

const route: Router = Router();

export default route;

//index
route.get('/', HomePage.render);
