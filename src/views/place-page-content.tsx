
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
import PlaceDailyForecast from './components/forecast/place-daily-forecast';
import * as util from 'util';

export interface PlacePageData extends ViewDataData {
    place: Place
    forecast: ForecastReport
}


export default class PlacePageContent extends React.Component<PageViewData<PlacePageData>> {
    render() {
        const props = this.props;
        const { __, locale, links, page } = props;
        const { place, forecast } = props.data;
        const localeParams = { ul: locale.lang };

        const adm1Name = PlaceHelper.getName(place.admin1, locale.lang);
        const placeName = PlaceHelper.getName(place, locale.lang);
        const inPlaceName = PlaceHelper.inPlaceName(place, locale.lang);

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
                { text: adm1Name, url: links.weather.places.byAdm1(place.admin1Code, localeParams) },
                { text: placeName, url: links.weather.place(place.id.toString(), localeParams) },
            ]
        };

        const pageTitle: PageTitleViewData = {
            root: this.props,
            title: util.format(__(LocalesNames.weather_title_format, inPlaceName)),
            subTitle: page.description,
        }

        return (
            <main>
                <div className='o-layout'>
                    <div className='o-layout__item u-1/1 u-3/4@desktop'>
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
                    <div className='o-layout__item u-1/1 u-1/4@desktop'>
                        ADS
                    </div>
                </div>
                <h2>Vremea pentru următoarele zile</h2>
                <PlaceDailyForecast root={this.props} forecast={forecast.daily} place={place} />
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
