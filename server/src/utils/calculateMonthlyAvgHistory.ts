import { sendMonthlyAvgToDb } from './sendMonthlyAvgToDb';


export async function calculateMonthlyAvgHistory() {
    const today = new Date();
    const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1);
    const END_YEAR = prevMonthDate.getFullYear();
    const END_MONTH = prevMonthDate.getMonth() + 1;
    const START_YEAR = 2023;

    for (let year = START_YEAR; year <= END_YEAR; year++) {
        const lastMonth = year === END_YEAR ? END_MONTH : 12;

        for (let month = 1; month <= lastMonth; month++) {
            try {
                await sendMonthlyAvgToDb(year, month);
            } catch (error: unknown) {
                if (error instanceof Error)
                    throw new Error(`Failed to process monthly average for ${year}-${month}: ${error.message}`);

                throw new Error(`Failed to process monthly average for ${year}-${month}:unknown error`);
            }
        }
    }
}
