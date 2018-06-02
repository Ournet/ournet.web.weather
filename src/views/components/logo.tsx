
import * as React from 'react';
import { RootViewData } from '../../view-data/root';

export default class HeaderLogoComponent extends React.Component<RootViewData> {
    render() {
        const { config, links, locale } = this.props;
        return (
            <div className='c-logo'>
                <a className='c-logo__link' href={links.weather.home({ ul: locale.lang })} title={config.name} />
            </div>
        )
    }
}
