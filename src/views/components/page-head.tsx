import * as React from 'react';
import { PageViewModel } from '../../view-models/page-view-model';

export default class PageHeadComponent extends React.Component<PageViewModel> {
    render() {
        const { config, head } = this.props;

        let shortDomainName = config.domain.split('.')[0]
        shortDomainName = ['click', 'zborg', 'diez'].indexOf(shortDomainName) > -1 ? shortDomainName : 'ournet';

        const elements: JSX.Element[] = [
            <title>{head.title}</title>,
            <link rel='shortcut icon' href={`//assets.ournetcdn.net/ournet/img/icons/${shortDomainName}/favicon.ico`} type='image/x-icon' />,
            <link rel='apple-touch-icon' href={`//assets.ournetcdn.net/ournet/img/icons/${shortDomainName}/apple-touch-icon.png`} />,
        ]
        if (head.description) {
            elements.push(<meta name="description" content={head.description} />)
        }

        return elements.concat(head.elements);
    }
}
