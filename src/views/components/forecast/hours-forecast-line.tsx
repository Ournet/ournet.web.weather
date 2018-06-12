
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
        const { forecast, place, root } = this.props;
        const date = moment.tz(forecast.time * 1000, place.timezone).locale(root.locale.lang);
        return (
            <div className='c-fc-hs-line'>
                <time dateTime={date.toISOString()}>{date.fromNow()}</time>
                <ForecastIcon root={this.props.root} icon={forecast.icon} />
                <ForecastTemp temperature={forecast.temperature} />
            </div>
        )
    }
}
