
import * as React from 'react';
import { PageViewData } from '../../../view-data/page';
import { HoursForecastDataPoint, Place } from '@ournet/api-client';
import ForecastIcon from './forecast-icon';
import ForecastTemp from './forecast-temp';
import * as moment from 'moment-timezone';

export type HoursForecastLineViewData = {
    root: PageViewData
    place: Place
    forecast: HoursForecastDataPoint
}

export default class HoursForecastLine extends React.Component<HoursForecastLineViewData> {
    render() {
        const { forecast, place } = this.props;
        const date = moment.tz(forecast.time * 1000, place.timezone);
        return (
            <div className='c-fc-hs-line'>
                {date.format()}
                <ForecastIcon root={this.props.root} icon={forecast.icon} />
                <ForecastTemp temperature={forecast.temperature} />
            </div>
        )
    }
}
