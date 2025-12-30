import React, { useEffect, useState } from 'react';

import { loadRates } from '../../utils/loadRates';
import { RateRow } from '../../types/type';
import { RenderView } from './RenderView'
import { ViewSelector } from '../ViewSelector/ViewSelector';
import './Dashboard.css';


export const Dashboard: React.FC = () => {
    const [data, setData] = useState<RateRow[]>([]);
    const [view, setView] = useState<'Graph' | 'MonthlyRateTable' | 'ForecastTable' | 'DifferenceTable'>('Graph');

    const fetchAndSetData = async () => {
        try {
            const newData = await loadRates();
            setData(newData);
        } catch (error) {
            alert("Failed to load/update data.");
        }
    };

    useEffect(() => {
        fetchAndSetData();
    }, []);

    const handleRefresh = () => {
        fetchAndSetData();
    };

    if (!data.length) return <p>Loading...</p>;

    return (
        <div className="dashboard">
            <h1>USD → ILS Monthly Rates</h1>
            <button className="refresh-button" onClick={handleRefresh}>🔄 Update Data</button>
            <ViewSelector selected={view} setSelected={setView} />
            {RenderView(view, data)}
        </div>
    );
};
