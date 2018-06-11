
import * as React from 'react';
import { PageViewData } from '../../../view-data/page';
import { Place, ForecastReport } from '@ournet/api-client';
// import { ForecastHelpers } from '@ournet/weather-domain';
import HoursForecastLine from './hours-forecast-line';
import { tz } from 'moment-timezone';

export type PageForecastShortViewData = {
    root: PageViewData
    place: Place
    forecast: ForecastReport
}

export default class PageForecastShort extends React.Component<PageForecastShortViewData> {
    render() {
        const { place, forecast, root } = this.props;
        const tzStartDate = tz(new Date(), place.timezone);
        const tzStartTime = Math.round(tzStartDate.toDate().getTime() / 1000);
        let startIndex = forecast.details.data.findIndex(item => item.time >= tzStartTime);
        startIndex = startIndex > 0 ? startIndex : startIndex + 1;
        const linesData = forecast.details.data.splice(startIndex, 6);
        return (
            <div className='c-fc-short'>
                <div>{tzStartDate.format()}</div>
                {linesData.map(item => <HoursForecastLine key={item.time} root={root} forecast={item} place={place} />)}
            </div>
        )
    }
}
