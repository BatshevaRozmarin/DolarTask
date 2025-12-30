import { calculateMonthlyAvg } from './calculateMonthlyAvg';
import { insertRate } from '../db/insertRate';


export async function sendMonthlyAvgToDb(year: number, month: number) {
  try {
    const result = await calculateMonthlyAvg(year, month);

    if (!result) {
      return;
    }
    const average = result;
    const monthDate = `${year}-${String(month).padStart(2, '0')}-01`;

    await insertRate(monthDate, average);
  } catch (error: unknown) {
    if (error instanceof Error) 
      throw new Error(
        `Failed to send monthly average to DB for ${year}-${month.toString().padStart(2, '0')}: ${error.message}`
      );
    throw new Error(
      `Failed to send monthly average to DB for ${year}-${month.toString().padStart(2, '0')}: unknown error`
    );
  }
}
