import { processData } from '../../src/utils/processData';
import { RateRow } from '../../src/types/type';
import * as addAverageDifferenceModule from '../../src/utils/addAvgDifference';
import * as addDifferencesModule from '../../src/utils/addDifferences';
import * as addForecastModule from '../../src/utils/addForecast';
import * as addMultiplucationModule from '../../src/utils/addMultiplucation';


describe('processData', () => {
  const baseData: RateRow[] = [
    { monthdate: new Date('2025-01-01'), averagedollarvalue: 100 },
    { monthdate: new Date('2025-02-01'), averagedollarvalue: 200 },
    { monthdate: new Date('2025-03-01'), averagedollarvalue: 150 },
  ];

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return data unchanged for MonthlyRateTable with "All"', () => {
    const result = processData(baseData, 'MonthlyRateTable');
    expect(result).toHaveLength(3);
    expect(result).toEqual(baseData);
  });

  it('should filter by selected month', () => {
    const result = processData(baseData, 'MonthlyRateTable', '2025-02');
    expect(result).toHaveLength(1);
    expect(result[0].monthdate.toISOString().startsWith('2025-02')).toBe(true);
  });

  it('should sort by averagedollarvalue when sortMode is byAverage', () => {
    const result = processData(baseData, 'MonthlyRateTable', 'All', 'byAverage');
    expect(result[0].averagedollarvalue).toBe(200);
    expect(result[1].averagedollarvalue).toBe(150);
    expect(result[2].averagedollarvalue).toBe(100);
  });

  it('should call addForecast for ForecastTable', () => {
    const spy = jest.spyOn(addForecastModule, 'addForecast').mockImplementation(d => d);
    processData(baseData, 'ForecastTable');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call the full pipeline for DifferenceTable', () => {
    const forecastSpy = jest.spyOn(addForecastModule, 'addForecast').mockImplementation(d => d);
    const diffSpy = jest.spyOn(addDifferencesModule, 'addDifferences').mockImplementation(d => d);
    const avgSpy = jest.spyOn(addAverageDifferenceModule, 'addAverageDifference').mockImplementation(d => d);
    const weightedSpy = jest.spyOn(addMultiplucationModule, 'addMultiplucation').mockImplementation(d => d);

    processData(baseData, 'DifferenceTable');

    expect(forecastSpy).toHaveBeenCalledTimes(1);
    expect(diffSpy).toHaveBeenCalledTimes(1);
    expect(avgSpy).toHaveBeenCalledTimes(1);
    expect(weightedSpy).toHaveBeenCalledTimes(1);
  });

  it('should return empty array if input data is empty', () => {
    const result = processData([], 'MonthlyRateTable');
    expect(result).toEqual([]);
  });
});
