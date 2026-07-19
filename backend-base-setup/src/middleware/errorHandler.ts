import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * Catches every error thrown anywhere in the app (thanks to asyncHandler)
 * and turns it into one consistent JSON response, instead of leaking
 * raw stack traces to the frontend.
 *
 * Must be registered LAST in app.ts, after all routes.
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Something went wrong on the server';

  console.error(err); // shows you the real error in your terminal while learning

  res.status(statusCode).json({
    success: false,
    message,
  });
}
