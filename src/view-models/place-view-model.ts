import {
    OurnetQueryApi,
    Place,
    ForecastReport,
    PlaceStringFields,
    ForecastReportStringFields,
    GraphQLRequestResult,
} from "@ournet/api-client";
import { IWeatherViewModel, WeatherViewModel } from "./weather-view-model";
import { createQueryApiClient } from "../data/api";
import { notFound } from "boom";

export interface IPlaceViewModel extends IWeatherViewModel {
    place: Place
    placeForecast: ForecastReport
}

export type PlaceViewModelInput = {
    id: number
}

export class PlaceViewModel<T extends IPlaceViewModel> extends WeatherViewModel<T> {

    async build(api: OurnetQueryApi<T>, input?: PlaceViewModelInput): Promise<T> {

        const localeApi = createQueryApiClient<{ place: Place }>();
        
        const result = await localeApi.placesPlaceById('place', {
            fields: PlaceStringFields,
        }, input).execute();

        if (!result.data || !result.data.place) {
            throw notFound(`Not found place=${input.id}`, input);
        }

        const place = this.model.place = result.data.place;
        
        api.weatherForecastReport('placeForecast', {
            fields: ForecastReportStringFields,
        },
            { place: { longitude: place.longitude, latitude: place.latitude, timezone: place.timezone } });

        return super.build(api);
    }

    protected formatModel(result: GraphQLRequestResult<T>): T {
        this.model.placeForecast = result.data.placeForecast;
        
        return super.formatModel(result);
    }
}
