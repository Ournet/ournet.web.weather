import * as React from 'react';
import { IPageViewModel } from '../../view-models/page-view-model';

export default class PageHeadComponent extends React.Component<IPageViewModel> {
    render() {
        const { config, header } = this.props;

        let shortDomainName = config.domain.split('.')[0]
        shortDomainName = ['click', 'zborg', 'diez'].indexOf(shortDomainName) > -1 ? shortDomainName : 'ournet';

        const elements: JSX.Element[] = [
            <title>{header.title}</title>,
            <link rel='shortcut icon' href={`//assets.ournetcdn.net/ournet/img/icons/${shortDomainName}/favicon.ico`} type='image/x-icon' />,
            <link rel='apple-touch-icon' href={`//assets.ournetcdn.net/ournet/img/icons/${shortDomainName}/apple-touch-icon.png`} />,
        ]
        if (header.description) {
            elements.push(<meta name="description" content={header.description} />)
        }

        return elements.concat(header.elements);
    }
}
