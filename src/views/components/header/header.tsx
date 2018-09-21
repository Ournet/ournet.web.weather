
import * as React from 'react';
import Logo from './logo';
import Search from './search';
import HeaderPlaceForecast from '../forecast/header-place-forecast';
import { WeatherViewModel } from '../../../view-models/weather-view-model';
import MobileMenu from './mobile-menu';

export default class HeaderComponent extends React.Component<WeatherViewModel> {
    render() {
        const props = this.props;
        const placeForecast = props.capital && props.capitalForecast ? <HeaderPlaceForecast {...props} /> : null;
        return (
            <header className='c-header o-layout'>
                <div className='o-layout__item u-2/5 u-1/4@tablet'>
                    <Logo {...props} />
                </div>
                <div className='o-layout__item u-3/5 u-2/4@tablet o-layout'>
                    <div className="o-layout__item u-5/6">
                        <Search {...props} />
                    </div>
                    <div className="o-layout__item u-1/6 u-tr">
                        <MobileMenu {...props} />
                    </div>
                </div>
                <div className='o-layout__item u-1/4@tablet u-hide-mobile u-tr'>
                    {placeForecast}
                </div>
            </header>
        )
    }
}
