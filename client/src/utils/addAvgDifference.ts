import { RateRow } from '../types/type';


export function addAverageDifference(data: RateRow[]): RateRow[] {
    const result: RateRow[] = [];
    let buffer: RateRow[] = [];

    for (const row of data) {
        result.push(row);
        if (row.difference !== undefined) {
            buffer.push(row);
        }
        if (buffer.length === 3) {
            const avgDiff =
                buffer.reduce((sum, r) => sum + (r.difference as number), 0) / buffer.length;

            result.push({
                monthdate: `Average of ${buffer.map(r => r.monthdate).join(', ')}`,
                averagedollarvalue: undefined,
                forecast: undefined,
                difference: Number(avgDiff.toFixed(4)),
                isAverageRow: true,
            });
            buffer = []
        }
    }
    return result;
}
