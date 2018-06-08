
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import { BaseViewData } from '../view-data/data';

export default class PageLayout extends React.Component<PageViewData<BaseViewData>, any> {
    render() {
        const props = this.props;
        const { page, locale } = props;

        return (
            <html lang={props.locale.lang}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
                    <title>{page.title}</title>
                    {page.description && <meta name="description" content={page.description} />}
                    {page.headerElements}
                </head>
                <body className={`proj-weather country-${locale.country}`}>
                    <div className='o-wrapper'>
                        {props.children}
                    </div>
                </body>
            </html>
        )
    }
}
