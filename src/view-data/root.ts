import { AppConfig } from "../config";
import { ClientInfo } from "./client";
import { Sitemap } from "ournet.links";

export interface RootViewData {
    locale: Locale
    config: AppConfig
    links: Sitemap
    __: (...params: any[]) => string
    client: ClientInfo
}

export function buildRootViewData<T extends RootViewData>(viewData: T): T {
    const data: RootViewData = {
        locale: viewData.locale,
        config: viewData.config,
        links: viewData.links,
        __: viewData.__,
        client: viewData.client,
    };

    return data as T;
}

export type Locale = {
    lang: string
    country: string
}