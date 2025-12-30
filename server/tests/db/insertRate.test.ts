import { insertRate } from '../../src/db/insertRate';
import { pool } from '../../src/db/pool';


jest.mock('../../src/db/pool', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('insertRate', () => {
  const mockQuery = pool.query as jest.Mock;

  beforeEach(() => {
    mockQuery.mockClear();
  });

  it('should call pool.query with correct SQL and parameters', async () => {
    mockQuery.mockResolvedValueOnce({}); 
    await insertRate('2023-01-01', 3.5);

    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO monthlydollaraverages'),
      ['2023-01-01', 3.5]
    );
  });

  it('should throw an error if pool.query fails', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));

    await expect(insertRate('2023-01-01', 3.5)).rejects.toThrow(
      'Failed to insert rate: DB error'
    );
  });
});
