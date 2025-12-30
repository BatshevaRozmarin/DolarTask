import React from 'react';
import Chart, { ArgumentAxis, CommonSeriesSettings, Legend, Label, Series, Tooltip } from 'devextreme-react/chart';

import { RateRow } from '../../types/type';


type GraphProps = {
    data: RateRow[];
};

export class Graph extends React.Component<GraphProps> {
    render() {
        return (
            <Chart
                dataSource={this.props.data}
                palette="Bright"
            >
                <ArgumentAxis argumentType="datetime">
                    <Label format="MMM yyyy" overlappingBehavior={{ mode: 'rotate', rotationAngle: -45 }} />
                </ArgumentAxis>

                <CommonSeriesSettings
                    type="line"
                    argumentField="monthdate"
                    valueField="averagedollarvalue"
                />
                <Series name="Average Rate" />
                <Tooltip enabled={true} format={{ type: 'fixedPoint', precision: 4 }} />
                <Legend visible={true} position="bottom" />
            </Chart>
        );
    }
}
