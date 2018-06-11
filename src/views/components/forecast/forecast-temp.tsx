
import * as React from 'react';

export type ForecastTempViewData = {
    temperature: number
}

export default class ForecastTemp extends React.Component<ForecastTempViewData> {
    render() {
        const { temperature } = this.props;
        return (
            <span className='c-temp'>
                <span className='c-temp__value'>{Math.round(temperature)}</span>
            </span>
        )
    }
}
