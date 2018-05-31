import { RootViewData, buildRootViewData } from "./root";

export interface DataViewData<DT={}> extends RootViewData {
    data?: DT
}

export function buildDataViewData<DT={}>(knownData: DataViewData<DT>, data?: DT): DataViewData<DT> {
    const viewData = buildRootViewData<DataViewData<DT>>(knownData);
    viewData.data = data;

    return viewData;
}
