
import * as React from 'react';
import { NextFunction, Response, Request } from "express";
import { IndexViewModel, IIndexViewModel } from "../view-models/index-view-model";
import { createQueryApiClient } from "../data/api";
import { renderPage } from "../renderer";
import IndexPage from "../views/index/index-page";

export function indexHandler(req: Request, res: Response, next: NextFunction) {
    const model = new IndexViewModel(req, res);
    const api = createQueryApiClient<IIndexViewModel>();

    model.build(api).then(data => {
        renderPage(res, <IndexPage {...data} />);
    }).catch(next);
}
