
import * as React from 'react';
import { ForecastHelper } from '@ournet/weather-domain';
import { RootViewModel } from '../../../view-models/root-view-model';

export type ForecastIconViewData = {
    root: RootViewModel
    icon: number
}

export default class ForecastTemp extends React.Component<ForecastIconViewData> {
    render() {
        const { icon, root } = this.props;
        const title = ForecastHelper.iconName(icon, root.lang);
        return (
            <i className={`c-fc-icon c_fc-icon__${icon}`} title={title} />
        )
    }
}
