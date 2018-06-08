
import * as React from 'react';
import LinkPlaceForecast, { LinkPlaceForecastViewData } from './link-place-forecast';
import { PageViewData } from '../../view-data/page';
import { createQueryApiClient } from '../../data/api';
import { ForecastHelpers } from '@ournet/weather-domain';
import { Place, PlaceStringFields, HourlyForecastDataPointStringFields } from '@ournet/api-client';
import { ViewDataData } from '@ournet/view-data';

export default class HeaderPlaceForecast extends React.Component<PageViewData> {
    render() {
        const props: LinkPlaceForecastViewData = {
            root: this.props,
            place: this.props.data.capital,
            forecast: this.props.data.capitalForecast,
        }
        return (
            <LinkPlaceForecast {...props} />
        )
    }

    static fillData<T extends ViewDataData>(root: PageViewData<T>): Promise<any> {
        const api = createQueryApiClient<{ capital: Place }>();
        return api.placesPlaceById('capital', { fields: PlaceStringFields }, { id: root.config.capitalId })
            .execute()
            .then(result => {
                const capital = result.data.capital;
                root.data.capital = capital;
                root.api
                    .weatherNowPlaceForecast('capitalForecast', { fields: HourlyForecastDataPointStringFields },
                        {
                            place: { timezone: capital.timezone, ...ForecastHelpers.normalizeReportId(capital) }
                        });
            });
    }
}
