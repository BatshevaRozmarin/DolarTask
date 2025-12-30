import axios from 'axios';
import 'dotenv/config';


const BASE_URL = process.env.BASE_URL;

export async function fetchRatesByDateRange(
  startDate: string,
  endDate: string
): Promise<number[]> {

  if (!BASE_URL) {
    throw new Error('BASE_URL is not defined in environment variables');
  }

  const url = `${BASE_URL}/${startDate}..${endDate}?from=USD&to=ILS`;

  try {
    const response = await axios.get(url);

    if (!response.data?.rates) {
      return [];
    }

    return Object.values(response.data.rates).map(
      (day: any) => day.ILS
    );
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error(error.message || 'Failed to fetch rates by date range');
    throw new Error('Failed to fetch rates by date range');
  }
}
