import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error';
import { ZodError } from 'zod';

export const handleErrors = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      error_code: error.error_code,
      error_description: error.error_description,
    });
  }

  if (error instanceof ZodError) {
    const errorMessages = error.errors
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join(', ');

    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: errorMessages,
    });
  }

  console.error(error);
  return res.status(500).json({
    error_code: 'INTERNAL_SERVER_ERROR',
    error_description: 'An unexpected error occurred',
  });
};
