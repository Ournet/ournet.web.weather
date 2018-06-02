
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import PageLayout from './page-layout';
import { LocalesNames } from '../locales';
import * as util from 'util';
import { PlaceHelper } from '../data/place-helper';
// import Breadcrumb from './components/breadcrumb';

export default class HomePage extends React.Component<PageViewData> {
    render() {
        const { page, __, locale } = this.props;
        const countryName = __('country_' + locale.country);
        const inCountryName = PlaceHelper.inCountryName(countryName, locale.lang);
        page.title = util.format(__(LocalesNames.home_title_format), inCountryName);
        page.description = util.format(__(LocalesNames.weather_in_cn_summary), inCountryName);
        // const headerElements = page.headerElements = page.headerElements || [];
        return (
            <PageLayout {...this.props}>
                <div className='o-layout'>
                    <div className='o-layout__item'>

                    </div>
                    <div className='o-layout__item'>

                    </div>
                </div>
            </PageLayout>
        )
    }
}
