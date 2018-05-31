import { Locale } from './root';
const Links = require('ournet.links');


const LINKS: { [index: string]: any } = {};

export function initLinks({ lang, country }: Locale) {
    if (!LINKS[country]) {
        LINKS[country] = Links.country(country, lang);
    }
    return LINKS[country];
}
