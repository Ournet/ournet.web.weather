
import * as React from 'react';
import LinkPlaceForecast, { LinkPlaceForecastViewData } from './link-place-forecast';
import { PageViewData } from '../../view-data/page';
import { BaseViewData } from '../../view-data/data';
import { createQueryApiClient } from '../../data/api';
import { ForecastHelpers } from '@ournet/weather-domain';
import { Place, PlaceStringFields, HourlyForecastDataPointStringFields } from '@ournet/api-client';

export default class HeaderPlaceForecast extends React.Component<PageViewData<BaseViewData>> {
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

    static fillData<T extends BaseViewData>(root: PageViewData<T>): Promise<any> {
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
