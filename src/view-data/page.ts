import { DataViewData } from "./data";

export interface PageViewData<DT={}> extends DataViewData<DT> {
    page: PageViewDataInfo
}

export type PageViewDataInfo = {
    title: string
    description?: string
    headerElements?: any[]
}
