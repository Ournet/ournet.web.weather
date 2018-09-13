
import * as React from 'react';
import { PlaceHelper } from '../../data/places/place-helper';
import { LocalesNames } from '../../locales';
import Breadcrumb, { BreadcrumbViewData } from '../components/breadcrumb';
import PageTitle, { PageTitleViewModel } from '../components/page-title';
import * as util from 'util';
import PlacesListComponent from './components/places-list';
import { IPlacesViewModel } from '../../view-models/places-view-model';
import WeatherLayout from '../weather-layout';


export default class PlacesPage extends React.Component<IPlacesViewModel> {
    render() {
        const props = this.props;
        const { __, lang, country, links, places, placesAdmin1, header, input } = props;
        const localeParams = { ul: lang };
        let title = util.format(__(LocalesNames.search_place_in_cn),
            PlaceHelper.inCountryName(__('country_' + country), lang));

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
                { text: __(LocalesNames.places), url: links.weather.places(localeParams) },
            ]
        };

        if (placesAdmin1) {
            breadcrumbData.items.push({
                text: PlaceHelper.getName(placesAdmin1, lang),
                url: links.weather.places.byAdm1(placesAdmin1.admin1Code, localeParams)
            })

            title = util.format(__(LocalesNames.search_place_in_cn_format),
                PlaceHelper.getName(placesAdmin1, lang), __('country_' + country));
        }

        const pageTitle: PageTitleViewModel = {
            title: title,
        }

        header.title = title;

        return (
            <WeatherLayout {...props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-3/4@desktop'>
                            <Breadcrumb {...breadcrumbData} />
                            <PageTitle {...pageTitle} />
                            <PlacesListComponent root={props} places={places} />
                        </div>
                        <div className='o-layout__item u-1/4@desktop'>
                            ADS
                        </div>
                    </div>
                </main>
            </WeatherLayout>
        )
    }
}
