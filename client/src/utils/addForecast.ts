import { RateRow } from '../types/type';


export function addForecast(data: RateRow[]): RateRow[] {
  if (data.length < 3) return data.map(row => ({ ...row, forecast: undefined }));
  return data.map((row, index) => {
    if (index < 2) {
      return { ...row, forecast: undefined };
    } else {
      const prevThree = data.slice(index - 2, index + 1);
      const avg = prevThree.reduce((sum, row) => sum + row.averagedollarvalue, 0) / prevThree.length;

      return { ...row, forecast: Number(avg.toFixed(4)) };
    }
  });
}
