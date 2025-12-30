import React from 'react';

import './FilterControls.css';


type FilterControlsProps = {
  months: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  sortMode: 'byMonth' | 'byAverage';
  setSortMode: (mode: 'byMonth' | 'byAverage') => void;
};

export const FilterControls: React.FC<FilterControlsProps> = ({
  months,
  selectedMonth,
  setSelectedMonth,
  sortMode,
  setSortMode
}) => {
  return (
    <div className="filter-controls">
      <div className="filter-top">
        <div className="month-filter">
          <label htmlFor="monthSelect" className="filter-label">
          </label>

          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-sort">
          <button
            className={`sort-button ${sortMode === 'byMonth' ? 'active' : ''}`}
            onClick={() => setSortMode('byMonth')}
          >
            By Month
          </button>

          <button
            className={`sort-button ${sortMode === 'byAverage' ? 'active' : ''}`}
            onClick={() => setSortMode('byAverage')}
          >
            By Average
          </button>
        </div>
      </div>
    </div>
  );
};
