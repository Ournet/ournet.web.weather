
import { Request, Response } from "express";
import {
    RootViewModel,
} from "./root-view-model";
import {
    Place,
    HourlyForecastDataPoint,
    OurnetQueryApi,
    HourlyForecastDataPointStringFields,
    GraphQLRequestResult,
} from "@ournet/api-client";
import { createQueryApiClient } from "../data/api";
import { IPageViewModel } from "./page-view-model";
import logger from "../logger";

export interface IWeatherViewModel extends IPageViewModel {
    capital: Place
    capitalForecast: HourlyForecastDataPoint
}

export class WeatherViewModel<T extends IWeatherViewModel> extends RootViewModel<T> {

    constructor(req: Request, res: Response) {
        super(req, res);
        this.model.header = {
            elements: []
        };
    }

    async build(api: OurnetQueryApi<T>) {
        const localApiClient = createQueryApiClient<T>();

        const result = await localApiClient
            .placesPlaceById('capital', { fields: 'id name names longitude latitude timezone' },
                { id: this.model.config.capitalId })
            .execute();

        if (result.error && result.error.length) {
            logger.error(result.error[0]);
        }

        if (result.data && result.data.capital) {
            this.model.capital = result.data.capital

            const { longitude,
                latitude,
                timezone, } = this.model.capital;

            api.weatherNowPlaceForecast('capitalForecast', { fields: HourlyForecastDataPointStringFields },
                { place: { longitude, latitude, timezone } });
        }

        return super.build(api);
    }

    protected formatModel(result: GraphQLRequestResult<T>): T {
        if (result.data.capitalForecast) {
            this.model.capitalForecast = result.data.capitalForecast;
        }
        return super.formatModel(result);
    }
}
