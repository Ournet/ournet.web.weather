
import * as React from 'react';
import env from '../../env';
import { PageViewData } from '../../view-data/page';

export default class DefaultHeadComponent extends React.Component<PageViewData> {
    render() {
        const props = this.props;
        const { config } = props;
        const elements: JSX.Element[] = []
        if (env.isProduction) {
            elements.push(<link key='1' type="text/css" rel="stylesheet" href={`//assets.ournetcdn.net/ournet/css/weather/main-${config.assets.css.main}.css`} />);
        }else{
            elements.push(<link key='2' type="text/css" rel="stylesheet" href={`http://localhost:8080/css/weather/main.css`} />)
        }
        return elements;
    }
}
