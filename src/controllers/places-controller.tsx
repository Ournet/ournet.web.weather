
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { PlacesViewModelInput, PlacesViewModel, PlacesViewModelBuilder } from '../view-models/places-view-model';
import PlacesPage from '../views/places/places-page';

export function placesHandler(input: PlacesViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<PlacesViewModel>();

    new PlacesViewModelBuilder(input, api)
        .build()
        .then(data => {
            if (input.q && data.places.length === 1) {
                return input.res.redirect(data.links.weather.place(data.places[0].id, { ul: data.lang }));
            }
            renderPage(input.res, <PlacesPage {...data} />);
        }).catch(next);
}
