import { addAverageDifference } from './addAvgDifference';
import { addDifferences } from './addDifferences';
import { addForecast } from './addForecast';
import { addMultiplucation } from './addMultiplucation';
import { RateRow } from '../types/type';


type SortMode = 'byMonth' | 'byAverage';
type ViewType = 'MonthlyRateTable' | 'ForecastTable' | 'DifferenceTable';

export const processData = (
  data: RateRow[],
  view: ViewType,
  selectedMonth: string = 'All',
  sortMode: SortMode = 'byMonth'
): RateRow[] => {
  let processed = [...data];

  if (view === 'ForecastTable' || view === 'DifferenceTable') {
    processed = addViewSpecificData(processed, view);
  }
  if (view === 'MonthlyRateTable') {
    processed = filterByMonth(processed, selectedMonth);
    processed = sortData(processed, sortMode);
  }
  return processed;
};


const addViewSpecificData = (data: RateRow[], view: ViewType): RateRow[] => {
  if (view === 'ForecastTable') return addForecast([...data]);

  if (view === 'DifferenceTable') {
    let result = addForecast([...data]);
    result = addDifferences(result);
    result = addAverageDifference(result);
    result = addMultiplucation(result);
    return result;
  }
  return [...data];
};


const filterByMonth = (data: RateRow[], selectedMonth: string): RateRow[] => {
  if (selectedMonth === 'All') return data;

  return data.filter(
    row =>
      row.monthdate instanceof Date &&
      row.monthdate.toISOString().slice(0, 7) === selectedMonth
  );
};


const sortData = (data: RateRow[], sortMode: SortMode): RateRow[] => {
  return [...data].sort((a, b) => {
    if (sortMode === 'byMonth') {
      return (a.monthdate as Date).getTime() - (b.monthdate as Date).getTime();
    } else {
      return Number(b.averagedollarvalue) - Number(a.averagedollarvalue);
    }
  });
};
