import { DataViewData, BaseViewData } from "./data";
import { OurnetQueryApi } from "@ournet/api-client";

export interface PageViewData<DT extends BaseViewData=BaseViewData> extends DataViewData<DT> {
    page: PageViewDataInfo
    api: OurnetQueryApi<DT>
}

export type PageViewDataInfo = {
    title: string
    description?: string
    headerElements?: any[]
}
