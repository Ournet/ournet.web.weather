import { Response } from 'express';
import { RootViewData } from './root';
import { PageViewData } from './page';

export function getViewData<T extends RootViewData>(res: Response): T {
    if (!res.locals.viewData) {
        const viewData: RootViewData = {
            __: res.__,
            locale: null,
            config: null,
            links: null,
        };
        res.locals.viewData = viewData;
    }
    return res.locals.viewData as T;
}

export function getPageViewData<T extends PageViewData>(res: Response): T {
    return getViewData<T>(res);
}
