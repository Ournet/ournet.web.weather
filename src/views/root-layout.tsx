
import * as React from 'react';
import PageHead from './components/page-head';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Header from './components/header/header';
import { LocalesNames, LocalesHelper } from '../locales-names';
import { Dictionary } from '@ournet/domain';
import { getSchema, getHost } from 'ournet.links';
const countryNames = require('../../country-names.json') as Dictionary<Dictionary<string>>;

export default class RootLayout extends React.Component<WeatherViewModel, any> {
    render() {
        const { lang, children, country, __, config, version, links } = this.props;

        return (
            <html lang={lang}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
                    <PageHead {...this.props} />
                    <link rel="dns-prefetch" href="//assets.ournetcdn.net" />
                    <link rel="dns-prefetch" href="//ajax.googleapis.com" />
                    <link rel="dns-prefetch" href="//tpc.googlesyndication.com" />
                    <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
                    <script dangerouslySetInnerHTML={{__html: `window.CONSTANTS={lang:"${lang}",country:"${country}"};`}}></script>
                </head>
                <body className={`proj-weather country-${country}`}>
                    <div className='o-wrapper'>
                        <Header {...this.props} />
                        {children}
                        <footer className='c-footer'>
                            <div className='o-layout'>
                                <div className='o-layout__item u-1/3@tablet'>
                                    <h4>{__(LocalesNames.info)}</h4>
                                    <div>{__(LocalesNames.contact)} <a href={'mailto:' + config.email}>{config.email}</a></div>
                                    <div>Version: {version}</div>
                                    <div>{__(LocalesNames.weather_cright)}</div>
                                </div>
                                <div className='o-layout__item u-1/3@tablet o-int-sites'>
                                    <h4>{__(LocalesNames.international)}</h4>
                                    {config.internationalIds.map(code => <div key={code}><a href={getSchema('weather', code) + '//' + getHost('weather', code) + links.weather.home({ ul: lang })}>{countryNames[code][lang]}</a></div>)}
                                </div>
                                <div className='o-layout__item u-1/3@tablet'>
                                    <h4>{__(LocalesNames.useful)}</h4>
                                    <div><a href={links.weather.widget({ ul: lang })}>{__(LocalesNames.weather_on_your_site)}</a></div>
                                    {config.projects.map(project => <div key={project}><a href={getSchema(project, country) + '//' + getHost(project, country)}>{LocalesHelper.getProjectName(__, project)}</a></div>)}
                                </div>
                            </div>
                        </footer>
                    </div>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </body>
            </html>
        )
    }
}
