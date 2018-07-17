
import {
    Place,
    DailyForecastDataPoint,
} from '@ournet/api-client';

export type PlaceDailyForecast = {
    place: Place,
    forecast: DailyForecastDataPoint,
}
