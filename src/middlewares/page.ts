import { NextFunction, Response, Request } from "express";
import { getPageViewData } from "../view-data";

export default function (_req: Request, res: Response, next: NextFunction) {
    const viewData = getPageViewData(res);
    viewData.page = {
        title: viewData.config.name,
    };
    
    next()
}
