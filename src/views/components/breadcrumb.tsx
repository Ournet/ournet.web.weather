
import * as React from 'react';

export type BreadcrumbViewData = {
    items: BreadcrumbItem[]
}

export type BreadcrumbItem = {
    url: string
    text: string
    title?: string
}

export default class BreadcrumbComponent extends React.Component<BreadcrumbViewData> {
    render() {
        const items: any[] = this.props.items.map((link, index) => {
            if (index === this.props.items.length - 1) {
                return <li key={index} aria-current="page" className="c-breadcrumb__item"><a href={link.url} title={link.title}>{link.text}</a></li>
            } else {
                return <li key={index} className="c-breadcrumb__item"><a href={link.url} title={link.title}>{link.text}</a>›</li>
            }
        });
        return (
            <nav aria-label="breadcrumb" className='c-breadcrumb'>
                <ol className='c-breadcrumb__list o-list-inline'>
                    {items}
                </ol>
            </nav>
        )
    }
}
