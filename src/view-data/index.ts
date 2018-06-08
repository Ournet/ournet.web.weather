import { Response, Request } from 'express';

import { ViewDataManager } from '@ournet/view-data';
import initViewData from './init-view-data';
import { PageViewData } from './page';
import { NextFunction } from 'connect';
import { OurnetQueryApi } from '@ournet/api-client';

const viewDataManager = new ViewDataManager({
    initViewData,
})

export function getViewData<T>(req: Request, res: Response): PageViewData<T> {
    return viewDataManager.getViewData<T, OurnetQueryApi<T>, PageViewData<T>>(req, res);
}


export function expressInitViewData(req: Request, res: Response, next: NextFunction) {
    viewDataManager.initViewData(req, res);
    next();
}
