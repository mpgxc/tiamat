import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import 'reflect-metadata';
import './shared/container';

import { routes } from './routes';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(helmet());
app.use('/api', routes);

export { app };
