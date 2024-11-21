import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${req.method}] url:: ${req.url}`);
  next();
});

app.use((_req: Request, res: Response) => {
  return res.status(404).json({ message: 'Route not found' });
});

export default app;
