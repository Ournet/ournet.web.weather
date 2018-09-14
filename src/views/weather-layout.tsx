import * as React from 'react';
import { WeatherViewModel } from '../view-models/weather-view-model';
import env from '../env';
import PageLayout from './page-layout';
import Header from './components/header';

export default class WeatherLayout extends React.Component<WeatherViewModel> {
    render() {
        const { head, config } = this.props;

        if (env.isProduction) {
            head.elements.push(<link type="text/css" rel="stylesheet" href={`//assets.ournetcdn.net/ournet/css/weather/main-${config.assets.css.main}.css`} />);
        } else {
            head.elements.push(<link type="text/css" rel="stylesheet" href={`http://localhost:8080/css/weather/main.css`} />)
        }

        return (
            <PageLayout {...this.props}>
                <Header {...this.props} />
                {this.props.children}
            </PageLayout>
        )
    }
}
