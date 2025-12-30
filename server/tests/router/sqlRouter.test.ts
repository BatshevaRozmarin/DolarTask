import request from 'supertest';
import express from 'express';

import { pool } from '../../src/db/pool';
import { sqlRouter } from '../../src/routers/sqlRouter';


jest.mock('../../src/db/pool', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const app = express();
app.use('/api/sql', sqlRouter);

describe('sqlRouter', () => {
  it('should return rows with status 200', async () => {
    const mockRows = [{ monthdate: '2023-01-01', averagedollarvalue: 3 }];
    (pool.query as jest.Mock).mockResolvedValue({ rows: mockRows });

    const res = await request(app).get('/api/sql');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM monthlydollaraverages');
  });

  it('should return 500 if pool.query throws', async () => {
    (pool.query as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/api/sql');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Failed to fetch monthly averages' });
  });
});
