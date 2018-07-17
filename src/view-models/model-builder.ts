
import { OurnetQueryApi } from "@ournet/api-client";

export interface IViewModelBuilder<T, I=void> {
    build(api: OurnetQueryApi<T>, input: I): Promise<T> | T
}
