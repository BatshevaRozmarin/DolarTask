import React from 'react';

import { RateRow } from '../../types/type';
import './Table.css';


type DifferenceTableProps = {
    data: RateRow[];
};

export const DifferenceTable: React.FC<DifferenceTableProps> = ({ data }) => {

    return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Average USD → ILS</th>
          <th>Forecast</th>
          <th>Difference</th>
          <th>Multiplucation</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={row.isAverageRow ? 'average-row' : ''}>
            <td>
              {row.isAverageRow
                ? 'Average of 3 months'
                : row.monthdate instanceof Date
                ? row.monthdate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : row.monthdate}
            </td>
            <td>{row.isAverageRow ? '-' : Number(row.averagedollarvalue).toFixed(4)}</td>
            <td>{row.forecast !== undefined ? row.forecast.toFixed(4) : '-'}</td>
            <td>{row.difference !== undefined ? row.difference.toFixed(4) : '-'}</td>
            <td>{row.Multiplucation !== undefined ? row.Multiplucation.toFixed(4) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
