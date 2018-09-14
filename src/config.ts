import { readFileSync } from "fs";
import { join } from "path";
import { Request } from "express";

const CONFIGS: { [country: string]: AppConfig } = {};
const baseConfig: AppConfig = require('../config/index.json');

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

export function getAppConfig(country: string): AppConfig {
    if (!country) {
        throw new Error('Loading config for NO country');
    }
    if (!CONFIGS[country]) {
        const countryConfig = JSON.parse(readFileSync(join(__dirname, '..', 'config', country + '.json'), 'utf8'));
        CONFIGS[country] = { ...baseConfig, ...countryConfig };
        CONFIGS[country].getFavicon = getFavicon;
        CONFIGS[country].getAppleFavicon = getAppleFavicon;
    }

    return CONFIGS[country];
}

export interface AppConfig {
    name: string
    country: string
    languages: string[]
    host: string
    domain: string

    getAppleFavicon: () => string
    getFavicon: (filename?: string) => string

    capitalId: string
    mainPlaces: string[]

    assets: {
		css: {
			main: string,
			pageWidget: string,
			errorPage: string,
		},
		js: {
			main: string,
			pageWidget: string,
		}
	}
}

function getFavicon(filename?: string) {
    filename = filename || 'favicon.ico';

    var name = this.domain.split('.')[0];
    name = ['click', 'zborg', 'diez'].indexOf(name) > -1 ? name : 'ournet';

    return 'https://assets.ournetcdn.net/ournet/img/icons/' + name + '/' + filename;
}
function getAppleFavicon() {
    return this.getFavicon('apple-touch-icon.png');
}
