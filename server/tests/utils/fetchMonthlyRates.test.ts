import { fetchMonthlyRates } from '../../src/utils/fetchMonthlyRates';
import * as apiModule from '../../src/api/ratesApi';


jest.mock('../../src/api/ratesApi');

describe('fetchMonthlyRates', () => {
  const mockApi = apiModule.fetchRatesByDateRange as jest.Mock;

  it('should return rates from API', async () => {
    mockApi.mockResolvedValue([3, 5, 7]);
    const rates = await fetchMonthlyRates(2023, 1);
    expect(rates).toEqual([3, 5, 7]);
  });

  it('should throw error when API fails', async () => {
    mockApi.mockRejectedValue(new Error('API down'));
    await expect(fetchMonthlyRates(2023, 1)).rejects.toThrow(
      'Failed to fetch monthly rates for 2023-01: API down'
    );
  });
});
