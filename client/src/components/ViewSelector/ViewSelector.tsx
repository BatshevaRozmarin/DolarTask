import React from 'react';

import './ViewSelector.css';


type ViewSelectorProps = {
  selected: string;
  setSelected: (v: string) => void;
};

export const ViewSelector: React.FC<ViewSelectorProps> = ({ selected, setSelected }) => {
  const views = ['Graph', 'MonthlyRateTable', 'ForecastTable', 'DifferenceTable'];

  return (
    <div className="view-selector">
      {views.map(v => (
        <div
          key={v}
          className="view-item"
          onClick={() => setSelected(v)}
        >
          <span className={`circle ${selected === v ? 'filled' : ''}`}></span>
          <span className="label">{v}</span>
        </div>
      ))}
    </div>
  );
};
