import { addForecast } from '../../src/utils/addForecast';
import { RateRow } from '../../src/types/type';


describe('addForecast', () => {
  it('should return undefined forecast for all rows if data length is less than 3', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100 },
      { monthdate: '2025-02', averagedollarvalue: 110 },
    ];

    const result = addForecast(data);

    expect(result).toHaveLength(2);
    expect(result[0].forecast).toBeUndefined();
    expect(result[1].forecast).toBeUndefined();
  });

  it('should set forecast undefined for first two rows', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100 },
      { monthdate: '2025-02', averagedollarvalue: 110 },
      { monthdate: '2025-03', averagedollarvalue: 120 },
    ];

    const result = addForecast(data);

    expect(result[0].forecast).toBeUndefined();
    expect(result[1].forecast).toBeUndefined();
  });

  it('should calculate forecast as average of previous three averagedollarvalue values', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 100 },
      { monthdate: '2025-02', averagedollarvalue: 110 },
      { monthdate: '2025-03', averagedollarvalue: 120 },
      { monthdate: '2025-04', averagedollarvalue: 130 },
    ];

    const result = addForecast(data);

    expect(result[2].forecast).toBeCloseTo((100 + 110 + 120) / 3, 4);

    expect(result[3].forecast).toBeCloseTo((110 + 120 + 130) / 3, 4);
  });

  it('should round forecast to 4 decimal places', () => {
    const data: RateRow[] = [
      { monthdate: '2025-01', averagedollarvalue: 1 },
      { monthdate: '2025-02', averagedollarvalue: 2 },
      { monthdate: '2025-03', averagedollarvalue: 2 },
    ];

    const result = addForecast(data);

    expect(result[2].forecast).toBe(1.6667);
  });
});
