import { addAverageDifference } from '../../src/utils/addAvgDifference';
import { RateRow } from '../../src/types/type';


describe('addAverageDifference', () => {
  it('should add an average row after every 3 rows with difference', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100, forecast: 105, difference: 5 },
      { monthdate: '2025-02', averagedollarvalue: 110, forecast: 108, difference: -2 },
      { monthdate: '2025-03', averagedollarvalue: 120, forecast: 118, difference: -2 },
      { monthdate: '2025-04', averagedollarvalue: 130, forecast: 125, difference: -5 },
      { monthdate: '2025-05', averagedollarvalue: 140, forecast: 135, difference: -5 },
      { monthdate: '2025-06', averagedollarvalue: 150, forecast: 148, difference: -2 },
    ];

    const result = addAverageDifference(data);

    expect(result.length).toBe(8);

    expect(result[3].monthdate).toBe('Average of 2025-01, 2025-02, 2025-03');
    expect(result[3].isAverageRow).toBe(true);
    expect(result[3].difference).toBeCloseTo((5 - 2 - 2) / 3, 4);

    expect(result[7].monthdate).toBe('Average of 2025-04, 2025-05, 2025-06');
    expect(result[7].isAverageRow).toBe(true);
    expect(result[7].difference).toBeCloseTo((-5 - 5 - 2) / 3, 4);
  });

  it('should handle data with less than 3 differences', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100, forecast: 105, difference: 5 },
      { monthdate: '2025-02', averagedollarvalue: 110, forecast: 108, difference: -2 },
    ];

    const result = addAverageDifference(data);

    expect(result.length).toBe(2);
  });

  it('should skip rows without difference', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100, forecast: 105, difference: undefined },
      { monthdate: '2025-02', averagedollarvalue: 110, forecast: 108, difference: 2 },
      { monthdate: '2025-03', averagedollarvalue: 120, forecast: 118, difference: 4 },
      { monthdate: '2025-04', averagedollarvalue: 130, forecast: 125, difference: 6 },
    ];

    const result = addAverageDifference(data);

    expect(result.length).toBe(5);
    expect(result[4].monthdate).toContain('2025-02, 2025-03, 2025-04');
  });
});
