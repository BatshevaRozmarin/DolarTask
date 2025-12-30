import { addMultiplucation } from '../../src/utils/addMultiplucation';
import { RateRow } from '../../src/types/type';


describe('addMultiplucation', () => {
  it('should calculate weightedDiff when forecast and difference exist', () => {
    const data: RateRow[] = [
      {
        monthdate: '2025-01',
        averagedollarvalue: 100,
        forecast: 10,
        difference: 2,
      },
    ];

    const result = addMultiplucation(data);

    expect(result[0].Multiplucation).toBe(20);
  });

  it('should return undefined weightedDiff if forecast is undefined', () => {
    const data: RateRow[] = [
      {
        monthdate: '2025-01',
        averagedollarvalue: 100,
        forecast: undefined,
        difference: 2,
      },
    ];

    const result = addMultiplucation(data);

    expect(result[0].Multiplucation).toBeUndefined();
  });

  it('should return undefined weightedDiff if difference is undefined', () => {
    const data: RateRow[] = [
      {
        monthdate: '2025-01',
        averagedollarvalue: 100,
        forecast: 10,
        difference: undefined,
      },
    ];

    const result = addMultiplucation(data);

    expect(result[0].Multiplucation).toBeUndefined();
  });

  it('should handle empty array', () => {
    const result = addMultiplucation([]);
    expect(result).toEqual([]);
  });
});
