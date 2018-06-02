import { Router, Request, Response, NextFunction } from 'express';
import { renderPage } from '../renderer';
import HomePage from '../views/home-page';
import { getPageViewData } from '../view-data';
import * as React from 'react';

const route: Router = Router();

export default route;

export function indexController(_req: Request, res: Response, _next: NextFunction) {
    const viewData = getPageViewData(res);

    renderPage(res, <HomePage {...viewData} />);
}
