import { pool } from './pool';


export async function insertRate(monthDate: string, avg: number): Promise<void> {
  try {
    await pool.query(
      `
      INSERT INTO monthlydollaraverages (monthdate, averagedollarvalue)
      VALUES ($1::DATE, $2)
      ON CONFLICT (monthdate)
      DO UPDATE SET averagedollarvalue = EXCLUDED.averagedollarvalue
      `,
      [monthDate, avg]
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to insert rate: ${error.message}`);
    } else {
      throw new Error('Failed to insert rate: unknown error');
    }
  }
}
