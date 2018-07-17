
import * as React from 'react';
import { IRootViewModel } from '../../view-models/root-view-model';

export default class HeaderLogoComponent extends React.Component<IRootViewModel> {
    render() {
        const { config, links, lang } = this.props;
        return (
            <div className='c-logo'>
                <a className='c-logo__link' href={links.weather.home({ ul: lang })} title={config.name} />
            </div>
        )
    }
}
