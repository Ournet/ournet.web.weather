import { RootViewData } from "./root";
import { DataViewData, buildDataViewData } from "./data";

export function createHelpers(): ViewDataHelpers {
    return {
        buildDataViewData,
    };
}

export type ViewDataHelpers = {
    buildDataViewData: <DT={}>(knownData: RootViewData, data?: DT) => DataViewData<DT>
}
