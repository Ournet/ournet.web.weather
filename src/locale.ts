import { join } from "path";
import { Request, Response } from 'express';

import * as i18n from 'i18n';
import { AppConfig } from "./config";

export type Locale = {
    lang: string
    country: string
}

i18n.configure({
    locales: ['en', 'ro', 'ru', 'hu', 'cs', 'bg', 'it', 'pl', 'sq', 'tr'],
    directory: join(__dirname, '..', 'locales'),
});

export function initLocale(req: Request, res: Response, config: AppConfig): Locale {
    let lang: string
    if (req.query.ul && config.languages.indexOf(req.query.ul) > -1) {
        lang = req.query.ul;
    } else {
        lang = config.languages[0];
    }
    res.locals.locale = res.locale = lang;
    i18n.init(req, res);
    res.setLocale(lang);

    return {
        lang, country: config.country
    }
}

export interface I18nFn {
    (...params: any[]): string
}
