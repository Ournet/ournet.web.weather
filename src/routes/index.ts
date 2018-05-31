
import homeRoute from './home'
import rootMiddleware from '../middlewares/root';
import pageMiddleware from '../middlewares/page';
import { Express } from 'express';

export default function (app: Express) {
    app.use(rootMiddleware);
    app.use(pageMiddleware);
    app.use(homeRoute);
}
