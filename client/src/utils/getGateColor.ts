export function getGateColor(avg: number, data: { averagedollarvalue: number }[]) {
  const minAvg = Math.min(...data.map(row => row.averagedollarvalue));
  const maxAvg = Math.max(...data.map(row => row.averagedollarvalue));

  if (minAvg === maxAvg) return 'gray';

  const normalized = (avg - minAvg) / (maxAvg - minAvg);
  const r = Math.round(255 - normalized * 255);
  const g = Math.round(100 + normalized * 155);
  const b = 100;

  return `rgb(${r},${g},${b})`;
}
