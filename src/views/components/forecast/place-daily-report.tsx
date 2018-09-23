import * as React from 'react';
import { RootViewModel } from '../../../view-models/root-view-model';
import { Place, HoursForecastDataBlock, HoursForecastDataPoint } from '@ournet/api-client';
import * as moment from 'moment-timezone';
import PlaceDayReport from './place-day-report';

export type PlaceDailyReportPorps = {
    root: RootViewModel
    place: Place
    report: HoursForecastDataBlock
}

export default class PlaceDailyReport extends React.Component<PlaceDailyReportPorps>{
    render() {
        const daysData: HoursForecastDataPoint[][] = []
        const { place, report, root } = this.props;
        const timezone = place.timezone;
        let lastDay = -1;

        report.data.forEach(item => {
            let list = daysData[daysData.length - 1] || [];
            const date = moment(item.time * 1000).tz(timezone);
            if (lastDay !== date.date()) {
                list = [];
                daysData.push(list);
            }
            list.push(item);
            lastDay = date.date();
        });

        return daysData.map((dayData, index) => (
            <PlaceDayReport key={index} root={root} filter={index === 0} place={place} report={{ icon: 0, data: dayData }} />
        ))
    }
}
