import { IRootViewModel } from "./root-view-model";

export interface IPageViewModel extends IRootViewModel {
    header: IPageHeaderViewModel
}

export interface IPageHeaderViewModel {
    title?: string
    description?: string
    elements: JSX.Element[]
}
