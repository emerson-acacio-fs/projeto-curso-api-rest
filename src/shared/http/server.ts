import 'reflect-metadata';
import 'express-async-errors';
import 'shared/typeorm/index';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from 'shared/errors/AppError';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
    next();
  }
  res.status(500).json({ status: 'error', message: 'Internal server error' });
  next();
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
