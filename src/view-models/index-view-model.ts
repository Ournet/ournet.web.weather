
import { WeatherViewModel, WeatherViewModelBuilder } from "./weather-view-model";
import { PageViewModelInput } from "./page-view-model";
import { badImplementation } from "boom";
import * as util from 'util';
import { LocalesNames } from "../locales-names";
import { PlaceHelper } from "../data/places/place-helper";

export interface IndexViewModelInput extends PageViewModelInput {
    listId?: string
}

export interface IndexViewModel extends WeatherViewModel {
    placeIds: string[]
}

export class IndexViewModelBuilder extends WeatherViewModelBuilder<IndexViewModel, IndexViewModelInput> {

    build() {
        return super.build();
    }

    protected formatModel(data: IndexViewModel) {
        const { mainPlaces } = data;

        const { lang, links, config, country, __, head } = this.model;

        if (this.input.listId) {
            if (!config.lists) {
                throw badImplementation(`Config doesn't contain lists`);
            }
            const list = config.lists.find(list => list.id === this.input.listId);
            if (!list) {
                throw badImplementation(`Config doesn't contain list ${this.input.listId}`);
            }
            this.model.placeIds = list.ids;
            this.model.head.title = list.title[lang];
            this.model.head.description = list.description[lang];
            this.setCanonical(links.weather.place(list.id, { ul: lang }));
        } else {

            this.model.placeIds = mainPlaces.map(item => item.id);

            const countryName = __('country_' + country);
            const inCountryName = PlaceHelper.inCountryName(countryName, lang);
            head.title = util.format(__(LocalesNames.home_title_format), inCountryName);
            head.description = util.format(__(LocalesNames.weather_in_cn_summary), inCountryName);

            this.setCanonical(links.weather.home({ ul: lang }));
        }

        return super.formatModel(data);
    }
}
