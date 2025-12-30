import schedule from 'node-schedule';
import { scheduleMonthlyAveragesJob } from '../../src/schedule/monthlyJob';
import { sendMonthlyAvgToDb } from '../../src/utils/sendMonthlyAvgToDb';


jest.mock('node-schedule', () => ({
  scheduleJob: jest.fn(),
}));

jest.mock('../../src/modules/sendMonthlyAvgToDb', () => ({
  sendMonthlyAvgToDb: jest.fn(),
}));

describe('scheduleMonthlyAveragesJob', () => {
  it('should schedule a job and call sendMonthlyAvgToDb', () => {
    scheduleMonthlyAveragesJob();

    expect(schedule.scheduleJob).toHaveBeenCalledTimes(1);

    const jobCallback = (schedule.scheduleJob as jest.Mock).mock.calls[0][1];
    (sendMonthlyAvgToDb as jest.Mock).mockResolvedValue(undefined);

    return jobCallback().then(() => {
      expect(sendMonthlyAvgToDb).toHaveBeenCalled();
    });
  });

  it('should throw an error if sendMonthlyAvgToDb fails', async () => {
    const jobCallback = (schedule.scheduleJob as jest.Mock).mock.calls[0][1];
    (sendMonthlyAvgToDb as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(jobCallback()).rejects.toThrow(
      'Failed to run scheduled monthly averages job: DB error'
    );
  });
});
