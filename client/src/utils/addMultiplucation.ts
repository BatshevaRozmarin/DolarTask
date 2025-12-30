import { RateRow } from '../types/type';


export function addMultiplucation(data: RateRow[]): RateRow[] {
  return data.map(row => {
    const Multiplucation =
      row.forecast !== undefined && row.difference !== undefined
        ? row.forecast * row.difference
        : undefined;

    return { ...row, Multiplucation };
  });
}
