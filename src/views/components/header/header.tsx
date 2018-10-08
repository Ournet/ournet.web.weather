
import * as React from 'react';
import Logo from './logo';
import Search from './search';
import { WeatherViewModel } from '../../../view-models/weather-view-model';
import MobileMenu from './mobile-menu';
import CapitalForecast from './capital-forecast';

export default class HeaderComponent extends React.Component<WeatherViewModel> {
    render() {
        const { capital, capitalForecast } = this.props;
        const placeForecast = capital && capitalForecast
            ? <CapitalForecast root={this.props} place={capital} forecast={capitalForecast} />
            : null;
        return (
            <header className='c-header o-layout o-layout--small'>
                <div className='o-layout__item u-2/6 u-1/6@tablet'>
                    <Logo {...this.props} />
                </div>
                <div className='o-layout__item u-4/6 u-3/6@tablet'>
                    <div className='c-header__item o-layout'>
                        <div className="o-layout__item u-5/6">
                            <Search {...this.props} />
                        </div>
                        <div className="o-layout__item u-1/6 u-tr">
                            <MobileMenu {...this.props} />
                        </div>
                    </div>
                </div>
                <div className='o-layout__item u-2/6@tablet u-hide-mobile u-tr'>
                    {placeForecast}
                </div>
            </header>
        )
    }
}
