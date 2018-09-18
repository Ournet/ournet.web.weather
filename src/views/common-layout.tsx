import * as React from 'react';
import { WeatherViewModel } from '../view-models/weather-view-model';
import RootLayout from './root-layout';
import LeftMenuComponent from './components/left-menu';

export default class CommonLayout extends React.Component<WeatherViewModel> {
    render() {
        const { mainPlaces } = this.props;

        return (
            <RootLayout {...this.props}>
                <div className="o-layout">
                    <div className="o-layout__item u-1/5 u-hide-mobile">
                        <LeftMenuComponent root={this.props} canonical={this.props.head.canonical} places={mainPlaces} />
                    </div>
                    <div className="o-layout__item u-4/5 u-2/4@desktop">
                        {this.props.children}
                    </div>
                    <div className="o-layout__item u-1/4@desktop">
                        RiGHT
                    </div>
                </div>
            </RootLayout>
        )
    }
}
