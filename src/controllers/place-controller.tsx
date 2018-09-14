
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import PlacePage from '../views/place/place-page';
import { PlaceViewModelInput, PlaceViewModelBuilder, PlaceViewModel } from '../view-models/place-view-model';

export function placeHandler(input: PlaceViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<PlaceViewModel>();

    new PlaceViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <PlacePage {...data} />))
        .catch(next);
}
