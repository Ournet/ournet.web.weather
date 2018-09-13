
import * as React from 'react';
import { NextFunction, Response, Request } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { PlacesViewModelInput, PlacesViewModel, IPlacesViewModel } from '../view-models/places-view-model';
import PlacesPage from '../views/places/places-page';

export function placesHandler(req: Request, res: Response, next: NextFunction, input: PlacesViewModelInput) {
    const model = new PlacesViewModel(req, res);
    const api = createQueryApiClient<IPlacesViewModel>();

    model.build(api, input).then(data => {
        if (input.q && data.places.length === 1) {
            return res.redirect(data.links.weather.place(data.places[0].id, { ul: data.lang }));
        }
        renderPage(res, <PlacesPage {...data} />);
    }).catch(next);
}
