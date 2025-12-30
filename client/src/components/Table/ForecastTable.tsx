import React from 'react';

import { RateRow } from '../../types/type';
import './Table.css';


type ForecastTableProps = {
  data: RateRow[];
};

export const ForecastTable: React.FC<ForecastTableProps> = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Average USD → ILS</th>
          <th>Forecast (3 months avg)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              {row.monthdate instanceof Date
                ? row.monthdate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : row.monthdate}
            </td>
            <td>{Number(row.averagedollarvalue).toFixed(4)}</td>
            <td>{row.forecast !== undefined ? row.forecast.toFixed(4) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
