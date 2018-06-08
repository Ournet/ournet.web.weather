
import * as React from 'react';
import { PageViewData } from '../../view-data/page';

export default class HeaderLogoComponent extends React.Component<PageViewData> {
    render() {
        const { config, links, locale } = this.props;
        return (
            <div className='c-logo'>
                <a className='c-logo__link' href={links.weather.home({ ul: locale.lang })} title={config.name} />
            </div>
        )
    }
}
