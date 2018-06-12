
import * as React from 'react';
import { PageViewData } from '../../../view-data/page';
import { Place, DailyForecastDataBlock } from '@ournet/api-client';
import ForecastIcon from './forecast-icon';
// import { ForecastHelpers } from '@ournet/weather-domain';
import { tz } from 'moment-timezone';
import ForecastTemp from './forecast-temp';
import { ForecastHelpers } from '@ournet/weather-domain';

export type PlaceDailyForecastViewData = {
    root: PageViewData
    place: Place
    forecast: DailyForecastDataBlock
}

export default class PlaceDailyForecast extends React.Component<PlaceDailyForecastViewData> {
    render() {
        const { place, forecast, root } = this.props;
        const lang = root.locale.lang;
        const items = forecast.data.map(data => {
            const date = tz(data.time * 1000, place.timezone).locale(lang);
            const isWeekend = [6, 7].includes(date.isoWeekday())
            return (
                <li key={data.time} className={`c-fc-daily__item${isWeekend ? ' c-fc-daily--weekend' : ''}`}>
                    <div className='c-fc-daily__date'>{date.format('ddd D MMM')}</div>
                    <div className='c-fc-daily__body'>
                        <ForecastIcon icon={data.icon} root={root} />
                        <ForecastTemp temperature={data.temperatureHigh} />
                        {data.temperatureLow ? <ForecastTemp temperature={data.temperatureLow} /> : null}
                        <div className='c-fc-daily__name'>{ForecastHelpers.iconName(data.icon, lang)}</div>
                    </div>
                </li>
            );
        });
        return (
            <ul className='c-fc-daily'>
                {items}
            </ul>
        )
    }
}
