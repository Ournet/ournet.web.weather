
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { PageViewModelInput } from "./page-view-model";

export interface IndexViewModel extends WeatherViewModel {

}

export class IndexViewModelBuilder extends WeatherViewModelBuilder<IndexViewModel, PageViewModelInput> {

    build() {
        const { lang, links } = this.model;
        this.setCanonical(links.weather.home({ ul: lang }));
        return super.build();
    }
}
