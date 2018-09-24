import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { Place, ForecastReport, PlaceStringFields, ForecastReportStringFields, PublicHoliday, PublicHolidayStringFields } from "@ournet/api-client";
import { PageViewModelInput } from "./page-view-model";
import { createQueryApiClient } from "../data/api";
import { notFound } from "boom";
import { unixTime } from "../utils";


export interface PlaceViewModel extends WeatherViewModel {
    place: Place
    placeForecast: ForecastReport
    holidays: PublicHoliday[]
}

export interface PlaceViewModelInput extends PageViewModelInput {
    id: string
}

export class PlaceViewModelBuilder<T extends PlaceViewModel> extends WeatherViewModelBuilder<T, PlaceViewModelInput> {

    async build() {
        const id = this.input.id;
        const { country, lang } = this.model;

        const localeApi = createQueryApiClient<{ place: Place }>();
        const result = await localeApi.placesPlaceById('place', {
            fields: PlaceStringFields,
        }, { id }).execute();

        if (!result.data || !result.data.place) {
            throw notFound(`Not found place=${id}`);
        }

        const place = this.model.place = result.data.place;

        this.api.weatherForecastReport('placeForecast', {
            fields: ForecastReportStringFields,
        },
            { place: { longitude: place.longitude, latitude: place.latitude, timezone: place.timezone } });

        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const startTime = unixTime(date);
        date.setUTCDate(date.getUTCDate() + 10);
        // const endTime = unixTime(date);

        this.api.publicHolidays('holidays', { fields: PublicHolidayStringFields },
            { country, lang, start: startTime });

        return super.build();
    }

    protected formatModel(data: T) {
        this.model.placeForecast = data.placeForecast;
        this.model.holidays = data.holidays || [];

        return super.formatModel(data);
    }
}
