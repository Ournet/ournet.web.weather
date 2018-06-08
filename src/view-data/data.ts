import { RootViewData, buildRootViewData } from "./root";

export interface BaseViewData {
    [index: string]: any
}

export interface DataViewData<DT=BaseViewData> extends RootViewData {
    data?: DT
}

export function buildDataViewData<DT=BaseViewData>(knownData: DataViewData<DT>, data?: DT): DataViewData<DT> {
    const viewData = buildRootViewData<DataViewData<DT>>(knownData);
    viewData.data = data;

    return viewData;
}
