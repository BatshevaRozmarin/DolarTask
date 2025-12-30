import React from 'react';

import { DifferenceTable } from '../Table/DifferenceTable';
import { ForecastTable } from '../Table/ForecastTable';
import { Graph } from '../Graph/Graph';
import { MonthlyRateTable } from '../Table/MonthlyRateTable';
import { processData } from '../../utils/processData';
import { RateRow } from '../../types/type';


export type ViewType =
  | 'Graph'
  | 'MonthlyRateTable'
  | 'ForecastTable'
  | 'DifferenceTable';

export const RenderView = (view: ViewType, data: RateRow[]) => {
  switch (view) {
    case 'Graph':
      return <Graph data={data} />;

    case 'ForecastTable':
      return <ForecastTable data={processData(data, 'ForecastTable')} />;

    case 'DifferenceTable':
      return <DifferenceTable data={processData(data, 'DifferenceTable')} />;

    case 'MonthlyRateTable':
      return <MonthlyRateTable data={processData(data, 'MonthlyRateTable')} />;

    default:
      return null;
  }
};
