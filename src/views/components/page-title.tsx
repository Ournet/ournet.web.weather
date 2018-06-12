
import * as React from 'react';
import { PageViewData } from '../../view-data/page';

export type PageTitleViewData = {
    root: PageViewData
    title: string
    subTitle?: React.ReactNode
}

export default class PageTitleComponent extends React.Component<PageTitleViewData> {
    render() {
        const { title, subTitle } = this.props;
        return (
            <div className='c-page-title'>
                <h1>{title}</h1>
                {subTitle && <h2>{subTitle}</h2>}
            </div>
        )
    }
}
