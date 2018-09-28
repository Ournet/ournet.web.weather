
import { Router } from 'express';
import { RootModelBuilder, RootViewModel } from '../view-models/root-view-model';
import { createQueryApiClient } from '../data/api';
import { Place, PlaceStringFields } from '@ournet/api-client';
import { placesDailyForecastHandler } from '../controllers/places-controller';
import { PlaceHelper } from '../data/places/place-helper';

const route: Router = Router();

export default route;

route.get('/controls/places-daily-forecast/:date(\\d{4}-\\d{2}-\\d{2})/:ids', (req, res, next) =>
    placesDailyForecastHandler({ req, res, date: req.params.date, ids: req.params.ids.split(',') }, next));

route.get('/controls/findplace', async (req, res) => {
    const q = req.query.q;
    if (!q || q.trim().length < 3) {
        return res.send([]);
    }
    const model = new RootModelBuilder({ req, res }).build() as RootViewModel;
    const { country, lang } = model;;

    const api = createQueryApiClient<{ places: Place[] }>();
    const placesResult = await api.placesSearchPlace("places",
        { fields: PlaceStringFields },
        { query: q.trim(), country, limit: 10, searchType: 'phrase_prefix' })
        .execute();

    if (!placesResult || !placesResult.data) {
        return res.send([]);
    }

    return res.send(placesResult.data.places.map(place => ({ id: place.id, name: PlaceHelper.getName(place, lang), admin: place.admin1 && PlaceHelper.getName(place.admin1, lang) })));
});
