import { addDifferences } from '../../src/utils/addDifferences';
import { RateRow } from '../../src/types/type';


describe('addDifferences', () => {
  it('should calculate differences correctly', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100, forecast: 105 },
      { monthdate: '2025-02', averagedollarvalue: 110, forecast: 108 },
      { monthdate: '2025-03', averagedollarvalue: 120, forecast: 118 },
    ];

    const result = addDifferences(data);

    expect(result[0].difference).toBeUndefined();

    expect(result[1].difference).toBeCloseTo(110 - 105, 4); // 5
    expect(result[2].difference).toBeCloseTo(120 - 108, 4); // 12
  });

  it('should handle empty data', () => {
    const result = addDifferences([]);
    expect(result).toEqual([]);
  });

  it('should handle single row data', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100, forecast: 105 },
    ];

    const result = addDifferences(data);
    expect(result[0].difference).toBeUndefined();
  });
});
