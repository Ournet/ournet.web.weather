
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import PageLayout from './page-layout';
import { LocalesNames } from '../locales';
import * as util from 'util';
import { PlaceHelper } from '../data/places/place-helper';
// import Breadcrumb from './components/breadcrumb';
import Header from './components/header';
import Head from './components/default-head';
import { Place } from '../data/places/place';

export type HomePageData = {
    capital: Place
}

export default class HomePage extends React.Component<PageViewData<HomePageData>> {
    render() {
        const props = this.props;
        const { page, __, locale, data } = props;
        const countryName = __('country_' + locale.country);
        const inCountryName = PlaceHelper.inCountryName(countryName, locale.lang);
        page.title = util.format(__(LocalesNames.home_title_format), inCountryName);
        page.description = util.format(__(LocalesNames.weather_in_cn_summary), inCountryName);

        page.headerElements = [<Head key='1' {...props} />];

        return (
            <PageLayout {...props}>
                <Header {...props} />
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item'>
                            {data.capital.name}
                        </div>
                        <div className='o-layout__item'>

                        </div>
                    </div>
                </main>
            </PageLayout>
        )
    }
}
