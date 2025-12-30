import { fetchRatesByDateRange } from '../api/ratesApi';


export async function fetchMonthlyRates(
  year: number,
  month: number
): Promise<number[]> {
  try {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(year, month, 0)
      .toISOString()
      .slice(0, 10);

    return await fetchRatesByDateRange(startDate, endDate);
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(`Failed to fetch monthly rates for ${year}-${month.toString().padStart(2, '0')}: ${error.message}`);

    throw new Error(`Failed to fetch monthly rates for ${year}-${month.toString().padStart(2, '0')}: unknown error`);
  }
}
