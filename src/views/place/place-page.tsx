
import * as React from 'react';
import { LocalesNames } from '../../locales';
import * as util from 'util';
import { PlaceHelper } from '../../data/places/place-helper';
import WeatherLayout from '../weather-layout';
import { IPlaceViewModel } from '../../view-models/place-view-model';
import { PageTitleViewModel } from '../components/page-title';
import Breadcrumb, { BreadcrumbViewData } from '../components/breadcrumb';
import PageTitle from '../components/page-title';
import PlaceForecastCard from '../components/forecast/place-forecast-card';
import PlaceForecastShort from '../components/forecast/place-forecast-short';
import PlaceDailyForecast from '../components/forecast/place-daily-forecast';


export default class PlacePage extends React.Component<IPlaceViewModel> {
    render() {
        const props = this.props;
        const { __, lang, links, header, place, placeForecast } = props;
        const localeParams = { ul: lang };

        const adm1Name = PlaceHelper.getName(place.admin1, lang);
        const placeName = PlaceHelper.getName(place, lang);
        const inPlaceName = PlaceHelper.inPlaceName(place, lang);

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
                { text: adm1Name, url: links.weather.places.byAdm1(place.admin1Code, localeParams) },
                { text: placeName, url: links.weather.place(place.id.toString(), localeParams) },
            ]
        };

        const pageTitle: PageTitleViewModel = {
            title: util.format(__(LocalesNames.weather_title_format, inPlaceName)),
            subTitle: header.description,
        }

        return (
            <WeatherLayout {...props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-1/1 u-3/4@desktop'>
                            <Breadcrumb {...breadcrumbData} />
                            <PageTitle {...pageTitle} />
                            <div className='o-layout'>
                                <div className='o-layout__item u-1/1 u-1/2@tablet'>
                                    <PlaceForecastCard root={this.props} place={place} forecast={placeForecast} />
                                </div>
                                <div className='o-layout__item u-1/1 u-1/2@tablet'>
                                    <PlaceForecastShort root={this.props} place={place} forecast={placeForecast} />
                                </div>
                            </div>
                        </div>
                        <div className='o-layout__item u-1/1 u-1/4@desktop'>
                            ADS
                    </div>
                    </div>
                    <h2>Vremea pentru următoarele zile</h2>
                    <PlaceDailyForecast root={this.props} forecast={placeForecast.daily} place={place} />
                </main>
            </WeatherLayout>
        )
    }
}
