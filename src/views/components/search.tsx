
import * as React from 'react';
import { RootViewData } from '../../view-data/root';
import { LocalesNames } from '../../locales';

export default class HeaderSearchComponent extends React.Component<RootViewData> {
    render() {
        const { links, __, locale } = this.props;
        return (
            <div className='c-search'>
                <form method='get' className='c-search__form' action={links.weather.search({ ul: locale.lang })}>
                    <input type='text' name='q' className='c-search__input' placeholder={__(LocalesNames.search_text)} />
                    <a className='c-search__btn js-search__btn' href='#' />
                </form>
            </div>
        )
    }
}
