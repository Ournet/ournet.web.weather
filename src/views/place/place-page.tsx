
import * as React from 'react';
import { LocalesNames } from '../../locales-names';
import * as util from 'util';
import { PlaceHelper } from '../../data/places/place-helper';
import CommonLayout from '../common-layout';
import { PlaceViewModel } from '../../view-models/place-view-model';
import { PageTitleViewModel } from '../components/page-title';
import Breadcrumb, { BreadcrumbViewData } from '../components/breadcrumb';
import PageTitle from '../components/page-title';
import PlaceDailyReport from '../components/forecast/place-daily-report';


export default class PlacePage extends React.Component<PlaceViewModel> {
    render() {
        const props = this.props;
        const { __, lang, links, head, place, placeForecast } = props;
        if (!placeForecast || !placeForecast.details) {
            return null;
        }
        const localeParams = { ul: lang };

        const breadcrumbData: BreadcrumbViewData = {
            items: [
                { text: __(LocalesNames.weather), url: links.weather.home(localeParams) },
            ]
        };

        if (place.admin1) {
            const adm1Name = PlaceHelper.getName(place.admin1, lang);
            breadcrumbData.items.push({ text: adm1Name, url: links.weather.places.byAdm1(place.admin1Code, localeParams) });
        }

        const placeName = PlaceHelper.getName(place, lang);
        const inPlaceName = PlaceHelper.inPlaceName(place, lang);
        breadcrumbData.items.push({ text: placeName, url: links.weather.place(place.id.toString(), localeParams) });

        const pageTitle: PageTitleViewModel = {
            title: util.format(__(LocalesNames.weather_title_format, inPlaceName)),
            subTitle: head.description,
        }

        return (
            <CommonLayout {...props}>
                <main>
                    <Breadcrumb {...breadcrumbData} />
                    <PageTitle {...pageTitle} />

                    <PlaceDailyReport root={this.props} report={placeForecast.details} place={place} />
                </main>
            </CommonLayout>
        )
    }
}
