
import { Request, Response, NextFunction } from 'express';
import { initAppConfig } from './init-config';
import { initLoacel } from './init-locale';
import { initLinks } from './init-links';
import { RootViewData } from './root';
import { initClient } from './client';

export default function (req: Request, res: Response, next: NextFunction) {
    const config = initAppConfig(req);
    const locale = initLoacel(req, res, config);
    const links = initLinks(config.languages[0]);
    const client = initClient(req);

    const viewData: RootViewData = {
        __: res.__,
        locale,
        config,
        links,
        client,
    };

    res.locals.viewData = viewData

    next();
}
