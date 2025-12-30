import { getGateColor } from '../../src/utils/getGateColor';


describe('getGateColor', () => {
  it('should return gray when all averagedollarvalue values are equal', () => {
    const data = [
      { averagedollarvalue: 100 },
      { averagedollarvalue: 100 },
      { averagedollarvalue: 100 },
    ];

    const color = getGateColor(100, data);

    expect(color).toBe('gray');
  });

  it('should return red-ish color for minimum avg', () => {
    const data = [
      { averagedollarvalue: 100 },
      { averagedollarvalue: 200 },
    ];

    const color = getGateColor(100, data);

    expect(color).toBe('rgb(255,100,100)');
  });

  it('should return green-ish color for maximum avg', () => {
    const data = [
      { averagedollarvalue: 100 },
      { averagedollarvalue: 200 },
    ];

    const color = getGateColor(200, data);

    expect(color).toBe('rgb(0,255,100)');
  });

  it('should return correct interpolated color for middle avg', () => {
    const data = [
      { averagedollarvalue: 100 },
      { averagedollarvalue: 200 },
    ];

    const color = getGateColor(150, data);

    expect(color).toBe('rgb(128,178,100)');
  });
});
