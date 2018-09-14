
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { PageViewModelInput } from "./page-view-model";

export interface IndexViewModel extends WeatherViewModel {

}

export class IndexViewModelBuilder extends WeatherViewModelBuilder<IndexViewModel, PageViewModelInput> {

    build() {
        return super.build();
    }
}
