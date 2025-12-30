import { Router, Request, Response } from 'express';

import { pool } from '../db/pool';


export const sqlRouter = Router();

sqlRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM monthlydollaraverages');
        res.status(200).json(rows);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Failed to fetch monthly averages' });
    }
});
