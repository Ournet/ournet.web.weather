
import { Router } from 'express';
import { indexController } from '../controllers/home';

const route: Router = Router();

export default route;

//index
route.get('/', indexController);
