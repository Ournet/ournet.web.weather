
import * as React from 'react';
import { PageViewData } from '../view-data/page';
import PageComponent from './page';
import ListComponent from './list-component';

export default class HomeComponent extends React.Component<PageViewData, any> {
    render() {
        const props = this.props;
        const headNodes = props.head.elements = props.head.elements || [];
        headNodes.push(<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui" />);
        const rows: any[] = [];
        for (let i = 0; i < 100; i++) {
            rows.push(<tr><td>{i + 1}</td><td>{i + 10}</td></tr>)
        }
        return (
            <PageComponent {...props}>
                <div>
                    <h1>List 1</h1>
                    <ListComponent count={10} />
                    <h1>List 2</h1>
                    <ListComponent count={20} />
                    <h3>List 3</h3>
                    <ListComponent count={30} />
                    <h1>List 4</h1>
                    <ListComponent count={40} />
                    <h1>List 5</h1>
                    <ListComponent count={50} />
                    <h1>List 6</h1>
                    <ListComponent count={6000} />
                </div>
            </PageComponent>
        )
    }
}
