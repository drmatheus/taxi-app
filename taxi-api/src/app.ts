import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rideRouter from './controllers/ride/routes';
import { handleErrors } from './middlewares/handleErrors';
import { AppError } from './error';
import { jsonParser } from './middlewares/jsonParse';

dotenv.config();

const app = express();

app.use(cors());

app.use(jsonParser(express.json()));

app.use('/ride', rideRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${req.method}] url:: ${req.url}`);
  next();
});

app.use((_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(handleErrors);

export default app;
