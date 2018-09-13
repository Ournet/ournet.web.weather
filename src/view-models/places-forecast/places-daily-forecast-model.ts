

import { Request, Response } from "express";
import {
    IRootViewModel,
    RootViewModel,
} from "../root-view-model";
import {
    Place,
    OurnetQueryApi,
    DailyForecastDataPointStringFields,
} from "@ournet/api-client";
import { createQueryApiClient } from "../../data/api";
import { PlaceDailyForecast } from "./places";

export interface IPlacesDailyForecastViewModel extends IRootViewModel {
    data: PlaceDailyForecast[]
}

export class PlacesDailyForecastViewModel<T extends IPlacesDailyForecastViewModel> extends RootViewModel<T> {
    constructor(req: Request, res: Response, private placesIds: string[], private date: number) {
        super(req, res);
    }

    async build(api: OurnetQueryApi<T>): Promise<T> {
        const localApiClient = createQueryApiClient<{ places: Place[] }>();

        const result = await localApiClient
            .placesPlacesByIds('places', { fields: 'id name names' }, { ids: this.placesIds })
            .execute();

        if (result.data && result.data.places) {
            const places = result.data.places.filter(place => !!place);

            const placesData = places.map(place => ({
                longitude: place.longitude,
                latitude: place.latitude,
                timezone: place.timezone,
            }));

            api.weatherDatePlacesForecast('data', { fields: DailyForecastDataPointStringFields }, { places: placesData, date: this.date });
        }

        return this.build(api);
    }
}
