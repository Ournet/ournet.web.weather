import * as React from 'react';
import { PageViewModel } from '../../view-models/page-view-model';
import env from '../../env';

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

        if (env.isProduction) {
            elements.push(<link type="text/css" rel="stylesheet" href={`//assets.ournetcdn.net/ournet/css/weather/main-${config.assets.css.main}.css`} />);
        } else {
            elements.push(<link type="text/css" rel="stylesheet" href={`http://localhost:8080/css/weather/main.css`} />)
        }
        if (env.isProduction) {
            elements.push(<script async={true} src={`//assets.ournetcdn.net/ournet/css/weather/main-${config.assets.js.main}.js`} />);
        } else {
            elements.push(<script async={true} src={`http://localhost:8080/js/weather/main.js`} />)
        }
        if (head.canonical) {
            elements.push(<link rel="canonical" href={head.canonical} />)
        }

        return elements.concat(head.elements);
    }
}
