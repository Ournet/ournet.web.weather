
import * as React from 'react';
import Logo from './logo';
import Search from './search';
import { PageViewData } from '../../view-data/page';
import HeaderPlaceForecast from './header-place-forecast';
import { ViewDataData } from '@ournet/view-data';

export default class HeaderComponent extends React.Component<PageViewData> {
    render() {
        const props = this.props;
        return (
            <header className='c-header o-layout'>
                <div className='o-layout__item u-1/2 u-1/5@desktop'>
                    <Logo {...props} />
                </div>
                <div className='o-layout__item u-1/2 u-2/5@desktop'>
                    <Search {...props} />
                </div>
                <div className='o-layout__item u-1/2 u-2/5@desktop'>
                    <HeaderPlaceForecast {...props} />
                </div>
            </header>
        )
    }

    static fillData<T extends ViewDataData>(root: PageViewData<T>): Promise<any> {
        return Promise.all([
            HeaderPlaceForecast.fillData(root)
        ])
    }
}
