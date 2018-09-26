
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { Widget1ViewModelInput, Widget1ViewModel, Widget1ViewModelBuilder } from '../view-models/widget1-view-model';
import Widget1Frame from '../views/widgets/widget1-frame';

export function widget1FrameHandler(input: Widget1ViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<Widget1ViewModel>();

    new Widget1ViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <Widget1Frame {...data} />))
        .catch(next);
}

