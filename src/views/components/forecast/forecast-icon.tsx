
import * as React from 'react';
import { ForecastHelpers } from '@ournet/weather-domain';
import { PageViewData } from '../../../view-data/page';

export type ForecastIconViewData = {
    root: PageViewData
    icon: number
}

export default class ForecastTemp extends React.Component<ForecastIconViewData> {
    render() {
        const { icon, root } = this.props;
        const title = ForecastHelpers.iconName(icon, root.locale.lang);
        return (
            <i className={`c-fc-icon c_fc-icon__${icon}`} title={title} />
        )
    }
}
