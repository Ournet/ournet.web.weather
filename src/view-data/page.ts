import { RootViewData } from "./root";

export interface PageViewData extends RootViewData {
    head: PageViewDataHead
}

export type PageViewDataHead = {
    title: string
    description?: string
    elements?: any[]
}
