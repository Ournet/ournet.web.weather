
import * as React from 'react';

export interface ListComponentProps {
    count: number
}

export default function (props: ListComponentProps) {
    const rows: any[] = [];
    for (let i = 0; i < props.count; i++) {
        rows.push(<tr><td>{i + 1}</td><td>{i + 10}</td></tr>)
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        No
                        </th>
                    <th>
                        Count
                        </th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
