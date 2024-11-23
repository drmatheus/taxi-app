// jsonParserMiddleware.ts
import express, { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';

export const jsonParser = (jsonParser: express.RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    jsonParser(req, res, (err: any) => {
      if (err) {
        next(new AppError('INVALID_JSON', 'Malformed JSON in request body'));
      } else {
        next();
      }
    });
  };
};
