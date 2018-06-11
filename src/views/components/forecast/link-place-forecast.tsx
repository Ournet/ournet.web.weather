
import * as React from 'react';
import { Place, HourlyForecastDataPoint } from '@ournet/api-client';
import { PlaceHelper } from '../../../data/places/place-helper';
import ForecastTemp, { ForecastTempViewData } from './forecast-temp';
import { PageViewData } from '../../../view-data/page';


export type LinkPlaceForecastViewData = {
    root: PageViewData
    place: Place
    forecast: HourlyForecastDataPoint
}

export default class LinkPlaceForecast extends React.Component<LinkPlaceForecastViewData> {
    render() {
        const { links, locale } = this.props.root;
        const { place, forecast } = this.props;
        const placeName = PlaceHelper.getName(place, locale.lang);
        const temp: ForecastTempViewData = {
            temperature: forecast.temperature,
        }
        return (
            <a className='c-link-pfc' href={links.weather.place(place.id.toString(), { ul: locale.lang })}>
                <span className='c-link-pfc_name'>{placeName}</span>
                <ForecastTemp {...temp} />
            </a>
        )
    }
}
