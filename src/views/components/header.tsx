
import * as React from 'react';
import Logo from './logo';
import Search from './search';
import HeaderPlaceForecast from './forecast/header-place-forecast';
import { IWeatherViewModel } from '../../view-models/weather-view-model';

export default class HeaderComponent extends React.Component<IWeatherViewModel> {
    render() {
        const props = this.props;
        return (
            <header className='c-header o-layout'>
                <div className='o-layout__item u-1/2 u-1/3@tablet'>
                    <Logo {...props} />
                </div>
                <div className='o-layout__item u-1/2 u-1/3@tablet'>
                    <Search {...props} />
                </div>
                <div className='o-layout__item u-1/3@tablet u-hide-mobile'>
                    <HeaderPlaceForecast {...props} />
                </div>
            </header>
        )
    }
}
