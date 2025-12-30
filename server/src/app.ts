import cors from 'cors';
import express from 'express';

import {sqlRouter} from './routers/sqlRouter'


export const app = express();

app.use(cors());
app.use(express.json());
app.use('/rates',sqlRouter)
