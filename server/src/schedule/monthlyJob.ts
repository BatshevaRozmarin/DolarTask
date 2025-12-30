import schedule from 'node-schedule';

import { sendMonthlyAvgToDb } from '../utils/sendMonthlyAvgToDb';


export function scheduleMonthlyAveragesJob() {
  schedule.scheduleJob('0 0 0 1 * *', async () => {
    try {
      const today = new Date();
      const year = today.getMonth() === 0
        ? today.getFullYear() - 1
        : today.getFullYear();

      const month = today.getMonth() === 0
        ? 12
        : today.getMonth();

      await sendMonthlyAvgToDb(year, month);
    } catch (error: unknown) {
      if (error instanceof Error)
        throw new Error(`Failed to run scheduled monthly averages job: ${error.message}`);
      throw new Error('Failed to run scheduled monthly averages job: unknown error');
    }
  });
}
