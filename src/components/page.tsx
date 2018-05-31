
import * as React from 'react';
import { PageViewData } from '../view-data/page';

export default class PageComponent extends React.Component<PageViewData, any> {
    render() {
        const props = this.props;
        const head = props.page;

        return <html lang={props.locale.lang}>
            <head>
                <meta charSet="utf-8" />
                <title>{head.title}</title>
                {head.description && <meta name="description" content={head.description} />}
                {head.headerElements}
            </head>
            <body>
                {props.children}
            </body>
        </html>;
    }
}
