import { fetchMonthlyRates } from './fetchMonthlyRates';


export async function calculateMonthlyAvg(
    year: number,
    month: number
): Promise<number | null> {
    try {
        const rates = await fetchMonthlyRates(year, month);

        if (!rates || rates.length === 0) {
            return null;
        }

        const sum = rates.reduce((acc, rate) => acc + rate, 0);
        return sum / rates.length;
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Failed to calculate monthly average: ${error.message}`);

        throw new Error('Failed to calculate monthly average: unknown error');
    }
}
