
import * as React from 'react';
import { PageViewData } from '../view-data/page';

export default class PageLayout extends React.Component<PageViewData, any> {
    render() {
        const props = this.props;
        const page = props.page;

        return (
            <html lang={props.locale.lang}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />
                    <title>{page.title}</title>
                    {page.description && <meta name="description" content={page.description} />}
                    {page.headerElements}
                </head>
                <body>
                    {props.children}
                </body>
            </html>
        )
    }
}
