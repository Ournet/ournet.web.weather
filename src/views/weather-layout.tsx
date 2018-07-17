import * as React from 'react';
import { IWeatherViewModel } from '../view-models/weather-view-model';
import env from '../env';
import PageLayout from './page-layout';
import Header from './components/header';

export default class WeatherLayout extends React.Component<IWeatherViewModel> {
    render() {
        const { header,config } = this.props;
        
        if (env.isProduction) {
            header.elements.push(<link type="text/css" rel="stylesheet" href={`//assets.ournetcdn.net/ournet/css/weather/main-${config.assets.css.main}.css`} />);
        } else {
            header.elements.push(<link type="text/css" rel="stylesheet" href={`http://localhost:8080/css/weather/main.css`} />)
        }

        return (
            <PageLayout {...this.props}>
                <Header {...this.props} />
                {this.props.children}
            </PageLayout>
        )
    }
}
