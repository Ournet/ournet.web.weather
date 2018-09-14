
import { RootViewModel, RootViewModelInput } from "./root-view-model";
import { AsyncViewModelBuilder } from "./async-view-model";
import { OurnetQueryApi } from "@ournet/api-client";

export class PageViewModelBuilder<T extends PageViewModel, I extends PageViewModelInput> extends AsyncViewModelBuilder<T, I>{
    constructor(input: I, api: OurnetQueryApi<T>) {
        super(input, api);

        this.model.head = {
            title: this.model.config.name,
            elements: []
        };
    }
}

export interface PageViewModelInput extends RootViewModelInput {

}

export interface PageViewModel extends RootViewModel {
    head: PageHeadViewData
}

export interface PageHeadViewData {
    title?: string
    description?: string
    elements: JSX.Element[]
}
