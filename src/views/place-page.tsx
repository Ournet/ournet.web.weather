
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import PageLayout from './page-layout';
import { LocalesNames } from '../locales';
import * as util from 'util';
import { PlaceHelper } from '../data/places/place-helper';
import Header from './components/header';
import Head from './components/default-head';
import { NextFunction, Response, Request } from 'express';
import { getViewData } from '../view-data';
import { renderPage } from '../renderer';
import { PlaceStringFields } from '@ournet/api-client';
import { createQueryApiClient } from '../data/api';
import PlacePageContent, { PlacePageData } from './place-page-content';
import { notFound } from 'boom';


export default class PlacePage extends React.Component<PageViewData<PlacePageData>> {
    render() {
        const props = this.props;
        const { page } = props;

        page.headerElements = [<Head key='1' {...props} />];

        return (
            <PageLayout {...props}>
                <Header {...props} />
                <PlacePageContent {...props} />
            </PageLayout>
        )
    }

    static initViewData(root: PageViewData<PlacePageData>, placeId: number): Promise<any> {
        const api = createQueryApiClient<PlacePageData>();
        const queryPlace = api.placesPlaceById('place', { fields: PlaceStringFields }, { id: placeId })
            .execute()
            .then(result => {
                if (!result.data.place) {
                    throw notFound(`Not found place id=${placeId}`);
                }
                const place = result.data.place;
                const { page, __, locale } = root;
                const lang = locale.lang;
                const placeName = PlaceHelper.getName(place, lang);
                const inPlaceName = PlaceHelper.inPlaceName(place, lang);
                
                page.title = util.format(__(LocalesNames.weather_item_head_title_format), inPlaceName, placeName);
                page.description = util.format(__(LocalesNames.weather_item_head_description_format), inPlaceName, placeName);

                return root.data.place = place;
            });

        return queryPlace.then(place => Promise.all([
            Header.initViewData(root),
            PlacePageContent.initViewData(root, place),
        ]));
    }

    static render(req: Request, res: Response, next: NextFunction, placeId: number) {
        const viewData = getViewData<PlacePageData>(req, res);
        const { api } = viewData;

        PlacePage.initViewData(viewData, placeId)
            .then(() => {
                return api.execute()
                    .then(result => {
                        viewData.data = { ...viewData.data, ...result.data };

                        renderPage(res, <PlacePage {...viewData} />);
                    })
            }).catch(next);
    }
}
