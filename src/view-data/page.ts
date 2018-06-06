import { DataViewData } from "./data";
import { OurnetApi } from "../data/api";

export interface PageViewData<DT={}> extends DataViewData<DT> {
    page: PageViewDataInfo
    api: OurnetApi<DT>
}

export type PageViewDataInfo = {
    title: string
    description?: string
    headerElements?: any[]
}
