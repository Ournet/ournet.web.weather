
import { AppConfig } from "../config";
import { ClientInfo } from "./client";
import { Sitemap } from "ournet.links";
import { ViewData, ViewDataData } from "@ournet/view-data";
import { OurnetQueryApi } from "../../../../packages/api-client/types";

export interface PageViewData<DT extends ViewDataData=ViewDataData> extends ViewData<DT, OurnetQueryApi<DT>> {
    locale: Locale
    config: AppConfig
    links: Sitemap
    __: (...params: any[]) => string
    client: ClientInfo
    page: PageViewDataInfo
}

export type PageViewDataInfo = {
    title?: string
    description?: string
    headerElements?: any[]
}

export type Locale = {
    lang: string
    country: string
}
