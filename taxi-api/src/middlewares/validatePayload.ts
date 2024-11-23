import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validatePayload =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    res.locals = schema.parse({ ...req.body, ...req.params, ...req.query });
    next();
  };
