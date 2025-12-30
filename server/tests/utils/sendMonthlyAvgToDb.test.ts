jest.mock('../../src/utils/calculateMonthlyAvg', () => ({
  calculateMonthlyAvg: jest.fn(),
}));

jest.mock('../../src/db/insertRate', () => ({
  insertRate: jest.fn(),
}));

import { sendMonthlyAvgToDb } from '../../src/utils/sendMonthlyAvgToDb';
import { calculateMonthlyAvg } from '../../src/utils/calculateMonthlyAvg';
import { insertRate } from '../../src/db/insertRate';

const mockCalc = calculateMonthlyAvg as jest.Mock;
const mockInsert = insertRate as jest.Mock;

describe('sendMonthlyAvgToDb', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should insert average to DB', async () => {
    mockCalc.mockResolvedValue(5);
    await sendMonthlyAvgToDb(2023, 1);
    expect(mockInsert).toHaveBeenCalledWith('2023-01-01', 5);
  });

  it('should do nothing if calculateMonthlyAvg returns null', async () => {
    mockCalc.mockResolvedValue(null);
    await sendMonthlyAvgToDb(2023, 1);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('should throw error if insertRate fails', async () => {
    mockCalc.mockResolvedValue(5);
    mockInsert.mockRejectedValue(new Error('DB error'));
    await expect(sendMonthlyAvgToDb(2023, 1)).rejects.toThrow(
      'Failed to send monthly average to DB for 2023-01: DB error'
    );
  });
});
