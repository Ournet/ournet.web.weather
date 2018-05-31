import { Response } from 'express';
import { RootViewData } from './root';
import { PageViewData } from './page';

export function getViewData<T extends RootViewData>(res: Response): T {
    if (!res.locals.viewData) {
        throw new Error(`You must init view-data first!`);
    }
    return res.locals.viewData as T;
}

export function getPageViewData<DT={}>(res: Response): PageViewData<DT> {
    return getViewData<PageViewData<DT>>(res);
}
