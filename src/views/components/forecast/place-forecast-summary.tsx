
import * as React from 'react';
import { PageViewData } from '../../../view-data/page';
import { Place, ForecastReport } from '@ournet/api-client';
import PlaceForecastCard from './place-forecast-card';
import PlaceForecastShort from './place-forecast-short';

export type PlaceForecastSummaryViewData = {
    root: PageViewData
    place: Place
    forecast: ForecastReport
}

export default class PlaceForecastSummary extends React.Component<PlaceForecastSummaryViewData> {
    render() {
        return (
            <div className='c-fc-sum u-layout'>
                <div className='u-1/1 u-1/2@tablet'>
                    <PlaceForecastCard {...this.props} />
                </div>
                <div className='u-1/1 u-1/2@tablet'>
                    <PlaceForecastShort {...this.props} />
                </div>
            </div>
        )
    }
}
