import {
    OurnetQueryApi,
    Place,
    GraphQLRequestResult,
} from "@ournet/api-client";
import { IWeatherViewModel, WeatherViewModel } from "./weather-view-model";

export interface IPlacesViewModel extends IWeatherViewModel {
    places: Place[]
    placesAdmin1?: Place
}

export type PlacesViewModelInput = {
    admin1Code?: string
    countryCode?: string
    q?: string
}

export class PlacesViewModel<T extends IPlacesViewModel> extends WeatherViewModel<T> {

    async build(api: OurnetQueryApi<T>, input?: PlacesViewModelInput) {
        const { country } = this.model;

        if (input.admin1Code) {
            api.placesPlacesByAdmin1Code('places', { fields: 'id name names admin1Code featureClass' },
                { country, admin1Code: input.admin1Code, limit: 90 });
            api.placesAdmin1('placesAdmin1', { fields: 'id name names admin1Code featureClass' },
                { country, admin1Code: input.admin1Code });
        } else {
            api.placesAdmin1s('places', { fields: 'id name names admin1Code featureClass' },
                { country, limit: 90 });
        }

        return super.build(api);
    }

    protected formatModel(result: GraphQLRequestResult<T>): T {
        this.model.places = result.data.places;
        this.model.placesAdmin1 = result.data.placesAdmin1;
        return super.formatModel(result);
    }
}
