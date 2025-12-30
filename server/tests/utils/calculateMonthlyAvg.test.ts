import { calculateMonthlyAvg } from '../../src/utils/calculateMonthlyAvg';
import * as fetchModule from '../../src/utils/fetchMonthlyRates';


jest.mock('../../src/utils/fetchMonthlyRates');

describe('calculateMonthlyAvg', () => {
  const mockFetch = fetchModule.fetchMonthlyRates as jest.Mock;

  it('should return correct average', async () => {
    mockFetch.mockResolvedValue([1, 2, 3]);
    const avg = await calculateMonthlyAvg(2023, 1);
    expect(avg).toBeCloseTo(2);
  });

  it('should return null if no rates', async () => {
    mockFetch.mockResolvedValue([]);
    const avg = await calculateMonthlyAvg(2023, 1);
    expect(avg).toBeNull();
  });

  it('should throw error when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Fetch error'));
    await expect(calculateMonthlyAvg(2023, 1)).rejects.toThrow('Failed to calculate monthly average: Fetch error');
  });
});
