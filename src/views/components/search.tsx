
import * as React from 'react';
import { LocalesNames } from '../../locales';
import { PageViewData } from '../../view-data/page';

export default class HeaderSearchComponent extends React.Component<PageViewData> {
    render() {
        const { links, __, locale } = this.props;
        return (
            <form method='get' className='c-search' action={links.weather.search({ ul: locale.lang })}>
                <input type='text' name='q' className='c-search__input' placeholder={__(LocalesNames.search_text)} />
                <a className='c-search__btn js-search__btn' href='#' />
            </form>
        )
    }
}
