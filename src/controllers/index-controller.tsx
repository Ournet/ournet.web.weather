
import * as React from 'react';
import { NextFunction } from "express";
import { IndexViewModel, IndexViewModelBuilder } from "../view-models/index-view-model";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import IndexPage from "../views/index/index-page";
import { PageViewModelInput } from '../view-models/page-view-model';

export function indexHandler(input: PageViewModelInput, next: NextFunction) {
    const api = createQueryApiClient<IndexViewModel>();

    new IndexViewModelBuilder(input, api)
        .build()
        .then(data => renderPage(input.res, <IndexPage {...data} />))
        .catch(next);
}
