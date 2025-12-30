import React, { useState, useMemo } from 'react';

import { FilterControls } from './FilterControls';
import { getGateColor } from '../../utils/getGateColor';
import { processData } from '../../utils/processData';
import { RateRow } from '../../types/type';
import './Table.css';


type TableBaseProps = {
    data: RateRow[];
};

export const MonthlyRateTable: React.FC<TableBaseProps> = ({ data }) => {
    const [selectedMonth, setSelectedMonth] = useState('All');
    const [sortMode, setSortMode] = useState<'byMonth' | 'byAverage'>('byMonth');

    const months = useMemo(() => {
        return Array.from(
            new Set(data.map(row => (row.monthdate as Date).toISOString().slice(0, 7)))
        );
    }, [data]);

    const processedData = useMemo(
        () => processData(data, 'MonthlyRateTable', selectedMonth, sortMode),
        [data, selectedMonth, sortMode]
    );
    return (
        <>
            <FilterControls
                months={months}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                sortMode={sortMode}
                setSortMode={setSortMode}
            />
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Average USD → ILS</th>
                    </tr>
                </thead>
                <tbody>
                    {processedData.map((row, index) => (
                        <tr
                            key={index}
                            style={{
                                backgroundColor: getGateColor(
                                    Number(row.averagedollarvalue),
                                    processedData
                                ),
                            }}
                        >
                            <td>
                                {new Date(row.monthdate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </td>
                            <td>{Number(row.averagedollarvalue).toFixed(4)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
