import { GraphQlQuery, GraphQLQueryItemInput, GraphQLQueryExecutor } from "./graphql-query";

export type TimezoneGeoPoint = {
    latitude: number
    longitude: number
    timezone: string
}

export class OurnetQueryApi extends GraphQlQuery {
    constructor(executor: GraphQLQueryExecutor) {
        super(executor, 'query');
    }
    
    weatherForecastReport(item: GraphQLQueryItemInput, place: TimezoneGeoPoint): this {
        return this.addQueryItem({
            fields: item.fields, name: 'weather_forecastReport', outName: item.name,
            variables: [{ name: 'place', value: place, type: 'TimezoneGeoPoint!' }]
        });
    }
    weatherNowPlaceForecast(item: GraphQLQueryItemInput, place: TimezoneGeoPoint): this {
        return this.addQueryItem({
            fields: item.fields, name: 'weather_nowPlaceForecast', outName: item.name,
            variables: [{ name: 'place', value: place, type: 'TimezoneGeoPoint!' }]
        });
    }
    weatherDatePlacesForecast(item: GraphQLQueryItemInput, places: TimezoneGeoPoint[], date: number): this {
        return this.addQueryItem({
            fields: item.fields, name: 'weather_datePlacesForecast', outName: item.name,
            variables: [
                { name: 'places', value: places, type: '[TimezoneGeoPoint]!' },
                { name: 'date', value: date, type: 'Int!' },
            ]
        });
    }

    placesPlaceById(item: GraphQLQueryItemInput, id: number): this {
        return this.addQueryItem({
            fields: item.fields, name: 'places_placeById', outName: item.name,
            variables: [{ name: 'id', value: id, type: 'Int!' }]
        });
    }
}