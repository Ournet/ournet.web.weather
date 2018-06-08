import { NextFunction, Response, Request } from "express";
import { getViewData } from "../view-data";
import { PageViewData } from "../view-data/page";

export default function (req: Request, res: Response, next: NextFunction) {
    const viewData = getViewData<PageViewData>(req, res);

    viewData.page = {
        title: viewData.config.name,
    };

    next()
}
