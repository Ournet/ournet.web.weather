
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { Place } from "@ournet/api-client";
import { PageViewModelInput } from "./page-view-model";

export interface PlacesViewModel extends WeatherViewModel {
    places: Place[]
    placesAdmin1?: Place
    input: PlacesViewModelInput
}

export interface PlacesViewModelInput extends PageViewModelInput {
    admin1Code?: string
    countryCode?: string
    q?: string
}

export class PlacesViewModelBuilder extends WeatherViewModelBuilder<PlacesViewModel, PlacesViewModelInput> {

    async build() {
        const { country, input } = this.model;

        if (input.admin1Code) {
            this.api.placesPlacesByAdmin1Code('places', { fields: 'id name names admin1Code featureClass' },
                { country, admin1Code: input.admin1Code, limit: 90 });
            this.api.placesAdmin1('placesAdmin1', { fields: 'id name names admin1Code featureClass' },
                { country, admin1Code: input.admin1Code });
        } else {
            if (input.q && input.q.trim().length > 1) {
                this.api.placesSearchPlace('places', { fields: 'id name names admin1Code featureClass admin1 {id name names}' },
                    { query: input.q, limit: 9, country });
            } else {
                this.api.placesAdmin1s('places', { fields: 'id name names admin1Code featureClass' },
                    { country, limit: 90 });
            }
        }

        return super.build();
    }

    protected formatModel(data: PlacesViewModel) {
        this.model.places = data.places;
        this.model.placesAdmin1 = data.placesAdmin1;
        
        return super.formatModel(data);
    }
}
