
import * as React from 'react';
import { LocalesNames } from '../../locales-names';
import * as util from 'util';
import { PlaceHelper } from '../../data/places/place-helper';
import { IndexViewModel } from '../../view-models/index-view-model';
import CommonLayout from '../common-layout';

export default class IndexPage extends React.Component<IndexViewModel> {
    render() {
        const { country, lang, capital, head, __ } = this.props;
        const countryName = __('country_' + country);
        const inCountryName = PlaceHelper.inCountryName(countryName, lang);
        head.title = util.format(__(LocalesNames.home_title_format), inCountryName);
        head.description = util.format(__(LocalesNames.weather_in_cn_summary), inCountryName);

        const capitalView = capital ? capital.name : null;

        return (
            <CommonLayout {...this.props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item'>
                            {capitalView}
                        </div>
                        <div className='o-layout__item'>

                        </div>
                    </div>
                </main>
            </CommonLayout>
        )
    }
}
