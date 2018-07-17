
import * as React from 'react';
import { LocalesNames } from '../../locales';
import * as util from 'util';
import { PlaceHelper } from '../../data/places/place-helper';
import { IIndexViewModel } from '../../view-models/index-view-model';
import WeatherLayout from '../weather-layout';

export default class IndexPage extends React.Component<IIndexViewModel> {
    render() {
        const { country, lang, capital, header, __ } = this.props;
        const countryName = __('country_' + country);
        const inCountryName = PlaceHelper.inCountryName(countryName, lang);
        header.title = util.format(__(LocalesNames.home_title_format), inCountryName);
        header.description = util.format(__(LocalesNames.weather_in_cn_summary), inCountryName);

        return (
            <WeatherLayout {...this.props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item'>
                            {capital.name}
                        </div>
                        <div className='o-layout__item'>

                        </div>
                    </div>
                </main>
            </WeatherLayout>
        )
    }
}
