
import * as React from 'react';
import Logo from './logo';
import Search from './search';
import { PageViewData } from '../../view-data/page';
import { BaseViewData } from '../../view-data/data';
import HeaderPlaceForecast from './header-place-forecast';

export default class HeaderComponent extends React.Component<PageViewData<BaseViewData>> {
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

    static fillData<T extends BaseViewData>(root: PageViewData<T>): Promise<any> {
        return Promise.all([
            HeaderPlaceForecast.fillData(root)
        ])
    }
}
