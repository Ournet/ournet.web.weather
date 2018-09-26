
import * as React from 'react';
import PageTitle from '../components/page-title';
import { Share } from '../components/share';
import { WidgetViewModel } from '../../view-models/widget-view-model';
import RootLayout from '../root-layout';
import { LocalesNames } from '../../locales-names';

export default class WidgetPage extends React.Component<WidgetViewModel> {
    render() {
        const props = this.props;
        const { __, lang, config, head } = props;

        return (
            <RootLayout {...props}>
                <main>
                    <div className='o-layout'>
                        <div className='o-layout__item u-2/5@tablet'>
                            <PageTitle title={head.title} subTitle={head.description} />
                            <Share url={head.canonical} services={config.shareServices} lang={lang} />
                            <br/>
                            <br/>
                        </div>
                        <div className='o-layout__item u-3/5@tablet'>
                            <h3>{__(LocalesNames.preview)}</h3>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </main>
            </RootLayout>
        )
    }
}
