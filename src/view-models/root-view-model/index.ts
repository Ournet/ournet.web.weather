
import { Sitemap } from "ournet.links";
import { Request, Response } from "express";
import { AppConfig } from "../../config";
import { initLocale } from "../locale";
import { initAppConfig } from "./init-config";
import { initLinks } from "./init-links";
// import { IViewModelBuilder } from "../model-builder";
import { OurnetQueryApi, GraphQLRequestResult } from "@ournet/api-client";
import { badImplementation } from "boom";

export interface IRootViewModel {
    // locale: Locale
    lang: string
    country: string
    config: AppConfig
    links: Sitemap
    __: (...params: any[]) => string
    // api: OurnetQueryApi<D>,
    // client: ClientInfo
}

export class RootViewModel<T extends IRootViewModel> {
    protected model: T

    protected constructor(req: Request, res: Response) {
        const config = initAppConfig(req);
        const locale = initLocale(req, res, config);

        this.model = {
            __: res.__,
            config,
            lang: locale.lang,
            country: locale.country,
            links: initLinks(config.languages[0]),
        } as T;
    }

    protected formatModel(_result: GraphQLRequestResult<T>): T {
        return this.model;
    }

    async build(api: OurnetQueryApi<T>) {
        const data = await api.execute();
        if (data.errors) {
            throw badImplementation(data.errors[0].message);
        }
        return this.formatModel(data);
    }
}
