
import { initAppConfig } from './init-config';
import { initLoacel } from './init-locale';
import { initLinks } from './init-links';
import { initClient } from './client';
import { PageViewData } from './page';
import { createQueryApiClient } from '../data/api';
import { ViewDataData, ViewData, QueryApi } from '@ournet/view-data';

export default function <D extends ViewDataData, Q extends QueryApi<D>, T extends ViewData<D, Q>>(req: any, res: any) {
    const config = initAppConfig(req);
    const locale = initLoacel(req, res, config);
    const links = initLinks(config.languages[0]);
    const client = initClient(req);

    const viewData: PageViewData<D> = {
        __: res.__,
        locale,
        config,
        links,
        client,
        api: createQueryApiClient<D>(),
        page: {},
        data: {} as D,
    };

    return <any>viewData as T;
}
