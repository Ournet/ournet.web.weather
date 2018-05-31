import { AppConfig } from "../config";

export interface RootViewData {
    locale: Locale
    config: AppConfig
    links: any
    __: (...params: any[]) => string
}

export type Locale = {
    lang: string
    country: string
}