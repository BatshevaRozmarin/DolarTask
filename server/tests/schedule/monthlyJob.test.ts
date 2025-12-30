import schedule from 'node-schedule';
import { scheduleMonthlyAveragesJob } from '../../src/schedule/monthlyJob';
import { sendMonthlyAvgToDb } from '../../src/utils/sendMonthlyAvgToDb';



jest.mock('node-schedule', () => ({
  scheduleJob: jest.fn(),
}));

jest.mock('../../src/utils/sendMonthlyAvgToDb', () => ({
  sendMonthlyAvgToDb: jest.fn(),
}));

describe('scheduleMonthlyAveragesJob', () => {
  let jobCallback: Function;

  beforeEach(() => {
    (schedule.scheduleJob as jest.Mock).mockImplementation((cron: string, cb: Function) => {
      jobCallback = cb; 
    });

    (sendMonthlyAvgToDb as jest.Mock).mockReset();
  });

  it('should schedule a job and call sendMonthlyAvgToDb', async () => {
    (sendMonthlyAvgToDb as jest.Mock).mockResolvedValue(undefined);

    scheduleMonthlyAveragesJob();

    expect(schedule.scheduleJob).toHaveBeenCalledTimes(1);

    await jobCallback(); 
    expect(sendMonthlyAvgToDb).toHaveBeenCalled();
  });

  it('should throw an error if sendMonthlyAvgToDb fails', async () => {
    (sendMonthlyAvgToDb as jest.Mock).mockRejectedValue(new Error('DB error'));

    scheduleMonthlyAveragesJob();

    await expect(jobCallback()).rejects.toThrow(
      'Failed to run scheduled monthly averages job: DB error'
    );
  });
});
