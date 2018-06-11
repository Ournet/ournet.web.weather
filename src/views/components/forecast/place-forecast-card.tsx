
import * as React from 'react';
import { PageViewData } from '../../../view-data/page';
import { Place, ForecastReport } from '@ournet/api-client';

export type PageForecastCardViewData = {
    root: PageViewData
    place: Place
    forecast: ForecastReport
}

export default class PageForecastCard extends React.Component<PageForecastCardViewData> {
    render() {
        const { place } = this.props;
        return (
            <div className='c-fc-card'>
                {place.name} Forecast card
            </div>
        )
    }
}
