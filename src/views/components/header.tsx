
import * as React from 'react';
import { RootViewData } from '../../view-data/root';
import Logo from './logo';
import Search from './search';

export default class HeaderComponent extends React.Component<RootViewData> {
    render() {
        const props=this.props;
        return (
            <header className='c-header o-layout'>
                <div className='o-layout__item o-1/2 o-1/5@desktop'>
                    <Logo {...props} />
                </div>
                <div className='o-layout__item o-1/2 o-2/5@desktop'>
                    <Search {...props} />
                </div>
            </header>
        )
    }
}
