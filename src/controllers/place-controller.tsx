
import * as React from 'react';
import { NextFunction, Response, Request } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import PlacePage from '../views/place/place-page';
import { PlaceViewModel, IPlaceViewModel, PlaceViewModelInput } from '../view-models/place-view-model';

export function placeHandler(req: Request, res: Response, next: NextFunction, input: PlaceViewModelInput) {
    const model = new PlaceViewModel(req, res);
    const api = createQueryApiClient<IPlaceViewModel>();

    model.build(api, input).then(data => {
        renderPage(res, <PlacePage {...data} />);
    }).catch(next);
}
