import { fetchRates } from '../api/ratesApi';
import { RateRow } from '../types/type';


export async function loadRates(): Promise<RateRow[]> {
    try {
        const raw = await fetchRates();
        return raw.map(row => ({
            monthdate: new Date(row.monthdate),
            averagedollarvalue: Number(row.averagedollarvalue),
        }));
    } catch (error: any) {
        throw new Error(error.message || 'Failed to load rates');
    }
}
