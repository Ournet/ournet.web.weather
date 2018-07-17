
import * as React from 'react';
import LinkPlaceForecast, { PlaceLinkForecastViewData } from './place-link-forecast';
import { IWeatherViewModel } from '../../../view-models/weather-view-model';

export default class HeaderPlaceForecast extends React.Component<IWeatherViewModel> {
    render() {
        const props: PlaceLinkForecastViewData = {
            root: this.props,
            place: this.props.capital,
            forecast: this.props.capitalForecast,
        }
        return (
            <LinkPlaceForecast {...props} />
        )
    }
}
