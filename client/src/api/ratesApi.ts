import { RateRow } from '../types/type';


export async function fetchRates(): Promise<RateRow[]> {
    try {
        const url = import.meta.env.VITE_API_URL;
        if (!url) throw new Error("VITE_API_URL is not defined in .env");

        const res = await fetch(`${url}/table`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        return await res.json();
    } catch (error: any) {
        throw new Error(error.message || 'Failed to fetch rates');
    }
}
