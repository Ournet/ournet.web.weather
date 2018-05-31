import { NextFunction, Response, Request } from "express";
// import { getViewData } from "../view-data";

export default function (_req: Request, _res: Response, next: NextFunction) {
    // const viewData = getViewData(res);
    next()
}
