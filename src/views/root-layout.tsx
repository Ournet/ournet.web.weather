
import * as React from 'react';
import PageHead from './components/page-head';
import { WeatherViewModel } from '../view-models/weather-view-model';
import Header from './components/header/header';
import PageFooter from './components/page-footer';

export default class RootLayout extends React.Component<WeatherViewModel, any> {
    render() {
        const { lang, children, country } = this.props;

        return (
            <html lang={lang}>
                <PageHead {...this.props} />
                <body className={`proj-weather country-${country}`}>
                    <div className='o-wrapper'>
                        <Header {...this.props} />
                        {children}
                        <PageFooter {...this.props} />
                    </div>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </body>
            </html>
        )
    }
}
