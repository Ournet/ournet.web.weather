
import * as React from 'react';

type LinkInfo = {
    url: string
    text: string
    title?: string
}

export default class BreadcrumbComponent extends React.Component<LinkInfo[]> {
    render() {
        const items: any[] = this.props.map((link, index) => {
            if (index === this.props.length - 1) {
                return <li aria-current="page" className="c-breadcrumb__item"><a href={link.url} title={link.title}>{link.text}</a></li>
            } else {
                return <li className="c-breadcrumb__item"><a href={link.url} title={link.title}>{link.text}</a>›</li>
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
