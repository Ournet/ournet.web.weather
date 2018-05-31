
import { Request, Response, NextFunction } from 'express';
import { initAppConfig } from './init-config';
import { initLoacel } from './init-locale';
import { initLinks } from './init-links';
import { RootViewData } from './root';
import { createHelpers } from './helpers';

export default function (req: Request, res: Response, next: NextFunction) {
    const config = initAppConfig(req);
    const locale = initLoacel(req, res, config);
    const links = initLinks(locale);

    const viewData: RootViewData = {
        __: res.__,
        locale,
        config,
        links,
        helpers: createHelpers(),
    };

    res.locals.viewData = viewData

    next();
}
