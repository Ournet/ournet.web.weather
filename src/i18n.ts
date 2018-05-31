import { join } from "path";
import { Request, Response, NextFunction } from 'express';
import { getViewData } from "./view-data";

import * as i18n from 'i18n';

i18n.configure({
    locales: ['en', 'ro', 'ru', 'hu', 'cs', 'bg', 'it', 'pl', 'sq', 'tr'],
    directory: join(__dirname, '..', 'locales'),
});

export default function (req: Request, res: Response, next: NextFunction) {
    const viewData = getViewData(res);
    const config = viewData.config;
    let lang: string
    if (req.query.ul && config.languages.indexOf(req.query.ul) > -1) {
        lang = req.query.ul;
    } else {
        lang = config.languages[0];
    }
    res.locals.locale = res.locale = lang;
    i18n.init(req, res);
    res.setLocale(lang);

    viewData.locale = {
        lang, country: config.country
    };

    return next();
}
