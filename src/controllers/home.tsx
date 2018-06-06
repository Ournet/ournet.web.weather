import { Router, Request, Response, NextFunction } from 'express';
import { renderPage } from '../renderer';
import HomePage, { HomePageData } from '../views/home-page';
import { getPageViewData } from '../view-data';
import * as React from 'react';
// import { PlaceMapper } from '../data/places/place-mapper';

const route: Router = Router();

export default route;

export function indexController(_req: Request, res: Response, next: NextFunction) {
    const viewData = getPageViewData<HomePageData>(res);
    const { config, api } = viewData;


    api.query.placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' }, { id: config.capitalId });

    api.query.execute()
        .then(result => {
            viewData.data = result.data;

            // const data: HomePageData = {
            //     capital: PlaceMapper.fromDomainPlace(result.data.capital),
            // }

            viewData.page.title = viewData.data.capital.name;

            renderPage(res, <HomePage {...viewData} />);
        }).catch(next);
}
