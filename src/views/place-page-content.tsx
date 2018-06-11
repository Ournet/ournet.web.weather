
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import Breadcrumb, { BreadcrumbViewData } from './components/breadcrumb';
import { ViewDataData } from '@ournet/view-data';
import { Place, ForecastReport, ForecastReportStringFields } from '@ournet/api-client';
import { ForecastHelpers } from '@ournet/weather-domain';
import { LocalesNames } from '../locales';
import { PlaceHelper } from '../data/places/place-helper';
import PageTitle, { PageTitleViewData } from './components/page-title';
import PlaceForecastCard from './components/forecast/place-forecast-card';
import PlaceForecastShort from './components/forecast/place-forecast-short';

export interface PlacePageData extends ViewDataData {
    place: Place
    forecast: ForecastReport
}


export default class PlacePageContent extends React.Component<PageViewData<PlacePageData>> {
    render() {
        const props = this.props;
        const { __, locale, links } = props;
        const { place, forecast } = props.data;
        const localeParams = { ul: locale.lang };

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
                { text: PlaceHelper.getName(place.admin1, locale.lang), url: links.weather.places.byAdm1(place.admin1Code, localeParams) },
                { text: PlaceHelper.getName(place, locale.lang), url: links.weather.place(place.id.toString(), localeParams) },
            ]
        };

        const pageTitle: PageTitleViewData = {
            root: this.props,
            title: place.name,
        }

        return (
            <main>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/1 u-3/4@desktop u-3/4@tablet'>
                        <Breadcrumb {...breadcrumbData} />
                        <PageTitle {...pageTitle} />
                        <div className='o-layout'>
                            <div className='o-layout__item u-1/1 u-1/2@tablet'>
                                <PlaceForecastCard root={this.props} place={place} forecast={forecast} />
                            </div>
                            <div className='o-layout__item u-1/1 u-1/2@tablet'>
                                <PlaceForecastShort root={this.props} place={place} forecast={forecast} />
                            </div>
                        </div>
                    </div>
                    <div className='o-layout__item u-1/1 u-1/4@desktop u-1/4@tablet'>
                        ADS
                    </div>
                </div>
            </main>
        )
    }

    static initViewData(root: PageViewData<PlacePageData>, place: Place): Promise<any> {
        const placeData = ForecastHelpers.normalizeReportId(place);

        root.api.weatherForecastReport('forecast', { fields: ForecastReportStringFields }, {
            place: {
                timezone: place.timezone,
                ...placeData
            }
        });

        return Promise.resolve();
    }
}
