
import * as React from 'react';
import PageHead from './components/page-head';
import { IPageViewModel } from '../view-models/page-view-model';

export default class PageLayout extends React.Component<IPageViewModel, any> {
    render() {
        const { lang, children, country } = this.props;

        return (
            <html lang={lang}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
                    <PageHead {...this.props} />
                </head>
                <body className={`proj-weather country-${country}`}>
                    <div className='o-wrapper'>
                        {children}
                    </div>
                </body>
            </html>
        )
    }
}
