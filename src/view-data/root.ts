import { AppConfig } from "../config";
import { ViewDataHelpers } from "./helpers";

export interface RootViewData {
    locale: Locale
    config: AppConfig
    links: any
    __: (...params: any[]) => string
    helpers: ViewDataHelpers
}

export function buildRootViewData<T extends RootViewData>(viewData: T): T {
    const data: RootViewData = {
        locale: viewData.locale,
        config: viewData.config,
        links: viewData.links,
        __: viewData.__,
        helpers: viewData.helpers,
    };

    return data as T;
}

export type Locale = {
    lang: string
    country: string
}