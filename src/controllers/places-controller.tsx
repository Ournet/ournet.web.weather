
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
        renderPage(res, <PlacesPage {...data} />);
    }).catch(next);
}
