process.env.BASE_URL = 'http://mock-url.com';

import axios from 'axios';
import { fetchRatesByDateRange } from '../../src/api/ratesApi';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchRatesByDateRange', () => {
  it('should return rates array if API responds with data', async () => {
    const mockData = {
      rates: {
        '2025-01-01': { ILS: 3.5 },
        '2025-01-02': { ILS: 3.6 },
      },
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchRatesByDateRange('2025-01-01', '2025-01-02');

    expect(result).toEqual([3.5, 3.6]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.BASE_URL}/2025-01-01..2025-01-02?from=USD&to=ILS`
    );
  });

  it('should return empty array if API returns no rates', async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });

    const result = await fetchRatesByDateRange('2025-01-01', '2025-01-02');

    expect(result).toEqual([]);
  });

  it('should throw an error if axios rejects', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    await expect(
      fetchRatesByDateRange('2025-01-01', '2025-01-02')
    ).rejects.toThrow('Network error');
  });
});
