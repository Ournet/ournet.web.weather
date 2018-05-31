import { Request, Response, NextFunction } from 'express';
import { getAppConfig } from './config';
import { getViewData } from './view-data';
const Links = require('ournet.links');

const hosts: { [index: string]: string } = {
    'meteo.click.md': 'md',
    'meteo.ournet.ro': 'ro',
    'pogoda.zborg.ru': 'ru',
    'vremeto.ournet.bg': 'bg',
    'idojaras.ournet.hu': 'hu',
    // 'pogoda.diez.pl': 'pl',
    'weather.ournet.in': 'in',
    'pocasi.ournet.cz': 'cz',
    'meteo.ournet.it': 'it',
    'moti2.al': 'al',
    'hava.one': 'tr'
};

function getCountry(req: Request) {
    return hosts[req.hostname] || process.env.COUNTRY;
}

const LINKS: { [index: string]: any } = {};

function getLinks(country: string, language: string) {
    if (!LINKS[country]) {
        LINKS[country] = Links.country(country, language);
    }
    return LINKS[country];
}

export default function (req: Request, res: Response, next: NextFunction) {
    const country = getCountry(req);
    if (!country) {
        return next(new Error(`Invalid hostname: ${req.hostname}`));
    }
    const config = getAppConfig(country);
    const viewData = getViewData(res);
    viewData.config = config;
    viewData.links = getLinks(config.country, config.languages[0]);
    next();
};
