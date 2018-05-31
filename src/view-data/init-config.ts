import { Request } from 'express';
import { getAppConfig, AppConfig } from '../config';

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

export function initAppConfig(req: Request): AppConfig {
    const country = getCountry(req);
    if (!country) {
        throw new Error(`Invalid hostname: ${req.hostname}`);
    }
    return getAppConfig(country);
}
