import { NextFunction, Response, Request } from "express";
import { getPageViewData } from "../view-data";
import { createQueryApiClient } from "../data/api";

export default function (_req: Request, res: Response, next: NextFunction) {
    const viewData = getPageViewData(res);
    viewData.data = {};

    viewData.page = {
        title: viewData.config.name,
    };

    viewData.api = createQueryApiClient();

    next()
}
