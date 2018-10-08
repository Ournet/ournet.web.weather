
import * as React from 'react';
import PageHead from './components/page-head';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Header from './components/header/header';
import PageFooter from './components/page-footer';
import AccentLine from './components/accent-line';

export default class RootLayout extends React.Component<WeatherViewModel, any> {
    render() {
        const { lang, children, country, config } = this.props;

        return (
            <html lang={lang}>
                <PageHead {...this.props} />
                <body className={`proj-weather country-${country}`}>
                    <AccentLine />
                    <div className='o-wrapper o-wrapper--small'>
                        <Header {...this.props} />
                        {children}
                    </div>
                    <PageFooter {...this.props} />
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <script dangerouslySetInnerHTML={{__html:`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', '${config.googleAnalyticsId}', '${config.domain}');
ga('set', 'dimension1', 'weather');
ga('send', 'pageview');`}}></script>
                </body>
            </html>
        )
    }
}
