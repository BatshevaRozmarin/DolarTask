import { RateRow } from '../types/type';


export function addDifferences(data: RateRow[]): RateRow[] {
  return data.map((row, index) => {
    const prevForecast = index > 0 ? data[index - 1].forecast : undefined;
    const difference =
      prevForecast !== undefined
        ? Number((row.averagedollarvalue - prevForecast).toFixed(4))
        : undefined;

    return { ...row, difference };
  });
}
