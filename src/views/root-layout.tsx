
import * as React from 'react';
import PageHead from './components/page-head';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Header from './components/header/header';

export default class RootLayout extends React.Component<WeatherViewModel, any> {
    render() {
        const { lang, children, country } = this.props;

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
                </head>
                <body className={`proj-weather country-${country}`}>
                    <div className='o-wrapper'>
                        <Header {...this.props} />
                        {children}
                    </div>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </body>
            </html>
        )
    }
}
