
import * as React from 'react';
import { NextFunction } from "express";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import { Widget1ViewModelInput, Widget1ViewModel, Widget1ViewModelBuilder } from '../view-models/widget1-view-model';
import Widget1Frame from '../views/widgets/widget1-frame';
import { Widget2ViewModelInput, Widget2ViewModel, Widget2ViewModelBuilder } from '../view-models/widget2-view-model';
import Widget2Frame from '../views/widgets/widget2-frame';

export function widget1FrameHandler(input: Widget1ViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<Widget1ViewModel>();

    new Widget1ViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <Widget1Frame {...data} />))
        .catch(next);
}

export function widget2FrameHandler(input: Widget2ViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<Widget2ViewModel>();

    new Widget2ViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <Widget2Frame {...data} />))
        .catch(next);
}
