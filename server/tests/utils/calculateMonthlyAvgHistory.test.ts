import { calculateMonthlyAvgHistory } from '../../src/utils/calculateMonthlyAvgHistory';
import * as sendModule from '../../src/utils/sendMonthlyAvgToDb';


jest.mock('../../src/utils/sendMonthlyAvgToDb');

describe('calculateMonthlyAvgHistory', () => {
  const mockSend = sendModule.sendMonthlyAvgToDb as jest.Mock;

  beforeEach(() => {
    mockSend.mockResolvedValue(undefined);
  });

  it('should call sendMonthlyAvgToDb for each month from 2023 to prev month', async () => {
    const today = new Date();
    const prevMonth = today.getMonth() === 0 ? 12 : today.getMonth();
    await calculateMonthlyAvgHistory();

    expect(mockSend).toHaveBeenCalledTimes((prevMonth - 1 + 1) + (today.getFullYear() - 2023) * 12);
  });

  it('should throw error if sendMonthlyAvgToDb fails', async () => {
    mockSend.mockRejectedValue(new Error('DB error'));
    await expect(calculateMonthlyAvgHistory()).rejects.toThrow('Failed to process monthly average');
  });
});
