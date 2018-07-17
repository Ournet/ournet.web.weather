
import {
    OurnetQueryApi,
} from "@ournet/api-client";
import { IWeatherViewModel, WeatherViewModel } from "./weather-view-model";

export interface IIndexViewModel extends IWeatherViewModel {

}

export class IndexViewModel<T extends IIndexViewModel> extends WeatherViewModel<T> {

    async build(api: OurnetQueryApi<T>): Promise<T> {
        return super.build(api);
    }
}
